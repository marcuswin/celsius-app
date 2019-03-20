import { Constants } from 'expo';
import Branch from 'react-native-branch';

import ACTIONS from '../../constants/ACTIONS';
import API from '../../constants/API';
import { startApiCall, apiError } from '../api/apiActions';
import { navigateTo } from '../nav/navActions';
import { showMessage, toggleKeypad } from "../ui/uiActions";
import { getComplianceInfo } from "../user/userActions";
import { initAppData } from "../app/appActions";
import { registerUserFacebook, registerUserGoogle, registerUserTwitter } from "./thirdPartyActions";
import { claimAllBranchTransfers } from '../transfers/transfersActions';
import { deleteSecureStoreKey, setSecureStoreKey } from "../../utils/expo-storage";
import usersService from '../../services/users-service';
import apiUtil from '../../utils/api-util';
import logger from '../../utils/logger-util';
import { analyticsEvents } from "../../utils/analytics-util";
import { setFormErrors } from '../forms/formsActions';
import meService from '../../services/me-service';

const { SECURITY_STORAGE_AUTH_KEY } = Constants.manifest.extra;

export {
  createAccount,
  loginUser,
  registerUser,
  registerUserSuccess,
  updateUser,
  sendResetLink,
  resetPassword,
  logoutUser,
  logoutFromAllDevices,
  expireSession,
  setPin,
  changePin,
}


/**
 * Logs the user in
 * @param {Object} params
 * @param {string} params.email
 * @param {string} params.password
 */
function loginUser({ email, password }) {
  return async dispatch => {
    dispatch(startApiCall(API.LOGIN_USER));

    try {
      const res = await usersService.login({ email, password });

      // add token to expo storage
      await setSecureStoreKey(SECURITY_STORAGE_AUTH_KEY, res.data.auth0.id_token);

      await dispatch(initAppData());
      dispatch(claimAllBranchTransfers());
      await dispatch(await loginUserSuccess(res.data));

      dispatch(navigateTo('WalletFab'));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.LOGIN_USER, err));
    }
  }
}


/**
 * @todo: move to loginUser
 */
async function loginUserSuccess(data) {
  analyticsEvents.sessionStart();
  return async dispatch => {
    await dispatch(getComplianceInfo());

    dispatch({
      type: ACTIONS.LOGIN_USER_SUCCESS,
      callName: API.LOGIN_USER,
      tokens: data.auth0,
      user: data.user,
    })
  }
}


/**
 * Registers a user signed up with email
 * @param {Object} user
 */
function registerUser(user) {
  analyticsEvents.startedSignup('Email');
  return async (dispatch, getState) => {
    dispatch(startApiCall(API.REGISTER_USER));
    try {
      const referralLinkId = getState().branch.referralLinkId;
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


/**
 * Gets all transfers by status
 * @param {string} transferStatus - @todo: check all statuses
 */
function registerUserSuccess(data) {

  return {
    type: ACTIONS.REGISTER_USER_SUCCESS,
    callName: API.REGISTER_USER,
    user: data.user,
  }
}




/**
 * Gets all transfers by status
 * @param {string} transferStatus - @todo: check all statuses
 */// TODO(fj) should replace update user endpoint w patch /me
function updateUser(user) {
  return async dispatch => {
    dispatch(startApiCall(API.UPDATE_USER));
    try {
      const res = await usersService.update(user);

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



/**
 * Gets all transfers by status
 * @param {string} transferStatus - @todo: check all statuses
 */
function updateUserSuccess(data) {
  return {
    type: ACTIONS.UPDATE_USER_SUCCESS,
    callName: API.UPDATE_USER,
    user: data.user,
  }
}



/**
 * Gets all transfers by status
 * @param {string} transferStatus - @todo: check all statuses
 */
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



/**
 * Gets all transfers by status
 * @param {string} transferStatus - @todo: check all statuses
 */
function sendResetLinkSuccess() {
  return {
    type: ACTIONS.SEND_RESET_LINK_SUCCESS,
    callName: API.SEND_RESET_LINK,
  }
}



/**
 * Gets all transfers by status
 * @param {string} transferStatus - @todo: check all statuses
 */
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



/**
 * Gets all transfers by status
 * @param {string} transferStatus - @todo: check all statuses
 */
function resetPasswordSuccess() {
  return {
    type: ACTIONS.RESET_PASSWORD_SUCCESS,
    callName: API.RESET_PASSWORD,
  }
}



/**
 * Gets all transfers by status
 * @param {string} transferStatus - @todo: check all statuses
 */
function logoutUser() {
  return async dispatch => {
    try {
      await deleteSecureStoreKey(SECURITY_STORAGE_AUTH_KEY);
      // await analyticsEvents.sessionEnd();
      // analyticsEvents.logoutUser();
      if (Constants.appOwnership === 'standalone') Branch.logout();
      dispatch({
        type: ACTIONS.LOGOUT_USER,
      });
      await dispatch(navigateTo('Auth'));
    } catch (err) {
      logger.log(err);
    }
  }
}


/**
 * Logs the user out from all devices
 */
function logoutFromAllDevices() {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.LOGOUT_FROM_ALL_DEVICES))
      await usersService.invalidateSession()
      dispatch({
        type: ACTIONS.LOGOUT_FROM_ALL_DEVICES_SUCCESS,
      })

      await dispatch(logoutUser())
      dispatch(showMessage('success', 'Successfully logged out from all devices.'))
    } catch (err) {
      logger.log(err);
    }
  }
}



/**
 * Gets all transfers by status
 * @param {string} transferStatus - @todo: check all statuses
 */
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



/**
 * Gets all transfers by status
 * @param {string} transferStatus - @todo: check all statuses
 */
function setPin(pinData) {
  return async dispatch => {
    dispatch(startApiCall(API.SET_PIN));
    try {
      await meService.setPin(pinData);
      dispatch(setPinSuccess());
      dispatch({ type: ACTIONS.CLEAR_FORM });
      dispatch(navigateTo('NoKyc'));
      analyticsEvents.pinSet();
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.SET_PIN, err));
    }
  }
}


/**
 * Changes PIN for user
 */
function changePin() {
  return async (dispatch, getState) => {
    try {
      const { formData } = getState().forms

      const pinData = {
        pin: formData.pin,
        new_pin: formData.newPin,
        new_pin_confirm: formData.newPinConfirm,
      }

      dispatch(toggleKeypad());
      dispatch(startApiCall(API.CHANGE_PIN));
      await meService.changePin(pinData);

      dispatch({ type: ACTIONS.CHANGE_PIN_SUCCESS });
      dispatch({ type: ACTIONS.CLEAR_FORM });
      dispatch(showMessage('success', 'Successfully changed PIN number'));
      dispatch(navigateTo('SecuritySettings'));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.CHANGE_PIN, err));
    }
  }
}



/**
 * Gets all transfers by status
 * @param {string} transferStatus - @todo: check all statuses
 */
function setPinSuccess() {
  return {
    type: ACTIONS.SET_PIN_SUCCESS,
    callName: API.SET_PIN,
  }
}


/**
 * Creates an account for user no matter the registration method
 */
function createAccount() {
  return (dispatch, getState) => {
    const { formData } = getState().forms

    if (formData.googleId) {
      dispatch(registerUserGoogle())
    }

    if (formData.facebookId) {
      dispatch(registerUserFacebook())
    }

    if (formData.twitterId) {
      dispatch(registerUserTwitter())
    }

    if (!formData.googleId && !formData.facebookId && !formData.twitterId) {
      // console.log('Should register with email')
    }
  }
}
