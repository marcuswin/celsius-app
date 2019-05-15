import { showMessage } from "../ui/uiActions";
import generalDataService from "../../services/general-data-service";
import kycService from "../../services/kyc-service";
import { apiError, startApiCall } from "../api/apiActions";
import API from "../../constants/API";
import ACTIONS from '../../constants/ACTIONS';

export {
  getKYCDocTypes,
  getBackendStatus,
  getInitialCelsiusData,

  // remove
  getSupportedCurrencies,
  getBlacklistedCountries,
}

/**
 * Gets all general app data (interest rates, borrow ltvs, ...)
 * @todo: add more data
 */
function getInitialCelsiusData() {
  return async (dispatch, getState) => {
    dispatch(startApiCall(API.GET_INITIAL_CELSIUS_DATA));

    const email = getState().user.profile.email;
    const allowed = !!email.includes("@celsius.network") || !!email.includes("@mvpworkshop.co");

    try {
      const res = await generalDataService.getCelsiusInitialData();
      const minimumLoanAmount = allowed ? 5 : res.data.minimum_usd_amount
      dispatch({
        type: ACTIONS.GET_INITIAL_CELSIUS_DATA_SUCCESS,
        interestRates: res.data.interest_rates,
        ltvs: res.data.borrow_ltvs,
        minimumLoanAmount
      });
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_INITIAL_CELSIUS_DATA, err));
    }
  }
}

/**
 * Gets all supported currencies and their graph data
 * @deprecated
 */
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

/**
 * @deprecated
 */
function getSupportedCurrenciesSuccess(supportedCurrencies) {
  return {
    type: ACTIONS.GET_SUPPORTED_CURRENCIES_SUCCESS,
    supportedCurrencies,
    callName: API.GET_SUPPORTED_CURRENCIES,
  }
}

/**
 * Gets all doc types for KYC
 */
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


/**
 * @todo: move to getKYCDocTypes
 */
function getKYCDocTypesSuccess(kycDocTypes) {
  return {
    type: ACTIONS.GET_KYC_DOC_TYPES_SUCCESS,
    callName: API.GET_KYC_DOC_TYPES,
    kycDocTypes,
  }
}

/**
 * Gets backend status of the app
 */
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


/**
 * @todo: move to getBackendStatus
 */
function getBackendStatusSuccess(backendStatus) {
  return {
    type: ACTIONS.GET_BACKEND_STATUS_SUCCESS,
    callName: API.GET_BACKEND_STATUS,
    backendStatus,
  }
}

/**
 * @deprecated
 */
function getBlacklistedCountries() {
  return async dispatch => {
    dispatch(startApiCall(API.GET_BLACKLISTED_COUNTRIES));

    try {
      const res = await generalDataService.getBlacklisted();
      const blacklistedCountries = res.data;

      const blacklistedCountryLocation = blacklistedCountries.location.filter(c => c.country !== "United States" ).map(value => value.country);
      const blacklistedCountryResidency = blacklistedCountries.residency.filter(c => c.country !== "United States" ).map(value => value.country);
      const blacklistedStatesLocation = blacklistedCountries.location.filter(c => c.country === "United States").map(value => value.state);
      const blacklistedStatesResidency = blacklistedCountries.residency.filter(c => c.country === "United States").map(value => value.state);

      dispatch(getBlacklistedCountriesSuccess(blacklistedCountryLocation,blacklistedCountryResidency, blacklistedStatesLocation, blacklistedStatesResidency))
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_BLACKLISTED_COUNTRIES, err));
    }
  }
}

/**
 * @deprecated
 */
function getBlacklistedCountriesSuccess(blacklistedCountryLocation,blacklistedCountryResidency, blacklistedStatesLocation, blacklistedStatesResidency) {
  return {
    type: ACTIONS.GET_BLACKLISTED_COUNTRIES_SUCCESS,
    callName: API.GET_BLACKLISTED_COUNTRIES,
    blacklistedCountryLocation,
    blacklistedCountryResidency,
    blacklistedStatesLocation,
    blacklistedStatesResidency
  }
}
