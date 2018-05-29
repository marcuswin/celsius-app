import { showMessage } from "../ui/uiActions";
import generalDataService from "../../services/general-data-service";
import { apiError, startApiCall } from "../api/apiActions";
import API from "../../config/constants/API";
import ACTIONS from '../../config/constants/ACTIONS';

export {
  getSupportedCurrencies,
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
