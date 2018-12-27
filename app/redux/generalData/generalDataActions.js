import { showMessage } from "../ui/uiActions";
import generalDataService from "../../services/general-data-service";
import kycService from "../../services/kyc-service";
import { apiError, startApiCall } from "../api/apiActions";
import API from "../../config/constants/API";
import ACTIONS from '../../config/constants/ACTIONS';

export {
  getSupportedCurrencies,
  getKYCDocTypes,
  getBackendStatus,
  getBlacklistedCountries,
}

function getSupportedCurrencies() {
  return async dispatch => {
    dispatch(startApiCall(API.GET_SUPPORTED_CURRENCIES));

    try {
      const res = await generalDataService.getSupportedCurrencies();
      const supportedCurrencies = res.data.data;
      dispatch(getSupportedCurrenciesSuccess(supportedCurrencies));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_SUPPORTED_CURRENCIES, err));
    }
  }
}

function getSupportedCurrenciesSuccess(supportedCurrencies) {
  return {
    type: ACTIONS.GET_SUPPORTED_CURRENCIES_SUCCESS,
    supportedCurrencies,
    callName: API.GET_SUPPORTED_CURRENCIES,
  }
}

function getKYCDocTypes() {
  return async dispatch => {
    dispatch(startApiCall(API.GET_KYC_DOC_TYPES));

    try {
      const res = await kycService.getKYCDocTypes();
      const kycDocTypes = res.data;
      dispatch(getKYCDocTypesSuccess(kycDocTypes));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_KYC_DOC_TYPES, err));
    }
  }
}

function getKYCDocTypesSuccess(kycDocTypes) {
  return {
    type: ACTIONS.GET_KYC_DOC_TYPES_SUCCESS,
    callName: API.GET_KYC_DOC_TYPES,
    kycDocTypes,
  }
}

function getBackendStatus() {
  return async dispatch => {
    dispatch(startApiCall(API.GET_BACKEND_STATUS));

    try {
      const res = await generalDataService.getBackendStatus();
      const backendStatus = res.data;
      dispatch(getBackendStatusSuccess(backendStatus));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_BACKEND_STATUS, err));
    }
  }
}

function getBackendStatusSuccess(backendStatus) {
  return {
    type: ACTIONS.GET_BACKEND_STATUS_SUCCESS,
    callName: API.GET_BACKEND_STATUS,
    backendStatus,
  }
}

function getBlacklistedCountries() {
  return async dispatch => {
    dispatch(startApiCall(API.GET_BLACKLISTED_COUNTRIES));

    try {
      const res = await generalDataService.getBlacklisted();
      const blacklistedCountries = res.data;
      dispatch(getBlacklistedCountriesSuccess(blacklistedCountries))
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_BLACKLISTED_COUNTRIES, err));
    }
  }
}

function getBlacklistedCountriesSuccess(blacklistedCountries) {
  return {
    type: ACTIONS.GET_BLACKLISTED_COUNTRIES_SUCCESS,
    callName: API.GET_BLACKLISTED_COUNTRIES,
    location: blacklistedCountries.location,
    residency: blacklistedCountries.residency
  }
}
