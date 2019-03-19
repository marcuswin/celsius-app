import { Constants, Facebook, GoogleSignIn, Google } from "expo";

import ACTIONS from "../../constants/ACTIONS";
import API from "../../constants/API";
import { startApiCall, apiError } from "../api/apiActions";
import { navigateTo } from "../nav/navActions";
import { showMessage } from "../ui/uiActions";
import { updateFormFields } from "../forms/formsActions";
import { claimAllBranchTransfers } from "../transfers/transfersActions";
import { setSecureStoreKey } from "../../utils/expo-storage";
import usersService from "../../services/users-service";
import { analyticsEvents } from "../../utils/analytics-util";
import { initAppData } from "../app/appActions";

const {
  SECURITY_STORAGE_AUTH_KEY,
  FACEBOOK_APP_ID,
  FACEBOOK_URL,
  GOOGLE_WEB_CLIENT_ID,
  GOOGLE_ANDROID_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
} = Constants.manifest.extra;

export {
  registerUserTwitter,
  loginTwitter,
  twitterClose,
  twitterOpen,
  twitterGetAccessToken,
  twitterSuccess,
  authTwitter,

  registerUserFacebook,
  loginFacebook,
  facebookSuccess,
  facebookAuth,

  registerUserGoogle,
  loginGoogle,
  googleSuccess,
  googleAuth,
};


/**
 * Handles response after twitter login
 * @param {string} type - one of login|register
 * @param {Object} twitterUser - response from twitter success
 */
function authTwitter(type, twitterUser) {
  return (dispatch, getState) => {
    const user = getState().user.profile
    if (type === 'login') {
      dispatch(loginTwitter({
        ...user,
        ...twitterUser,
      }))
    } else {
      dispatch(updateFormFields({
        email: twitterUser.email,
        firstName: twitterUser.name,
        lastName: '',
        twitterId: twitterUser.id_str,
        accessToken: twitterUser.twitter_oauth_token,
        secretToken: twitterUser.twitter_oauth_secret,
      }))
    }
  }
}


/**
 * Registers a new user through Twitter
 * @param {Object} user
 */
function registerUserTwitter(user) {
  return async (dispatch, getState) => {
    dispatch(startApiCall(API.REGISTER_USER_TWITTER));
    try {
      const referralLinkId = getState().branch.referralLinkId;

      const res = await usersService.registerTwitter({
        ...user,
        referralLinkId
      });

      // add token to expo storage
      await setSecureStoreKey(SECURITY_STORAGE_AUTH_KEY, res.data.id_token);

      dispatch(registerUserTwitterSuccess(res.data));
      dispatch(claimAllBranchTransfers());
      await analyticsEvents.sessionStart();
      analyticsEvents.finishedSignup("Twitter", referralLinkId, res.data.user);
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.REGISTER_USER_TWITTER, err));
    }
  };
}


/**
 * @todo: move to registerUserTwitter
 */
function registerUserTwitterSuccess(data) {

  return (dispatch) => {
    dispatch({
      type: ACTIONS.REGISTER_USER_TWITTER_SUCCESS,
      callName: API.REGISTER_USER_TWITTER,
      user: data.user
    });
  };
}


/**
 * Log a user in through Twitter
 * @param {Object} twitterUser
 * @param {string} twitterUser.email
 * @param {string} twitterUser.name
 * @param {string} twitterUser.id_str
 * @param {string} twitterUser.twitter_oauth_token
 * @param {string} twitterUser.twitter_oauth_secret
 */
function loginTwitter(twitterUser) {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.LOGIN_USER_TWITTER));

      const user = {
        email: twitterUser.email,
        first_name: twitterUser.name,
        twitter_id: twitterUser.id_str,
        access_token: twitterUser.twitter_oauth_token,
        secret_token: twitterUser.twitter_oauth_secret,
      }

      const res = await usersService.twitterLogin(user);

      await dispatch(loginSocialSuccess('twitter', res.data.id_token));
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.LOGIN_USER_TWITTER, err));
    }
  };
}


/**
 * Closes Twitter modal
 * @returns {Object} - Action
 */
function twitterClose() {
  return {
    type: ACTIONS.TWITTER_CLOSE
  };
}


/**
 * Opens Twitter Modal
 * @returns {Object} - Action
 */
function twitterOpen() {
  return {
    type: ACTIONS.TWITTER_OPEN
  };
}


/**
 * Sets Twitter access token in reducer
 * @param {Object} tokens
 * @returns {Object} - Action
 */
function twitterGetAccessToken(tokens) {
  return {
    type: ACTIONS.TWITTER_GET_ACCESS_TOKEN,
    twitter_tokens: tokens
  };
}


/**
 * Successfully logged into Twitter
 * @param {Object} user
 * @returns {Object} - Action
 */
function twitterSuccess(user) {
  return {
    type: ACTIONS.TWITTER_SUCCESS,
    twitter_user: user
  };
}


/**
 * Authorizes user on Facebook
 *
 * @param {string} authReason - one of login|register
 */
function facebookAuth(authReason) {
  return async dispatch => {
    if (!["login", "register"].includes(authReason)) return;

    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID.toString(), {
        permissions: ["public_profile", "email"],
        behavior: "web"
      });

      if (type === "success") {
        const response = await fetch(`${FACEBOOK_URL}${token}`);

        const user = await response.json();
        user.accessToken = token;

        if (authReason === "login") {
          dispatch(loginFacebook(user));
        } else {
          dispatch(updateFormFields({
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            facebookId: user.id,
            accessToken: user.accessToken,
          }))
        }
      }
    } catch (e) {
      dispatch(showMessage("error", e.message));
    }
  };
};


/**
 * Creates new user through Facebook
 * @param {Object} user
 */
function registerUserFacebook(user) {
  return async (dispatch, getState) => {
    dispatch(startApiCall(API.REGISTER_USER_FACEBOOK));
    try {
      const referralLinkId = getState().branch.referralLinkId;

      const res = await usersService.registerFacebook({
        ...user,
        referralLinkId
      });

      // add token to expo storage
      await setSecureStoreKey(SECURITY_STORAGE_AUTH_KEY, res.data.id_token);

      dispatch(registerUserFacebookSuccess(res.data));
      dispatch(claimAllBranchTransfers());
      await analyticsEvents.sessionStart();
      analyticsEvents.finishedSignup("Facebook", referralLinkId, res.data.user);
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.REGISTER_USER_FACEBOOK, err));
    }
  };
}


/**
 * @todo: move to registerUserFacebook
 */
function registerUserFacebookSuccess(data) {

  return (dispatch) => {
    dispatch({
      type: ACTIONS.REGISTER_USER_FACEBOOK_SUCCESS,
      callName: API.REGISTER_USER_FACEBOOK,
      user: data.user
    });
  };
}


/**
 * Logs a user into Celsius through Facebook
 * @param {Object} facebookUser
 * @param {string} facebookUser.email
 * @param {string} facebookUser.first_name
 * @param {string} facebookUser.last_name
 * @param {string} facebookUser.id - facebook id
 * @param {string} facebookUser.accessToken - facebook access token
 */
function loginFacebook(facebookUser) {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.LOGIN_USER_FACEBOOK));

      const user = {
        email: facebookUser.email,
        first_name: facebookUser.first_name,
        last_name: facebookUser.last_name,
        facebook_id: facebookUser.id,
        access_token: facebookUser.accessToken,
      }

      const res = await usersService.facebookLogin(user);

      await dispatch(loginSocialSuccess('facebook', res.data.id_token));
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.LOGIN_USER_FACEBOOK, err));
    }
  };
}


/**
 * User successfully logged in through Facebook
 * @param {Object} user
 * @returns {Object} - Action
 */
function facebookSuccess(user) {
  return {
    type: ACTIONS.FACEBOOK_SUCCESS,
    facebook_user: user
  };
}


/**
 * Authorizes user on Facebook
 *
 * @param {string} authReason - one of login|register
 */
function googleAuth(authReason) {
  return async dispatch => {
    if (!["login", "register"].includes(authReason)) return;

    try {
      let result;
      if (Constants.appOwnership !== 'standalone') {
        // for Expo Client
        result = await Google.logInAsync({
          behavior: 'web',
          webClientId: GOOGLE_WEB_CLIENT_ID,
          androidClientId: GOOGLE_ANDROID_CLIENT_ID,
          iosClientId: GOOGLE_IOS_CLIENT_ID,
          scopes: ['profile', 'email'],
        });
      } else {
        // for standalone apps
        await GoogleSignIn.initAsync({
          clientId: GOOGLE_WEB_CLIENT_ID
        });
        await GoogleSignIn.askForPlayServicesAsync();
        result = await GoogleSignIn.signInAsync();
      };

      if (result.type === "success") {
        const user = result.user;
        user.access_token = result.accessToken

        if (authReason === "login") {
          dispatch(loginGoogle(user));
        } else {
          dispatch(updateFormFields({
            email: user.email,
            firstName: user.givenName,
            lastName: user.familyName,
            googleId: user.id,
            profilePicture: user.photoURL,
            accessToken: user.access_token,
          }))
        }
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }
};


/**
 * Creates a new user through Google
 * @param {Object} user - response from google
 */
function registerUserGoogle(user) {
  return async (dispatch, getState) => {
    dispatch(startApiCall(API.REGISTER_USER_GOOGLE));
    try {
      const referralLinkId = getState().branch.referralLinkId;

      const res = await usersService.registerGoogle({
        ...user,
        referralLinkId
      });

      await setSecureStoreKey(SECURITY_STORAGE_AUTH_KEY, res.data.id_token);
      dispatch(registerUserGoogleSuccess(res.data));
      dispatch(claimAllBranchTransfers());
      await analyticsEvents.sessionStart();
      analyticsEvents.finishedSignup("Google", referralLinkId, res.data.user);
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.REGISTER_USER_GOOGLE, err));
    }
  };
}


/**
 * @todo: move to registerUserGoogle
 */
function registerUserGoogleSuccess(data) {

  return (dispatch) => {
    dispatch({
      type: ACTIONS.REGISTER_USER_GOOGLE_SUCCESS,
      callName: API.REGISTER_USER_GOOGLE,
      user: data.user
    });
  };
}


/**
 * Logs a user in through Google
 * @param {Object} googleUser - user from Google
 * @param {string} googleUser.email
 * @param {string} googleUser.givenName
 * @param {string} googleUser.familyName
 * @param {string} googleUser.id
 * @param {string} googleUser.photoURL
 * @param {string} googleUser.access_token
 */
function loginGoogle(googleUser) {
  return async dispatch => {
    dispatch(startApiCall(API.LOGIN_USER_GOOGLE));
    try {
      const user = {
        email: googleUser.email,
        first_name: googleUser.givenName,
        last_name: googleUser.familyName,
        google_id: googleUser.id,
        profile_picture: googleUser.photoURL,
        access_token: googleUser.access_token,
      }
      const res = await usersService.googleLogin(user);

      await dispatch(loginSocialSuccess('google', res.data.id_token));
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.REGISTER_USER_GOOGLE, err));
    }
  };
}


/**
 * User successfully logged in through Google
 * @param {Object} user - user from Google
 * @returns {Object} - Action
 */
function googleSuccess(user) {
  return {
    type: ACTIONS.GOOGLE_SUCCESS,
    google_user: user
  };
}



/**
 * Successfully log the user in from any social network
 *
 * @param {string} network - one of twitter|facebook|google
 * @param {string} token - auth token from social network
 */
function loginSocialSuccess(network, token) {
  return async (dispatch) => {
    await setSecureStoreKey(SECURITY_STORAGE_AUTH_KEY, token);

    const userRes = await usersService.getPersonalInfo();
    const user = userRes.data;

    await dispatch(initAppData());

    dispatch(navigateTo('WalletFab'))

    dispatch({
      type: ACTIONS[`LOGIN_USER_${ network.toUpperCase() }_SUCCESS`],
      user,
    })

    // dispatch(claimAllBranchTransfers());
  }
}
