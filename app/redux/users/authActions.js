import { Constants } from 'expo';
import Branch from 'react-native-branch';

import ACTIONS from '../../config/constants/ACTIONS';
import API from '../../config/constants/API';
import { startApiCall, apiError } from '../api/apiActions';
import { navigateTo } from '../nav/navActions';
import { showMessage, setFormErrors } from '../ui/uiActions';
import { claimAllBranchTransfers } from '../transfers/transfersActions';
import { deleteSecureStoreKey, setSecureStoreKey } from "../../utils/expo-storage";
import usersService from '../../services/users-service';
import borrowersService from '../../services/borrowers-service';
import apiUtil from '../../utils/api-util';
import logger from '../../utils/logger-util';
import { analyticsEvents } from "../../utils/analytics-util";
import branchService from "../../services/branch-service";

const { SECURITY_STORAGE_AUTH_KEY } = Constants.manifest.extra;

export {
  loginBorrower,
  getLoggedInBorrower,
  loginUser,
  registerUser,
  registerUserSuccess,
  updateUser,
  registerUserTwitter,
  registerUserFacebook,
  registerUserGoogle,
  loginGoogle,
  loginFacebook,
  loginTwitter,
  sendResetLink,
  resetPassword,
  logoutUser,
  expireSession,
  finishSignupTwo,
}


function loginUser({ email, password }) {
  return async dispatch => {
    dispatch(startApiCall(API.LOGIN_USER));

    try {
      const res = await usersService.login({ email, password });

      // add token to expo storage
      await setSecureStoreKey(SECURITY_STORAGE_AUTH_KEY, res.data.auth0.id_token);

      dispatch(loginUserSuccess(res.data));
      dispatch(claimAllBranchTransfers());

      dispatch(navigateTo('Home', true));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.LOGIN_USER, err));
    }
  }
}

function loginUserSuccess(data) {
  analyticsEvents.sessionStart();
  return {
    type: ACTIONS.LOGIN_USER_SUCCESS,
    callName: API.LOGIN_USER,
    tokens: data.auth0,
    user: data.user,
  }
}


function loginBorrower({ email, password }) {
  return async dispatch => {
    dispatch(startApiCall(API.LOGIN_BORROWER));
    try {
      const res = await borrowersService.login({ email, password });

      // add token to expo storage
      await setSecureStoreKey(SECURITY_STORAGE_AUTH_KEY, res.data.auth0.id_token);

      const userRes = await usersService.getPersonalInfo();
      res.data.user = userRes.data;

      dispatch(loginBorrowerSuccess(res.data));
      dispatch(claimAllBranchTransfers());

      dispatch(navigateTo('Home', true))
    } catch (err) {
      if (err.type === 'Validation error') {
        dispatch(setFormErrors(apiUtil.parseValidationErrors(err)));
      } else {
        dispatch(showMessage('error', err.msg));
      }
      dispatch(apiError(API.LOGIN_BORROWER, err));
    }
  }
}

function loginBorrowerSuccess(data) {
  analyticsEvents.sessionStart();
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
      const res = await usersService.getPersonalInfo();
      dispatch(getLoggedInBorrowerSuccess(res.data));
    } catch (err) {
      if (err.status === 422) {
        deleteSecureStoreKey(SECURITY_STORAGE_AUTH_KEY);
      }
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
  analyticsEvents.startedSignup('Email');
  return async (dispatch, getState) => {
    dispatch(startApiCall(API.REGISTER_USER));
    try {
      const { registeredLink } = getState().branch;
      const referralLinkId = registeredLink ? registeredLink.id : null;
      const res = await usersService.register({
        ...user,
        referralLinkId,
      });

      // add token to expo storage
      await setSecureStoreKey(SECURITY_STORAGE_AUTH_KEY, res.data.auth0.id_token);

      dispatch(registerUserSuccess(res.data));
      dispatch(claimAllBranchTransfers());
      await analyticsEvents.sessionStart();
      analyticsEvents.finishedSignup('Email', referralLinkId, res.data.user);
    } catch (err) {
      if (err.type === 'Validation error') {
        dispatch(setFormErrors(apiUtil.parseValidationErrors(err)));
      } else {
        dispatch(showMessage('error', err.msg));
      }
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
  return async (dispatch, getState) => {
    dispatch(startApiCall(API.REGISTER_USER_TWITTER));
    try {
      const { registeredLink } = getState().branch;
      const referralLinkId = registeredLink ? registeredLink.id : null;

      const res = await usersService.registerTwitter({
        ...user,
        referralLinkId,
      });

      // add token to expo storage
      await setSecureStoreKey(SECURITY_STORAGE_AUTH_KEY, res.data.id_token);

      dispatch(registerUserTwitterSuccess(res.data));
      dispatch(claimAllBranchTransfers());
      await analyticsEvents.sessionStart();
      analyticsEvents.finishedSignup('Twitter', referralLinkId, res.data.user);
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.REGISTER_USER_TWITTER, err));
    }
  }
}

function registerUserTwitterSuccess(data) {

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
      dispatch(claimAllBranchTransfers());
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.LOGIN_USER_TWITTER, err))
    }
  }
}

function loginUserTwitterSuccess(data) {
  analyticsEvents.sessionStart();
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
  return async (dispatch, getState) => {
    dispatch(startApiCall(API.REGISTER_USER_FACEBOOK));
    try {
      const { registeredLink } = getState().branch;
      const referralLinkId = registeredLink ? registeredLink.id : null;

      const res = await usersService.registerFacebook({
        ...user,
        referralLinkId,
      });

      // add token to expo storage
      await setSecureStoreKey(SECURITY_STORAGE_AUTH_KEY, res.data.id_token);

      dispatch(registerUserFacebookSuccess(res.data));
      dispatch(claimAllBranchTransfers());
      await analyticsEvents.sessionStart();
      analyticsEvents.finishedSignup('Facebook', referralLinkId, res.data.user);
    } catch (err) {
      console.log(err);
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.REGISTER_USER_FACEBOOK, err));
    }
  }
}

function registerUserFacebookSuccess(data) {

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
      dispatch(claimAllBranchTransfers());
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.LOGIN_USER_FACEBOOK, err))
    }
  }
}

function loginUserFacebookSuccess(data) {
  analyticsEvents.sessionStart();
  return (dispatch) => {
    dispatch({
      type: ACTIONS.LOGIN_USER_FACEBOOK_SUCCESS,
      callName: API.LOGIN_USER_FACEBOOK,
      user: data.user,
    });

    dispatch(navigateTo('Home', true));
  }
}

function registerUserGoogle(user) {
  return async (dispatch, getState) => {
    dispatch(startApiCall(API.REGISTER_USER_GOOGLE));
    try {
      const { registeredLink } = getState().branch;
      const referralLinkId = registeredLink ? registeredLink.id : null;

      const res = await usersService.registerGoogle({
        ...user,
        referralLinkId,
      });

      await setSecureStoreKey(SECURITY_STORAGE_AUTH_KEY, res.data.id_token);
      dispatch(registerUserGoogleSuccess(res.data))
      dispatch(claimAllBranchTransfers());
      await analyticsEvents.sessionStart();
      analyticsEvents.finishedSignup('Google', referralLinkId, res.data.user);
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.REGISTER_USER_GOOGLE, err))
    }
  }
}

function registerUserGoogleSuccess(data) {

  return (dispatch) => {
    dispatch({
      type: ACTIONS.REGISTER_USER_GOOGLE_SUCCESS,
      callName: API.REGISTER_USER_GOOGLE,
      user: data.user,
    })
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
      dispatch(claimAllBranchTransfers());
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.REGISTER_USER_GOOGLE, err))
    }
  }
}

function loginUserGoogleSuccess(data) {
  analyticsEvents.sessionStart();
  return (dispatch) => {
    dispatch({
      type: ACTIONS.LOGIN_USER_GOOGLE_SUCCESS,
      callName: API.LOGIN_USER_GOOGLE,
      user: data.user,
    });

    dispatch(navigateTo('Home', true));
  }
}

// TODO(fj) should replace update user endpoint w patch /me
function updateUser(user) {
  console.log({ promo: 'promo' })
  return async (dispatch, getState) => {
    dispatch(startApiCall(API.UPDATE_USER));
    try {
      const { registeredLink } = getState().branch;
      const referralLinkId = registeredLink ? registeredLink.id : null;

      const res = await usersService.update({
        ...user,
        referralLinkId,
      });

      dispatch(updateUserSuccess(res.data));
    } catch (err) {
      if (err.type === 'Validation error') {
        dispatch(setFormErrors(apiUtil.parseValidationErrors(err)));
      } else {
        dispatch(showMessage('error', err.msg));
      }
      dispatch(apiError(API.UPDATE_USER, err));
    }
  }
}

function updateUserSuccess(data) {
  return {
    type: ACTIONS.UPDATE_USER_SUCCESS,
    callName: API.UPDATE_USER,
    user: data.user,
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
      const { data } = await usersService.resetPassword(currentPassword, newPassword);
      const { auth0: { id_token: newAuthToken } } = data;

      await setSecureStoreKey(SECURITY_STORAGE_AUTH_KEY, newAuthToken);

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

function logoutUser() {
  return async dispatch => {
    try {
      await deleteSecureStoreKey(SECURITY_STORAGE_AUTH_KEY);
      await analyticsEvents.sessionEnd();
      analyticsEvents.logoutUser();
      if (Constants.appOwnership === 'standalone') Branch.logout();

      dispatch({
        type: ACTIONS.LOGOUT_USER,
      });
    } catch (err) {
      logger.log(err);
    }
  }
}

function expireSession() {
  return async dispatch => {
    try {
      dispatch({
        type: ACTIONS.EXPIRE_SESSION,
      });
    } catch (err) {
      logger.log(err);
    }
  }
}

function finishSignupTwo() {
  return async (dispatch, getState) => {
    try {
      const { user } = getState().users;
      const { formData } = getState().ui;

      // check promo code
      if (formData.promoCode) {
        dispatch(startApiCall(API.SUBMIT_PROMO_CODE))

        const linkRes = await branchService.submitPromoCodeByRegister(formData.promoCode);
        const linkResData = linkRes.data;

        dispatch({
          type: ACTIONS.SUBMIT_PROMO_CODE_SUCCESS,
          callName: API.SUBMIT_PROMO_CODE,
          branchLink: linkResData.branch_link
        });
      }

      const data = { ...formData };

      // register twitter user
      if (user && user.twitter_id) {
        return dispatch(registerUserTwitter({ ...user, ...data }));
      }

      // register facebook user
      if (user && user.facebook_id) {
        return dispatch(registerUserFacebook({ ...user, ...data }));
      }

      // register google user
      if (user && user.google_id) {
        return dispatch(registerUserGoogle({ ...user, ...data }));
      }

      // update user
      if (user && !user.twitter_id && !user.facebook_id && !user.google_id) {
        return dispatch(updateUser(data));
      }
    } catch (err) {
      console.log(err)
      dispatch(apiError(API.SUBMIT_PROMO_CODE));
      dispatch(showMessage("warning", "Sorry, but this promo code is not valid!"));
    }
  }
}
