import ACTIONS from '../../config/constants/ACTIONS';
import API from "../../config/constants/API";
import {navigateTo} from "./navigate";

export {
  createUserPersonalInfo,
  createUserAddressInfo,
}

// PERSONAL INFO
function createUserPersonalInfo(personalInfo) {
  return async dispatch => {
    dispatch(createUserPersonalInfoSuccess(personalInfo));
    dispatch(navigateTo('AddressInfo'));
  }
}


function createUserPersonalInfoSuccess(personalInfo) {
  return {
    type: ACTIONS.CREATE_USER_PERSONAL_INFO_SUCCESS,
    callName: API.CREATE_USER_PERSONAL_INFO,
    personalInfo
  }
}

// ADDRESS INFO
function createUserAddressInfo(addressInfo) {
  return async dispatch => {
    dispatch(createUserAddressInfoSuccess(addressInfo));
    dispatch(navigateTo('ContactInfo'));
  }
}


function createUserAddressInfoSuccess(addressInfo) {
  return {
    type: ACTIONS.CREATE_USER_ADDRESS_INFO_SUCCESS,
    callName: API.CREATE_USER_ADDRESS_INFO,
    addressInfo
  }
}
