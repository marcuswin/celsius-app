import { Constants } from "expo";

import ACTIONS from '../../constants/ACTIONS';
import API from "../../constants/API";
import { apiError, startApiCall } from "../api/apiActions";
import { showMessage } from "../ui/uiActions";
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
}

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

export function getUserPersonalInfoSuccess(personalInfo) {
  return {
    type: ACTIONS.GET_USER_PERSONAL_INFO_SUCCESS,
    callName: API.GET_USER_PERSONAL_INFO,
    personalInfo,
  }
}

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

function updateProfilePictureSuccess(image) {
  return {
    type: ACTIONS.UPLOAD_PLOFILE_IMAGE_SUCCESS,
    callName: API.UPLOAD_PLOFILE_IMAGE,
    image,
  }
}

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

function enableTwoFactor(code) {
  return async dispatch => {
    try {
      const success = await TwoFactorService.enableTwoFactor(code);

      if (!success) {
        dispatch(showMessage('error', "lalal"));
      }

      const personalInfoRes = await usersService.getPersonalInfo();
      const personalInfo = personalInfoRes.data.profile || personalInfoRes.data;

      dispatch(getUserPersonalInfoSuccess(personalInfo));

      return success;
    } catch (error) {
      dispatch(showMessage('error', error.msg));
    }
  }
}

function disableTwoFactor(pin) {
  return async dispatch => {
    try {
      const success = await TwoFactorService.disableTwoFactor(pin);

      const personalInfoRes = await usersService.getPersonalInfo();
      const personalInfo = personalInfoRes.data.profile || personalInfoRes.data;

      dispatch(getUserPersonalInfoSuccess(personalInfo));

      return success;
    } catch (error) {
      dispatch(showMessage('error', error.msg));
    }
  }
}

// Gets User App Settings from Secure Store
function initUserAppSettings() {
  return async dispatch => {
    const appSettings = await getSecureStoreKey("APP_SETTINGS");
    if (appSettings) dispatch(updateUserAppSettings(JSON.parse(appSettings)));
  }
}

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

function getIcoUsersProfileInfoSuccess(personalInfo) {
  return {
    type: ACTIONS.GET_ICO_USERS_INFO_SUCCESS,
    personalInfo,
    callName: API.GET_ICO_USERS_INFO,
  }
}

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

function getComplianceInfoSuccess(complianceInfo) {
  return {
    type: ACTIONS.GET_COMPLIANCE_INFO_SUCCESS,
    callName: API.GET_COMPLIANCE_INFO_INFO,
    complianceInfo,
  }
}

function checkPIN(onSuccess) {
  return async (dispatch, getState) => {
    try {
      const { pin } = getState().forms.formData;
      dispatch(startApiCall(API.CHECK_PIN))

      await meService.checkPin(pin)

      dispatch({ type: ACTIONS.CHECK_PIN_SUCCESS })
      dispatch(updateFormField('profileVerified', true))
      if (onSuccess) onSuccess()
    } catch(err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.CHECK_PIN, err));
    }
  }
}
