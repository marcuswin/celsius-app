import { Constants } from "expo";

import ACTIONS from '../../config/constants/ACTIONS';
import API from "../../config/constants/API";
import { apiError, startApiCall } from "../api/apiActions";
import * as NavActions from '../nav/navActions';
import { setFormErrors, showMessage } from "../ui/uiActions";
import usersService from '../../services/users-service';
import meService from '../../services/me-service';
import { KYC_STATUSES } from "../../config/constants/common";
import { deleteSecureStoreKey, setSecureStoreKey } from "../../utils/expo-storage";
import apiUtil from "../../utils/api-util";
import TwoFactorService from "../../services/two-factor-service";
import logger from '../../utils/logger-util';
import { analyticsEvents } from "../../utils/analytics-util";
import Sentry from '../../utils/sentry-util';

const { SECURITY_STORAGE_AUTH_KEY } = Constants.manifest.extra;

export {
  getProfileInfo,
  updateProfileInfo,
  updateProfileAddressInfo,
  updateProfileTaxpayerInfo,
  toggleTermsOfUse,
  updateProfilePicture,
  getKYCDocuments,
  createKYCDocuments,
  sendVerificationSMS,
  verifySMS,
  verifyKYCDocs,
  finishKYCVerification,
  startKYC,
  getKYCStatus,
  setPin,
  updateUserAppSettings,
  getTwoFactorSecret,
  enableTwoFactor,
  disableTwoFactor,
  getIcoUsersProfileInfo,
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

function updateProfileInfo(profileInfo) {
  return async dispatch => {
    dispatch(startApiCall(API.UPDATE_USER_PERSONAL_INFO));

    try {
      const updatedProfileData = await usersService.updateProfileInfo(profileInfo);
      analyticsEvents.profileDetailsAdded(updatedProfileData.data);
      dispatch(updateProfileInfoSuccess(updatedProfileData.data));
    } catch (err) {
      if (err.type === 'Validation error') {
        dispatch(setFormErrors(apiUtil.parseValidationErrors(err)));
      } else {
        dispatch(showMessage('error', err.msg));
      }
      dispatch(updateProfileInfoError(err.raw_error));
      dispatch(apiError(API.UPDATE_USER_PERSONAL_INFO, err));
    }
  }
}

function updateProfileAddressInfo(profileAddressInfo) {
  return async dispatch => {
    dispatch(startApiCall(API.UPDATE_USER_ADDRESS_INFO));

    try {
      const updatedProfileData = await usersService.updateProfileAddressInfo(profileAddressInfo);
      analyticsEvents.profileAddressAdded(updatedProfileData.data);
      dispatch(updateProfileAddressInfoSuccess(updatedProfileData.data));
    } catch (err) {
      if (err.type === 'Validation error') {
        dispatch(setFormErrors(apiUtil.parseValidationErrors(err)));
      } else {
        dispatch(showMessage('error', err.msg));
      }
      dispatch(updateProfileAddressInfoError(err.raw_error));
      dispatch(apiError(API.UPDATE_USER_ADDRESS_INFO, err));
    }
  }
}

function updateProfileTaxpayerInfo(profileTaxpayerInfo) {
  return async dispatch => {
    dispatch(startApiCall(API.UPDATE_USER_TAXPAYER_INFO));

    try {
      const updatedProfileData = await usersService.updateProfileTaxpayerInfo(profileTaxpayerInfo);
      analyticsEvents.profileTaxpayerInfoAdded(updatedProfileData.data);
      dispatch(updateProfileTaxpayerInfoSuccess(updatedProfileData.data));
    } catch (err) {
      if (err.type === 'Validation error') {
        dispatch(setFormErrors(apiUtil.parseValidationErrors(err)));
      } else {
        dispatch(showMessage('error', err.msg));
      }
      dispatch(updateProfileTaxpayerInfoError(err.raw_error));
      dispatch(apiError(API.UPDATE_USER_TAXPAYER_INFO, err));
    }
  }
}

export function updateProfileInfoSuccess(personalInfo) {
  return {
    type: ACTIONS.UPDATE_USER_PERSONAL_INFO_SUCCESS,
    callName: API.UPDATE_USER_PERSONAL_INFO,
    personalInfo,
  }
}

function updateProfileInfoError(err) {
  return {
    type: ACTIONS.UPDATE_USER_PERSONAL_INFO_ERROR,
    error: err,
  }
}

function updateProfileAddressInfoSuccess(addressInfo) {
  return {
    type: ACTIONS.UPDATE_USER_ADDRESS_INFO_SUCCESS,
    callName: API.UPDATE_USER_ADDRESS_INFO,
    addressInfo,
  }
}

function updateProfileAddressInfoError(err) {
  return {
    type: ACTIONS.UPDATE_USER_ADDRESS_INFO_ERROR,
    error: err,
  }
}
function updateProfileTaxpayerInfoSuccess(taxpayerInfo) {
  return {
    type: ACTIONS.UPDATE_USER_TAXPAYER_INFO_SUCCESS,
    callName: API.UPDATE_USER_TAXPAYER_INFO,
    taxpayerInfo,
  }
}

function updateProfileTaxpayerInfoError(err) {
  return {
    type: ACTIONS.UPDATE_USER_TAXPAYER_INFO_ERROR,
    error: err,
  }
}

export function getUserPersonalInfoSuccess(personalInfo) {
  return {
    type: ACTIONS.GET_USER_PERSONAL_INFO_SUCCESS,
    callName: API.GET_USER_PERSONAL_INFO,
    personalInfo,
  }
}

function toggleTermsOfUse() {
  return {
    type: ACTIONS.TOGGLE_TERMS_OF_USE,
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

function getKYCDocuments(documents) {
  return async dispatch => {
    dispatch(startApiCall(API.GET_KYC_DOCUMENTS));
    try {
      const res = await meService.getKYCDocuments(documents);
      dispatch(getKYCDocumentsSuccess(res.data));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_KYC_DOCUMENTS, err));
    }
  }
}

function getKYCDocumentsSuccess(documents) {
  return {
    type: ACTIONS.GET_KYC_DOCUMENTS_SUCCESS,
    callName: API.GET_KYC_DOCUMENTS,
    documents,
  }
}

function createKYCDocuments(documents) {
  return async dispatch => {
    dispatch(startApiCall(API.CREATE_KYC_DOCUMENTS));
    try {
      await meService.createKYCDocuments(documents);
      dispatch(createKYCDocumentsSuccess());
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.CREATE_KYC_DOCUMENTS, err));
    }
  }
}

function createKYCDocumentsSuccess() {
  return {
    type: ACTIONS.CREATE_KYC_DOCUMENTS_SUCCESS,
    callName: API.CREATE_KYC_DOCUMENTS,
  }
}

function sendVerificationSMS() {
  return async dispatch => {
    dispatch(startApiCall(API.SEND_VERIFICATION_SMS));
    try {
      await meService.sendVerificationSMS();
      dispatch(sendVerificationSMSSuccess());
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.SEND_VERIFICATION_SMS, err));
    }
  }
}

function sendVerificationSMSSuccess() {
  return {
    type: ACTIONS.SEND_VERIFICATION_SMS_SUCCESS,
    callName: API.SEND_VERIFICATION_SMS,
  }
}

function verifySMS(verificationCode) {
  return async dispatch => {
    dispatch(startApiCall(API.VERIFY_SMS));
    try {
      await meService.verifySMS(verificationCode);
      dispatch(verifySMSSuccess());
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.VERIFY_SMS, err));
    }
  }
}

export function verifySMSSuccess() {
  return {
    type: ACTIONS.VERIFY_SMS_SUCCESS,
    callName: API.VERIFY_SMS,
  }
}

function verifyKYCDocs() {
  return async (dispatch, getState) => {
    const { formData } = getState().ui;
    const { user } = getState().users;
    let callName;
    let res;

    try {
      callName = API.CREATE_KYC_DOCUMENTS;
      dispatch(startApiCall(API.CREATE_KYC_DOCUMENTS));
      res = await meService.createKYCDocuments({
        front: formData.front,
        back: formData.documentType !== 'passport' ? formData.back : undefined,
        type: formData.documentType,
      });
      dispatch(createKYCDocumentsSuccess(res.data));
      analyticsEvents.documentsAdded();

      if (user.cellphone !== formData.cellphone || !user.cellphone_verified) {
        callName = API.UPDATE_USER_PERSONAL_INFO;
        dispatch(startApiCall(API.UPDATE_USER_PERSONAL_INFO));
        res = await usersService.updateProfileInfo({
          cellphone: formData.cellphone
        });
        dispatch(updateProfileInfoSuccess(res.data));

        callName = API.SEND_VERIFICATION_SMS;
        dispatch(startApiCall(API.SEND_VERIFICATION_SMS));
        await meService.sendVerificationSMS();
        dispatch(sendVerificationSMSSuccess());

        dispatch(NavActions.navigateTo('VerifyPhoneNumber'));
        dispatch(showMessage('success', 'SMS sent!'));
      } else {
        callName = API.START_KYC;
        dispatch(startApiCall(API.START_KYC));
        await meService.startKYC();
        dispatch(startKYCSuccess());

        dispatch(NavActions.navigateTo('NoKyc'));
        dispatch(showMessage('success', 'KYC verification proccess has started!'));
        analyticsEvents.KYCStarted();
      }
    } catch (err) {
      logger.log({ err });
      if (err.type === 'Validation error') {
        dispatch(setFormErrors(apiUtil.parseValidationErrors(err)));
      } else {
        dispatch(showMessage('error', err.msg));
      }
      dispatch(apiError(callName, err));
    }
  }
}

function finishKYCVerification() {
  return async (dispatch, getState) => {
    const { formData } = getState().ui;
    let callName;

    try {
      callName = API.VERIFY_SMS;
      dispatch(startApiCall(API.VERIFY_SMS));
      await meService.verifySMS(formData.verificationCode);
      dispatch(verifySMSSuccess());
      analyticsEvents.phoneVerified();

      callName = API.START_KYC;
      dispatch(startApiCall(API.START_KYC));
      await meService.startKYC();
      dispatch(startKYCSuccess());
      analyticsEvents.KYCStarted();

      dispatch(NavActions.navigateTo('NoKyc', true));
      dispatch(showMessage('success', 'KYC verification proccess has started!'));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(callName, err));
    }
  }
}

function startKYC() {
  return async dispatch => {
    dispatch(startApiCall(API.START_KYC));
    try {
      await meService.startKYC();
      dispatch(startKYCSuccess());
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.START_KYC, err));
    }
  }
}

function startKYCSuccess() {
  return {
    type: ACTIONS.START_KYC_SUCCESS,
    kyc: {
      status: KYC_STATUSES.pending
    },
  }
}

function getKYCStatus() {
  return async dispatch => {
    dispatch(startApiCall(API.GET_KYC_STATUS));
    try {
      const res = await meService.getKYCStatus();
      dispatch(getKYCStatusSuccess(res.data));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_KYC_STATUS, err));
    }
  }
}

function getKYCStatusSuccess(status) {
  return {
    type: ACTIONS.GET_KYC_STATUS_SUCCESS,
    kyc: status,
  }
}

function setPin(pinData) {
  return async dispatch => {
    dispatch(startApiCall(API.SET_PIN));
    try {
      await meService.setPin(pinData);
      dispatch(setPinSuccess());
      dispatch({ type: ACTIONS.CLEAR_FORM });
      dispatch(NavActions.navigateTo('NoKyc'));
      analyticsEvents.pinSet();
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.SET_PIN, err));
    }
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

function setPinSuccess() {
  return {
    type: ACTIONS.SET_PIN_SUCCESS,
    callName: API.SET_PIN,
  }
}

function updateUserAppSettings(appSettings) {
  return async (dispatch, getState) => {
    try {
      const newAppSettings = {
        ...getState().users.appSettings,
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
