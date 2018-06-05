import ACTIONS from '../../config/constants/ACTIONS';
import API from "../../config/constants/API";
import {apiError, startApiCall} from "../api/apiActions";
import {showMessage} from "../ui/uiActions";
import usersService from '../../services/users-service';

export {
  getProfileInfo,
  updateProfileInfo,
  toggleTermsOfUse,
  updateProfilePicture,
  createKYCDocuments,
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
      dispatch(showMessage('success', 'Profile updated'));
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
