import ACTIONS from '../../config/constants/ACTIONS';
import API from '../../config/constants/API';
import interestService from '../../services/interest-service';
import { showMessage } from "../ui/uiActions";
import { apiError, startApiCall } from "../api/apiActions";

export {
  getInterestRates,
}

function getInterestRates() {
  return async dispatch => {
    dispatch(startApiCall(API.GET_INTEREST_RATES));

    try {
      const res = await interestService.getInterestRates();
      const interestRates = res.data;
      dispatch(getInterestRatesSuccess(interestRates));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_INTEREST_RATES, err));
    }
  }
}

function getInterestRatesSuccess(interestRates) {
  return {
    type: ACTIONS.GET_INTEREST_RATES_SUCCESS,
    callName: API.GET_INTEREST_RATES,
    interestRates,
  }
}
