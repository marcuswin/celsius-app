import { Constants } from "expo";

import ACTIONS from '../../constants/ACTIONS';
import API from "../../constants/API";
import { apiError, startApiCall } from "../api/apiActions";
import { showMessage, toggleKeypad } from "../ui/uiActions";
import usersService from '../../services/users-service';
import { deleteSecureStoreKey, getSecureStoreKey, setSecureStoreKey } from "../../utils/expo-storage";
import TwoFactorService from "../../services/two-factor-service";
import logger from '../../utils/logger-util';
import { analyticsEvents } from "../../utils/analytics-util";
import Sentry from '../../utils/sentry-util';
import meService from "../../services/me-service";
import { updateFormField } from "../forms/formsActions";

const { SECURITY_STORAGE_AUTH_KEY } = Constants.manifest.extra;

export {
  getProfileInfo,
  initUserAppSettings,
  updateUserAppSettings,
  updateProfilePicture,
  getTwoFactorSecret,
  enableTwoFactor,
  disableTwoFactor,
  getIcoUsersProfileInfo,
  getComplianceInfo,
  checkPIN,
  checkTwoFactor,
  connectPhoneContacts,
  getConnectedContacts,
  getLinkedBankAccount,
  linkBankAccount
}


/**
 * Gets profile info for user
 */
function getProfileInfo() {
  return async (dispatch) => {
    dispatch(startApiCall(API.GET_USER_PERSONAL_INFO));

    try {
      const personalInfoRes = await usersService.getPersonalInfo();
      const personalInfo = personalInfoRes.data.profile || personalInfoRes.data;
      await analyticsEvents.initUser(personalInfo);

      Sentry.setUserContext({
        email: personalInfo.email,
        id: personalInfo.id,
      });

      dispatch(getUserPersonalInfoSuccess(personalInfo));
    } catch (err) {
      if (err.status === 422) {
        deleteSecureStoreKey(SECURITY_STORAGE_AUTH_KEY);
      }
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_USER_PERSONAL_INFO, err));
    }
  }
}


/**
 * @todo: move to getProfileInfo
 */
export function getUserPersonalInfoSuccess(personalInfo) {
  return {
    type: ACTIONS.GET_USER_PERSONAL_INFO_SUCCESS,
    callName: API.GET_USER_PERSONAL_INFO,
    personalInfo,
  }
}


/**
 * Updates users profile picture
 * @param {Object} image - image taken from camera
 */
function updateProfilePicture(image) {
  return async dispatch => {
    dispatch(startApiCall(API.UPLOAD_PLOFILE_IMAGE));
    try {
      const res = await usersService.setProfileImage(image);

      dispatch(updateProfilePictureSuccess(res.data.img_url));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.UPLOAD_PLOFILE_IMAGE, err));
    }
  }
}


/**
 * @todo: move to updateProfilePicture
 */
function updateProfilePictureSuccess(image) {
  return {
    type: ACTIONS.UPLOAD_PLOFILE_IMAGE_SUCCESS,
    callName: API.UPLOAD_PLOFILE_IMAGE,
    image,
  }
}


/**
 * gets two factor secret for user
 * @param {string} pin
 */
function getTwoFactorSecret(pin) {
  return async dispatch => {
    try {
      const secret = await TwoFactorService.beginTwoFactorActivation(pin);

      return secret;
    } catch (error) {
      dispatch(showMessage('error', error.msg));
    }
  }
}


/**
 * Enables two factor authentication for user
 * @param {string} code - eg. 111111
 */
function enableTwoFactor(code) {
  return async dispatch => {
    try {
      const success = await TwoFactorService.enableTwoFactor(code);

      if (!success) {
        dispatch(showMessage('error', "lalal"));
      }

      const personalInfoRes = await usersService.getPersonalInfo();
      const personalInfo = personalInfoRes.data.profile || personalInfoRes.data;

      await dispatch(getUserPersonalInfoSuccess(personalInfo));

      return success;
    } catch (error) {
      dispatch(showMessage('error', error.msg));
    }
  }
}


/**
 * Disables two factor for user, pin is fallback
 * @param {string} code
 */
function disableTwoFactor(code) {
  return async dispatch => {
    try {
      const success = await TwoFactorService.disableTwoFactor(code);

      const personalInfoRes = await usersService.getPersonalInfo();
      const personalInfo = personalInfoRes.data.profile || personalInfoRes.data;

      dispatch(getUserPersonalInfoSuccess(personalInfo));

      return success;
    } catch (error) {
      dispatch(showMessage('error', error.msg));
    }
  }
}



/**
 * Initializes app settings saved in Secure Storage
 */
function initUserAppSettings() {
  return async dispatch => {
    const appSettings = await getSecureStoreKey("APP_SETTINGS");
    if (appSettings) dispatch(updateUserAppSettings(JSON.parse(appSettings)));
  }
}


/**
 * Updates APP_SETTINGS in secure storage
 * @param {Object} appSettings - settings to update
 */
function updateUserAppSettings(appSettings) {
  return async (dispatch, getState) => {
    try {
      const newAppSettings = {
        ...getState().user.appSettings,
        ...appSettings,
      }

      await setSecureStoreKey('APP_SETTINGS', JSON.stringify(newAppSettings));

      dispatch({
        type: ACTIONS.UPDATE_USER_APP_SETTINGS,
        appSettings: newAppSettings,
      });
    } catch (err) {
      logger.log(err)
    }
  }
}


/**
 * Gets ICO data for user
 */
function getIcoUsersProfileInfo() {
  return async dispatch => {
    dispatch(startApiCall(API.GET_ICO_USERS_INFO));

    try {
      const res = await usersService.getIcoPersonalInfo();
      const personalInfo = res.data;
      dispatch(getIcoUsersProfileInfoSuccess(personalInfo));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_ICO_USERS_INFO, err));
    }
  }
}


/**
 * @todo: move to getIcoUsersProfileInfo
 */
function getIcoUsersProfileInfoSuccess(personalInfo) {
  return {
    type: ACTIONS.GET_ICO_USERS_INFO_SUCCESS,
    personalInfo,
    callName: API.GET_ICO_USERS_INFO,
  }
}


/**
 * Gets all relevant compliance settings for user
 */
function getComplianceInfo() {
  return async (dispatch) => {
    dispatch(startApiCall(API.GET_USER_PERSONAL_INFO));

    try {
      const complianceInfoRes = await usersService.getComplianceInfo();

      dispatch(getComplianceInfoSuccess(complianceInfoRes.data.allowed_actions));
    } catch (err) {
      if (err.status === 422) {
        deleteSecureStoreKey(SECURITY_STORAGE_AUTH_KEY);
      }
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_USER_PERSONAL_INFO, err));
    }
  }
}


/**
 * @todo: move to getComplianceInfo
 */
function getComplianceInfoSuccess(complianceInfo) {
  return {
    type: ACTIONS.GET_COMPLIANCE_INFO_SUCCESS,
    callName: API.GET_COMPLIANCE_INFO_INFO,
    complianceInfo,
  }
}


/**
 * Checks user pin code
 * @param {Function} onSuccess - what to do if pin is correct
 * @param {Function} onError - what to do if pin is wrong
 */
function checkPIN(onSuccess, onError) {
  return async (dispatch, getState) => {
    try {
      const { pin } = getState().forms.formData;

      dispatch(startApiCall(API.CHECK_PIN))

      await meService.checkPin(pin)

      dispatch({ type: ACTIONS.CHECK_PIN_SUCCESS })
      if (onSuccess) onSuccess()
    } catch (err) {
      if (onError) onError();
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.CHECK_PIN, err));
      dispatch(updateFormField('pin', ''))
      dispatch(toggleKeypad())
    }
  }
}

function checkTwoFactor(onSuccess, onError) {
  return async (dispatch, getState) => {
    try {
      const { code } = getState().forms.formData;

      dispatch(startApiCall(API.CHECK_TWO_FACTOR))

      await meService.checkTwoFactor(code)

      dispatch({ type: ACTIONS.CHECK_TWO_FACTOR_SUCCESS })
      if (onSuccess) onSuccess()
    } catch (err) {
      if (onError) onError();
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.CHECK_TWO_FACTOR, err));
      dispatch(updateFormField('code', ''))
      dispatch(toggleKeypad())
    }
  }
}


/**
 * Saves all contacts from users Phonebook
 * @param {Object[]} contacts
 */
function connectPhoneContacts(contacts) {
  return async (dispatch) => {
    dispatch(startApiCall(API.CONNECT_PHONE_CONTACTS));

    try {
      await usersService.connectPhoneContacts(contacts);
      dispatch({ type: ACTIONS.CONNECT_PHONE_CONTACTS_SUCCESS });
    } catch (err) {
      logger.log(err)
    }
  }
}


/**
 * Gets all contacts for user
 */
function getConnectedContacts() {
  return async (dispatch) => {
    dispatch(startApiCall(API.GET_CONNECT_CONTACTS));

    try {
      const res = await usersService.getConnectedContacts();
      dispatch(getConnectedContactsSuccess(res.data.contacts));
    } catch (err) {
      logger.log(err)
    }
  }
}


/**
 * @todo: move to getConnectedContacts
 */
function getConnectedContactsSuccess(contacts) {
  return {
    type: ACTIONS.GET_CONNECTED_CONTACTS_SUCCESS,
    callName: API.GET_CONNECT_CONTACTS,
    contacts,
  }
}

/**
 *
 * Get linked bank account info
 */
function getLinkedBankAccount() {
  return async (dispatch) => {
    dispatch(startApiCall(API.GET_LINKED_BANK_ACCOUNT))

    try {
      const res = await usersService.getLinkedBankAccount();
      dispatch({type: ACTIONS.GET_LINKED_BANK_ACCOUNT_SUCCESS, bankAccountInfo: res.data})
    } catch (err) {
      logger.log(err)
    }
  }
}

/**
 * Set Bank account info
 *
 * @param {Object} bankAccountInfo
 * @param {string} bankAccountInfo.bank_name
 * @param {string} bankAccountInfo.bank_routing_number
 * @param {string} bankAccountInfo.account_type
 * @param {string} bankAccountInfo.bank_account_number
 */
function linkBankAccount(bankAccountInfo) {
  return async (dispatch) => {
    dispatch(startApiCall(API.LINK_BANK_ACCOUNT))

    try {
      await usersService.linkBankAccount(bankAccountInfo)
      dispatch({type: ACTIONS.LINK_BANK_ACCOUNT_SUCCESS})
    } catch (err) {
      logger.log(err)
    }
  }
}
