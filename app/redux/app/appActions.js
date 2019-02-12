// TODO(fj): check all actions that need to be here (loadingAssets...)

import { Constants } from "expo";
import { Platform } from "react-native";
import uuid from "uuid";

import store from "../store";
import * as actions from "../actions";
import {
  getSecureStoreKey,
  deleteSecureStoreKey,
} from "../../utils/expo-storage";
import { mixpanelAnalytics } from "../../services/mixpanel";
import { KYC_STATUSES, TRANSFER_STATUSES } from "../../config/constants/common";
import ACTIONS from "../../constants/ACTIONS";
import { registerForPushNotificationsAsync } from "../../utils/push-notifications-util";
import { analyticsEvents } from "../../utils/analytics-util";
import appUtil from "../../utils/app-util";
import branchUtil from "../../utils/branch-util";
import stylesUtil from "../../utils/styles-util";
import ASSETS from "../../constants/ASSETS";

const { SECURITY_STORAGE_AUTH_KEY } = Constants.manifest.extra;

// --------------------------------------------------------------------------------------

export {
  initCelsiusApp,
  resetCelsiusApp,
  loadCelsiusAssets,
  finishLoadingAssets,
  handleAppStateChange,
  setInternetConnection,
}


function initCelsiusApp() {
  return async (dispatch, getState) => {
    if (getState().app.appInitializing) return;

    try {
      dispatch({ type: ACTIONS.APP_INIT_START });
      await dispatch(actions.loginUser( {

        email: 'filip.jovakaric+wlt@mvpworkshop.co',
        password: 'filip123',
      }));
      await appUtil.logoutOnEnvChange();

      stylesUtil.disableAccessibilityFontScaling();

      await appUtil.initInternetConnectivityListener();
      await appUtil.pollBackendStatus();

      await initAppData();
      await dispatch(actions.initUserAppSettings());

      await branchUtil.initBranch();

      analyticsEvents.openApp();
      if (getState().user.profile) analyticsEvents.sessionStart();

      dispatch({ type: ACTIONS.APP_INIT_DONE });
    } catch (e) {
      // console.log(e);
    }
  };
}

function resetCelsiusApp() {
  return async (dispatch) => {
    try {
      // Logout user
      await deleteSecureStoreKey(SECURITY_STORAGE_AUTH_KEY);
      dispatch({ type: ACTIONS.RESET_APP });
      // Dev warning message
      dispatch(actions.showMessage("warning", "Reseting Celsius App!"));

      await dispatch(initCelsiusApp());
    } catch (e) {
      // console.log(e);
    }
  };
}

function loadCelsiusAssets() {
  return async dispatch => {
    dispatch({ type: ACTIONS.START_LOADING_ASSETS })

    const imageAssets = appUtil.cacheImages(ASSETS.CACHE_IMAGES);
    const fontAssets = appUtil.cacheFonts(ASSETS.FONTS);

    await Promise.all([...imageAssets, ...fontAssets]);

    dispatch({ type: ACTIONS.FINISH_LOADING_ASSETS })
  }
}

function finishLoadingAssets() {
  return { type: ACTIONS.FINISH_LOADING_ASSETS }
}

const ASK_FOR_PIN_AFTER = 25 * 1000;
let pinTimeout;
let startOfBackgroundTimer;
function handleAppStateChange(nextAppState) {
  return (dispatch, getState) => {
    const { profile } = getState().user;
    const { appState } = getState().app;

    if (nextAppState === "active") {
      analyticsEvents.openApp();
      if (profile) analyticsEvents.sessionStart()

      if (Platform.OS === "ios") {
        clearTimeout(pinTimeout);
      }

      if (Platform.OS === "android" && new Date().getTime() - startOfBackgroundTimer > ASK_FOR_PIN_AFTER) {
        startOfBackgroundTimer = null;
        // dispatch(actions.navigateTo("LoginPasscode"));
      }
    }

    if (nextAppState.match(/inactive|background/) && profile && profile.has_pin && appState === "active") {
      analyticsEvents.sessionEnd();

      if (Platform.OS === "ios") {
        pinTimeout = setTimeout(() => {
          // dispatch(actions.navigateTo("LoginPasscode"));
          clearTimeout(pinTimeout);
        }, ASK_FOR_PIN_AFTER);
      }

      if (Platform.OS === "android") {
        startOfBackgroundTimer = new Date().getTime();
      }
    }

    dispatch({
      type: ACTIONS.SET_APP_STATE,
      appState: nextAppState,
    })
  }
}

function setInternetConnection(connection) {
  return {
    type: ACTIONS.SET_INTERNET_CONNECTION,
    internetConnected: connection,
  }
}

// Initialize all data needed for the App
async function initAppData() {
  await store.dispatch(actions.getInitialCelsiusData())

  // get user token
  const token = await getSecureStoreKey(SECURITY_STORAGE_AUTH_KEY);

  // fetch user
  if (token) await store.dispatch(actions.getProfileInfo());

  // get expired session
  const { expiredSession } = store.getState().user;

  if (token && !expiredSession) {
    registerForPushNotificationsAsync();

    // get all KYC document types and claimed transfers for non-verified users
    const { profile } = store.getState().user;
    if (profile) {
      if (!profile.kyc || (profile.kyc && profile.kyc.status !== KYC_STATUSES.passed)) {
        await store.dispatch(actions.getKYCDocTypes());
        await store.dispatch(actions.getAllTransfers(TRANSFER_STATUSES.claimed));
      }

      // get wallet details for verified users
      if (profile.kyc && profile.kyc.status === KYC_STATUSES.passed) {
        await store.dispatch(actions.getWalletDetails());
        await store.dispatch(actions.getWalletSummary());
      }
    }
  } else {
    // logout if expired session or no token
    await store.dispatch(actions.logoutUser());

    // initialize MixPanel with new user
    mixpanelAnalytics.identify(uuid());

    // TODO(fj): check if we need this...
    store.dispatch(actions.fireUserAction("enteredInitialPin"));
  }

  // get general data for te app
  await store.dispatch(actions.getCurrencyRates());
  await store.dispatch(actions.getCurrencyGraphs());

  // TODO: add compliance
  // await store.dispatch(actions.getBlacklistedCountries());
}


// --------------------------------------------------------------------------------------
