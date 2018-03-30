import ACTIONS from '../../config/constants/ACTIONS';
import API from "../../config/constants/API";
import {apiError, startApiCall} from "./api";
import {showMessage} from "./ui";
import usersService from '../../services/users-service';

export {
  getUserPersonalInfo,
  createUserPersonalInfo,
  getUserAddressInfo,
  createUserAddressInfo,
  getUserContactInfo,
  createUserContactInfo,
  // getUserBankInfo,
  createUserBankInfo,
}

// PERSONAL INFO
function createUserPersonalInfo(personalInfo) {
  return async dispatch => {
    dispatch(startApiCall(API.CREATE_USER_PERSONAL_INFO));

    try {
      const newPersonalInfo = await usersService.createPersonalInfo(personalInfo);
      dispatch(createUserPersonalInfoSuccess(newPersonalInfo.data.profile));
    } catch(err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.CREATE_USER_PERSONAL_INFO, err));
    }
  }
}


function createUserPersonalInfoSuccess(personalInfo) {
  return {
    type: ACTIONS.CREATE_USER_PERSONAL_INFO_SUCCESS,
    callName: API.CREATE_USER_PERSONAL_INFO,
    personalInfo
  }
}

function getUserPersonalInfo() {
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


function getUserPersonalInfoSuccess(personalInfo) {
  return {
    type: ACTIONS.GET_USER_PERSONAL_INFO_SUCCESS,
    callName: API.GET_USER_PERSONAL_INFO,
    personalInfo
  }
}

// ADDRESS INFO
function createUserAddressInfo(addressInfo) {
  return async dispatch => {
    dispatch(startApiCall(API.CREATE_USER_ADDRESS_INFO));

    try {
      const newAddressInfo = await usersService.createAddressInfo(addressInfo);
      dispatch(createUserAddressInfoSuccess(newAddressInfo.data.address));
    } catch(err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.CREATE_USER_ADDRESS_INFO, err));
    }
  }
}


function createUserAddressInfoSuccess(addressInfo) {
  return {
    type: ACTIONS.CREATE_USER_ADDRESS_INFO_SUCCESS,
    callName: API.CREATE_USER_ADDRESS_INFO,
    addressInfo
  }
}

function getUserAddressInfo() {
  return async dispatch => {
    dispatch(startApiCall(API.GET_USER_ADDRESS_INFO));

    try {
      const addressInfoRes = await usersService.getAddressInfo();
      dispatch(getUserAddressInfoSuccess(addressInfoRes.data.address));
    } catch(err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_USER_ADDRESS_INFO, err));
    }
  }
}


function getUserAddressInfoSuccess(addressInfo) {
  return {
    type: ACTIONS.GET_USER_ADDRESS_INFO_SUCCESS,
    callName: API.GET_USER_ADDRESS_INFO,
    addressInfo
  }
}

// CONTACT INFO
function createUserContactInfo(contactInfo) {
  return async dispatch => {
    dispatch(startApiCall(API.CREATE_USER_CONTACT_INFO));

    try {
      const newContactInfo = await usersService.createContactInfo(contactInfo);
      dispatch(createUserContactInfoSuccess(newContactInfo.data.contact));
    } catch(err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.CREATE_USER_CONTACT_INFO, err));
    }
  }
}


function createUserContactInfoSuccess(contactInfo) {
  return {
    type: ACTIONS.CREATE_USER_CONTACT_INFO_SUCCESS,
    callName: API.CREATE_USER_CONTACT_INFO,
    contactInfo
  }
}

function getUserContactInfo() {
  return async dispatch => {
    dispatch(startApiCall(API.GET_USER_CONTACT_INFO));

    try {
      const contactInfoRes = await usersService.getContactInfo();
      dispatch(getUserContactInfoSuccess(contactInfoRes.data.contact));
    } catch(err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_USER_CONTACT_INFO, err));
    }
  }
}


function getUserContactInfoSuccess(contactInfo) {
  return {
    type: ACTIONS.GET_USER_CONTACT_INFO_SUCCESS,
    callName: API.GET_USER_CONTACT_INFO,
    contactInfo
  }
}

// CONTACT INFO
function createUserBankInfo(bankAccountInfo) {
  return async dispatch => {
    dispatch(startApiCall(API.CREATE_USER_BANK_INFO));

    try {
      const newBankInfo = await usersService.createBankAccountInfo(bankAccountInfo);
      dispatch(createUserBankInfoSuccess(newBankInfo.data.bank));
    } catch(err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.CREATE_USER_BANK_INFO, err));
    }
  }
}


function createUserBankInfoSuccess(bankInfo) {
  return {
    type: ACTIONS.CREATE_USER_BANK_INFO_SUCCESS,
    callName: API.CREATE_USER_BANK_INFO,
    bankInfo
  }
}
