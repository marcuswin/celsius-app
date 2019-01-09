import { Constants } from 'expo';
import Branch from 'react-native-branch';
import { NetInfo, Text, TextInput } from 'react-native';
import twitter from 'react-native-simple-twitter';
import uuid from 'uuid';

import store from '../store';
import * as actions from '../actions';
import {
  getSecureStoreKey,
  deleteSecureStoreKey,
  setSecureStoreKey
} from "../../utils/expo-storage";
import baseUrl from "../../services/api-url";
import { mixpanelAnalytics } from "../../services/mixpanel";
import { KYC_STATUSES, TRANSFER_STATUSES } from "../../config/constants/common";
import ACTIONS from '../../config/constants/ACTIONS';
import { registerForPushNotificationsAsync } from "../../utils/push-notifications-util";
import { analyticsEvents } from "../../utils/analytics-util";
import Sentry from '../../utils/sentry-util';

const { TWITTER_CUSTOMER_KEY, TWITTER_SECRET_KEY, SECURITY_STORAGE_AUTH_KEY } = Constants.manifest.extra;

export function resetApp() {
  return async (dispatch) => {
    try {
      await deleteSecureStoreKey(SECURITY_STORAGE_AUTH_KEY);
      dispatch({ type: ACTIONS.RESET_APP })
      dispatch(actions.showMessage('warning', 'Reseting Celsius App!'))

      await dispatch(appInitStart());
    } catch (e) {
      console.log(e);
    }
  }
}

export function appInitStart() {
  return async (dispatch, getState) => {
    try {
      if (!getState().app.appInitializing) {
        dispatch({ type: ACTIONS.APP_INIT_START });
        disableAccessibilityFontScaling();
        twitter.setConsumerKey(TWITTER_CUSTOMER_KEY, TWITTER_SECRET_KEY);
        await initInternetConnectivityListener();
        await pollBackendStatus();
        await logoutOnEnvChange();
        await initAppData()
        await initAppUserSettings();
        await initBranch();
        dispatch(actions.getUserLocation());
        await dispatch(actions.getBlacklistedCountries());
        analyticsEvents.openApp();
        if (getState().users.user) {
          analyticsEvents.sessionStart();
        }

        dispatch({ type: ACTIONS.APP_INIT_DONE });
      }
    } catch (e) {
      console.log(e)
    }
  }
}

// Polls Status of Backend services every 30s
let backendPollInterval;
async function pollBackendStatus() {
  if (backendPollInterval) clearInterval(backendPollInterval);
  await store.dispatch(actions.getBackendStatus())

  backendPollInterval = setInterval(async () => {
    await store.dispatch(actions.getBackendStatus());
  }, 30000);
}

// Disable Font Scaling when accessibility settings on device changed
function disableAccessibilityFontScaling() {
  // disables letter sizing in phone's Accessibility menu
  if (Text.defaultProps == null) Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;

  // same same as with Text, but different
  if (TextInput.defaultProps == null) TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
}

// For development use: Logout user when backend environment changes
async function logoutOnEnvChange() {
  const previousBaseUrl = await getSecureStoreKey('BASE_URL');
  if (previousBaseUrl !== baseUrl) {
    await deleteSecureStoreKey(SECURITY_STORAGE_AUTH_KEY);
    await setSecureStoreKey('BASE_URL', baseUrl);
  }
}

// Initialize all data needed for the App
async function initAppData() {
  // get user token
  const token = await getSecureStoreKey(SECURITY_STORAGE_AUTH_KEY);

  // fetch user
  if (token) await store.dispatch(actions.getProfileInfo());

  // get expired session
  const { expiredSession } = store.getState().users;

  if (token && !expiredSession) {
    registerForPushNotificationsAsync();

    // get all KYC document types and claimed transfers for non-verified users
    const { user } = store.getState().users;
    if (user) {
      if (!user.kyc || (user.kyc && user.kyc.status !== KYC_STATUSES.passed)) {
        await store.dispatch(actions.getKYCDocTypes());
        await store.dispatch(actions.getAllTransfers(TRANSFER_STATUSES.claimed));
      }

      // get wallet details for verified users
      if (user.kyc && user.kyc.status === KYC_STATUSES.passed) {
        await store.dispatch(actions.getWalletDetails());
      }
    }
  } else {
    // logout if expired session or no token
    await store.dispatch(actions.logoutUser());

    // initialize MixPanel with new user
    mixpanelAnalytics.identify(uuid())

    store.dispatch(actions.fireUserAction("enteredInitialPin"))
  }

  // get general data for te app
  await store.dispatch(actions.getSupportedCurrencies())
}

// Gets User App Settings from Secure Store
async function initAppUserSettings() {
  const appSettings = await getSecureStoreKey('APP_SETTINGS');
  if (appSettings) {
    store.dispatch(actions.updateUserAppSettings(JSON.parse(appSettings)));
  }
}

// Listen for Breaks in Internet Connection
async function initInternetConnectivityListener() {
  // NOTE: for some reason initial connectivity is always false, which causes the app to glitch on offlinemode screen
  // const initialConnection = await NetInfo.isConnected.fetch();
  // handleConnectivityChange(initialConnection);

  NetInfo.isConnected.addEventListener(
    "connectionChange",
    handleConnectivityChange
  );
}

function handleConnectivityChange(isConnected) {
  store.dispatch(actions.setInternetConnectivity(isConnected));
}

// Initialize & Subscribe to Branch
async function initBranch() {
  try {
    Branch.subscribe((deepLink) => {
      if (deepLink.error || !deepLink.params) {
        return;
      }

      handleDeepLink(deepLink.params);
    });
  } catch (error) {
    Sentry.captureException(error);
  }
}

function handleDeepLink(deepLink) {
  if (!deepLink || !deepLink['+clicked_branch_link']) return;
  store.dispatch(actions.registerBranchLink(deepLink));
}
