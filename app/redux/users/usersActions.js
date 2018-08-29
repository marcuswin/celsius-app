import ACTIONS from '../../config/constants/ACTIONS';
import API from "../../config/constants/API";
import {apiError, startApiCall} from "../api/apiActions";
import * as NavActions from '../nav/navActions';
import { setFormErrors, showMessage } from "../ui/uiActions";
import usersService from '../../services/users-service';
import meService from '../../services/me-service';
import { KYC_STATUSES } from "../../config/constants/common";
import { setSecureStoreKey } from "../../utils/expo-storage";
import apiUtil from "../../utils/api-util";
import { initMixpanelUser, mixpanelEvents } from "../../services/mixpanel";

export {
  getProfileInfo,
  updateProfileInfo,
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
}

function getProfileInfo() {
  return async dispatch => {
    dispatch(startApiCall(API.GET_USER_PERSONAL_INFO));

    try {
      const personalInfoRes = await usersService.getPersonalInfo();
      await initMixpanelUser(personalInfoRes.data.profile || personalInfoRes.data);
      dispatch(getUserPersonalInfoSuccess(personalInfoRes.data.profile || personalInfoRes.data));
    } catch(err) {
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
      dispatch(updateProfileInfoSuccess(updatedProfileData.data));
      mixpanelEvents.profileDetailsAdded();
    } catch(err) {
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

function updateProfileInfoSuccess(personalInfo) {
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

function getUserPersonalInfoSuccess(personalInfo) {
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

function verifySMSSuccess() {
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
      mixpanelEvents.documentsAdded();

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
        mixpanelEvents.KYCStarted();
      }
    } catch(err) {
      console.log({ err });
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
      mixpanelEvents.phoneVerified();

      callName = API.START_KYC;
      dispatch(startApiCall(API.START_KYC));
      await meService.startKYC();
      dispatch(startKYCSuccess());
      mixpanelEvents.KYCStarted();

      dispatch(NavActions.navigateTo('NoKyc'));
      dispatch(showMessage('success', 'KYC verification proccess has started!'));
    } catch(err) {
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
    } catch(err) {
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
    } catch(err) {
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
      dispatch({type: ACTIONS.CLEAR_FORM});
      dispatch(NavActions.navigateTo('NoKyc'));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.SET_PIN, err));
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
    } catch(err) {
      console.log(err)
    }
  }
}

