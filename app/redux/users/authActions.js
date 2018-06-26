import {Constants} from 'expo';

import ACTIONS from '../../config/constants/ACTIONS';
import API from '../../config/constants/API';
import {startApiCall, apiError} from '../api/apiActions';
import {navigateTo} from '../nav/navActions';
import {showMessage} from '../ui/uiActions';
import {setSecureStoreKey} from '../../utils/expo-storage';
import usersService from '../../services/users-service';
import borrowersService from '../../services/borrowers-service';
import { actions as mixpanelActions } from '../../services/mixpanel'


const {SECURITY_STORAGE_AUTH_KEY} = Constants.manifest.extra;

export {
  loginBorrower,
  getLoggedInBorrower,
  loginUser,
  registerUser,
  updateUser,
  registerBorrower,
  registerExistingBorrower,
  registerUserTwitter,
  registerUserFacebook,
  registerUserGoogle,
  loginGoogle,
  loginFacebook,
  loginTwitter,
  sendResetLink,
  resetPassword,
}


function loginUser({email, password}) {
  return async dispatch => {
    dispatch(startApiCall(API.LOGIN_USER));

    try {
      const res = await usersService.login({email, password});

      // add token to expo storage
      await setSecureStoreKey(SECURITY_STORAGE_AUTH_KEY, res.data.auth0.id_token);

      dispatch(loginUserSuccess(res.data));

    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.LOGIN_USER, err));
    }
  }
}

function loginUserSuccess(data) {
  return {
    type: ACTIONS.LOGIN_USER_SUCCESS,
    callName: API.LOGIN_USER,
    tokens: data.auth0,
    user: data.user,
  }
}


function loginBorrower({email, password}) {
  return async dispatch => {
    dispatch(startApiCall(API.LOGIN_BORROWER));
    try {
      const res = await borrowersService.login({email, password});

      // add token to expo storage
      await setSecureStoreKey(SECURITY_STORAGE_AUTH_KEY, res.data.auth0.id_token);

      const userRes = await usersService.getPersonalInfo();
      res.data.user = userRes.data;

      dispatch(loginBorrowerSuccess(res.data));

      dispatch(navigateTo('Home', true))
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.LOGIN_BORROWER, err));
    }
  }
}

function loginBorrowerSuccess(data) {
  return {
    type: ACTIONS.LOGIN_BORROWER_SUCCESS,
    callName: API.LOGIN_BORROWER,
    tokens: data.auth0,
    borrower: data.borrower,
  }
}


function getLoggedInBorrower() {
  return async dispatch => {
    dispatch(startApiCall(API.GET_LOGGED_IN_BORROWER));
    try {
      const res = await borrowersService.getLoggedIn();
      dispatch(getLoggedInBorrowerSuccess(res.data));
    } catch (err) {
      dispatch(apiError(API.GET_LOGGED_IN_BORROWER, err));
    }
  }
}

function getLoggedInBorrowerSuccess(borrower) {
  return {
    type: ACTIONS.GET_LOGGED_IN_BORROWER_SUCCESS,
    callName: API.GET_LOGGED_IN_BORROWER,
    borrower,
  }
}


function registerUser(user) {
  mixpanelActions.startedSignup('email');
  return async dispatch => {
    dispatch(startApiCall(API.REGISTER_USER));
    try {
      const res = await usersService.register(user);

      // add token to expo storage
      await setSecureStoreKey(SECURITY_STORAGE_AUTH_KEY, res.data.auth0.id_token);

      dispatch(registerUserSuccess(res.data));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.REGISTER_USER, err));
    }
  }
}

function registerUserSuccess(data) {
  return {
    type: ACTIONS.REGISTER_USER_SUCCESS,
    callName: API.REGISTER_USER,
    user: data.user,
  }
}


function registerUserTwitter(user) {
  return async dispatch => {
    dispatch(startApiCall(API.REGISTER_USER_TWITTER));
    try {
      const res = await usersService.registerTwitter(user);

      // add token to expo storage
      await setSecureStoreKey(SECURITY_STORAGE_AUTH_KEY, res.data.id_token);

      dispatch(registerUserTwitterSuccess(res.data));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.REGISTER_USER_TWITTER, err));
    }
  }
}

function registerUserTwitterSuccess(data) {
  mixpanelActions.finishedSignup('oAuth');
  return (dispatch) => {
    dispatch({
      type: ACTIONS.REGISTER_USER_TWITTER_SUCCESS,
      callName: API.REGISTER_USER_TWITTER,
      user: data.user,
    })
  }
}

function loginTwitter(user) {
  return async dispatch => {
    dispatch(startApiCall(API.LOGIN_USER_TWITTER));
    try {
      const res = await usersService.twitterLogin(user);

      await setSecureStoreKey(SECURITY_STORAGE_AUTH_KEY, res.data.id_token);

      const userRes = await usersService.getPersonalInfo();
      res.data.user = userRes.data;

      dispatch(loginUserTwitterSuccess(res.data))
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.LOGIN_USER_TWITTER, err))
    }
  }
}

function loginUserTwitterSuccess(data) {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.LOGIN_USER_TWITTER_SUCCESS,
      callName: API.LOGIN_USER_TWITTER,
      user: data.user,
    });

    dispatch(navigateTo('Home', true));
  }
}

function registerUserFacebook(user) {
  return async dispatch => {
    dispatch(startApiCall(API.REGISTER_USER_FACEBOOK));
    try {
      const res = await usersService.registerFacebook(user);

      // add token to expo storage
      await setSecureStoreKey(SECURITY_STORAGE_AUTH_KEY, res.data.id_token);

      dispatch(registerUserFacebookSuccess(res.data));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.REGISTER_USER_FACEBOOK, err));
    }
  }
}

function registerUserGoogle(user) {
  return async dispatch => {
    dispatch(startApiCall(API.REGISTER_USER_GOOGLE));
    try {
      const res = await usersService.registerGoogle(user);
      await setSecureStoreKey(SECURITY_STORAGE_AUTH_KEY, res.data.id_token);
      dispatch(registerUserGoogleSuccess(res.data))
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.REGISTER_USER_GOOGLE, err))
    }
  }
}

function loginGoogle(user) {
  return async dispatch => {
    dispatch(startApiCall(API.LOGIN_USER_GOOGLE));
    try {
      const res = await usersService.googleLogin(user);

      await setSecureStoreKey(SECURITY_STORAGE_AUTH_KEY, res.data.id_token);

      const userRes = await usersService.getPersonalInfo();
      res.data.user = userRes.data;

      dispatch(loginUserGoogleSuccess(res.data))
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.REGISTER_USER_GOOGLE, err))
    }
  }
}

function registerUserFacebookSuccess(data) {
  mixpanelActions.finishedSignup('oAuth');
  return (dispatch) => {
    dispatch({
      type: ACTIONS.REGISTER_USER_FACEBOOK_SUCCESS,
      callName: API.REGISTER_USER_FACEBOOK,
      user: data.user,
    })
  }
}

function loginFacebook(user) {
  return async dispatch => {
    dispatch(startApiCall(API.LOGIN_USER_FACEBOOK));
    try {
      const res = await usersService.facebookLogin(user);

      await setSecureStoreKey(SECURITY_STORAGE_AUTH_KEY, res.data.id_token);

      const userRes = await usersService.getPersonalInfo();
      res.data.user = userRes.data;

      dispatch(loginUserFacebookSuccess(res.data))
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.LOGIN_USER_FACEBOOK, err))
    }
  }
}

function loginUserFacebookSuccess(data) {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.LOGIN_USER_FACEBOOK_SUCCESS,
      callName: API.LOGIN_USER_FACEBOOK,
      user: data.user,
    });

    dispatch(navigateTo('Home', true));
  }
}

function registerUserGoogleSuccess(data) {
  mixpanelActions.finishedSignup('oAuth');
  return (dispatch) => {
    dispatch({
      type: ACTIONS.REGISTER_USER_GOOGLE_SUCCESS,
      callName: API.REGISTER_USER_GOOGLE,
      user: data.user,
    })
  }
}

function loginUserGoogleSuccess(data) {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.LOGIN_USER_GOOGLE_SUCCESS,
      callName: API.LOGIN_USER_GOOGLE,
      user: data.user,
    });

    dispatch(navigateTo('Home', true));
  }
}

function updateUser(user) {
  return async dispatch => {
    dispatch(startApiCall(API.UPDATE_USER));
    try {
      const res = await usersService.update(user);

      dispatch(updateUserSuccess(res.data));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.UPDATE_USER, err));
    }
  }
}

function updateUserSuccess(data) {
  mixpanelActions.finishedSignup('email');
  return {
    type: ACTIONS.UPDATE_USER_SUCCESS,
    callName: API.UPDATE_USER,
    user: data.user,
  }
}

function registerBorrower(borrower) {
  return async dispatch => {
    dispatch(startApiCall(API.REGISTER_BORROWER));
    try {
      const res = await borrowersService.register(borrower);
      dispatch(registerBorrowerSuccess(res.data));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.REGISTER_BORROWER, err));
    }
  }
}

function registerBorrowerSuccess(data) {
  return {
    type: ACTIONS.REGISTER_BORROWER_SUCCESS,
    callName: API.REGISTER_BORROWER,
    user: data.user,
    borrower: data.borrower,
  }
}

function registerExistingBorrower(borrower) {
  return async dispatch => {
    dispatch(startApiCall(API.REGISTER_EXISTING_BORROWER));
    try {
      const res = await borrowersService.registerExisting(borrower);
      dispatch(registerExistingBorrowerSuccess(res.data));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.REGISTER_EXISTING_BORROWER, err));
    }
  }
}

function registerExistingBorrowerSuccess(data) {
  return {
    type: ACTIONS.REGISTER_EXISTING_BORROWER_SUCCESS,
    callName: API.REGISTER_EXISTING_BORROWER,
    user: data.user,
    borrower: data.borrower,
  }
}

function sendResetLink(email) {
  return async dispatch => {
    dispatch(startApiCall(API.SEND_RESET_LINK));
    try {
      await usersService.sendResetLink(email);
      dispatch(showMessage('info', 'Email sent!'));
      dispatch(sendResetLinkSuccess());
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.SEND_RESET_LINK, err));
    }
  }
}

function sendResetLinkSuccess() {
  return {
    type: ACTIONS.SEND_RESET_LINK_SUCCESS,
    callName: API.SEND_RESET_LINK,
  }
}

function resetPassword(currentPassword, newPassword) {
  return async dispatch => {
    dispatch(startApiCall(API.RESET_PASSWORD));
    try {
      await usersService.resetPassword(currentPassword, newPassword);
      dispatch(showMessage('success', 'Password successfully changed.'));
      dispatch(resetPasswordSuccess());
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.RESET_PASSWORD, err));
    }
  }
}

function resetPasswordSuccess() {
  return {
    type: ACTIONS.RESET_PASSWORD_SUCCESS,
    callName: API.RESET_PASSWORD,
  }
}
