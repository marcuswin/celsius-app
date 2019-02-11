// TODO(fj): check all actions that need to be here (loadingAssets...)

import { Constants } from "expo";
import { Platform } from "react-native";
import uuid from "uuid";

import store from "../store";
import * as actions from "../actions";
import {
  getSecureStoreKey,
  deleteSecureStoreKey,
  setSecureStoreKey
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
  await setSecureStoreKey(SECURITY_STORAGE_AUTH_KEY, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1VWTNNamRCTURNeFJEQkVRalZDTWpRMk9VUkVNRFUwTnpSQ1JUWXpRVFZCUVRZelJUTkZOZyJ9.eyJuaWNrbmFtZSI6ImZpbGlwLmpvdmFrYXJpYyt3bHQiLCJuYW1lIjoiZmlsaXAuam92YWthcmljK3dsdEBtdnB3b3Jrc2hvcC5jbyIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci9kOWE0YzRmOTE1MGFhYmYyYzFkMzBkYTgwYzA5ZTlkYj9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRmZpLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDE5LTAyLTA3VDE3OjE0OjI0LjE0M1oiLCJlbWFpbCI6ImZpbGlwLmpvdmFrYXJpYyt3bHRAbXZwd29ya3Nob3AuY28iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOi8vY2Vsc2l1c25ldHdvcmstc3RhZ2luZy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWIyOGYwNmE4NzYzZWYzNTY5NzZmNTYxIiwiYXVkIjoiSGdFSnFhdVJKSnBDM1gyVE9SS3E1cnRaT1l3WHlrWTUiLCJpYXQiOjE1NDk1NTk2NjQsImV4cCI6MTU0OTU5NTY2NH0.THIedZEj2Hcpz8km7952HwaWyMlTziVU0md7Xbq2XzQesSiESHfObn7Pz_zlhYO9pRWLRgRpFpNf4F0zB5qdgUqNYwaF2atsuSTItY5R5DoBCnHJFuYbd0TNtBjo1MRV5PcRaTMguq4KX88M1XWhUmwaoo3KSKEFttuZ6PAffuSVHJ-2egoXkh4BH04E6wxBsNz0ZiXZfMVUVwI4mvASE5wzcz0077gBsxgkCwySa5xw_UHQyDroiqD-OAJnU5I8ka1O7pS6sR4rtpiADnM4XGHeIUo_5Ze2EWs14sZRI5Jl7Dc_m09xsiFnQM8gQTgCghz3ReUJTzbZn8UPj3__Sg');
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
