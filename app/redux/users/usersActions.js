import ACTIONS from '../../config/constants/ACTIONS';
import API from "../../config/constants/API";
import {apiError, startApiCall} from "../api/apiActions";
import * as NavActions from '../nav/navActions';
import {showMessage} from "../ui/uiActions";
import usersService from '../../services/users-service';
import meService from '../../services/me-service';

export {
  getProfileInfo,
  updateProfileInfo,
  toggleTermsOfUse,
  updateProfilePicture,
  createKYCDocuments,
  sendVerificationSMS,
  verifySMS,
  verifyKYCDocs,
  finishKYCVerification,
}

function getProfileInfo() {
  return async dispatch => {
    dispatch(startApiCall(API.GET_USER_PERSONAL_INFO));

    try {
      const personalInfoRes = await usersService.getPersonalInfo();
      dispatch(getUserPersonalInfoSuccess(personalInfoRes.data.profile));
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
    } catch(err) {
      dispatch(showMessage('error', err.msg));
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

function createKYCDocuments(documents) {
  return async dispatch => {
    dispatch(startApiCall(API.CREATE_KYC_DOCUMENTS));
    try {
      await usersService.createKYCDocuments(documents);

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

    await dispatch(updateProfileInfo({
      cellphone: formData.cellphone,
    }));
    // await dispatch(createKYCDocuments({
    //   front: formData.front,
    //   back: formData.back,
    //   document_type: formData.documentType,
    // }));
    await dispatch(sendVerificationSMS());
    dispatch(NavActions.navigateTo('VerifyPhoneNumber'));
    dispatch(showMessage('info', 'SMS sent!'));
  }
}

function finishKYCVerification() {
  return async (dispatch, getState) => {
    const { formData } = getState().ui;

    await dispatch(verifySMS(formData.verificationCode));

    // await dispatch(startKYC());
    dispatch({
      type: ACTIONS.GET_KYC_STATUS_SUCCESS,
      status: 'pending',
    });
    dispatch(NavActions.navigateTo('NoKyc'));
    dispatch(showMessage('success', 'KYC verification proccess has started!'));
  }
}
