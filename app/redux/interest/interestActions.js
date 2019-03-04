import ACTIONS from '../../constants/ACTIONS';
import API from '../../constants/API';
import interestService from '../../services/interest-service';
import { showMessage } from "../ui/uiActions";
import { apiError, startApiCall } from "../api/apiActions";

export {
  getInterestRates,
  getInterestChartData
}


/**
 * Gets interest rates for all coins
 * @deprecated: logic moved to getInitialCelsiusData
 */
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

/**
 * Gets interest rates for all coins
 * @deprecated: logic moved to getInitialCelsiusData
 */
function getInterestRatesSuccess(interestRates) {
  return {
    type: ACTIONS.GET_INTEREST_RATES_SUCCESS,
    callName: API.GET_INTEREST_RATES,
    interestRates,
  }
}


/**
 * Gets graph data for interest
 * @todo: wire with new graph endpoints
 */
function getInterestChartData(interval) {
  return async dispatch => {
    dispatch(startApiCall(API.GET_INTEREST_CHART_DATA));
    try {
      const res = await interestService.getInterestChartData(interval);
      const chartData = res.data;
      dispatch(getInterestChartDataSuccess(chartData));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_INTEREST_CHART_DATA, err));
    }
  }
}

/**
 * @todo: move to getInterestChartData
 */
function getInterestChartDataSuccess(chartData) {
  return {
    type: ACTIONS.GET_INTEREST_CHART_DATA_SUCCESS,
    callName: API.GET_INTEREST_CHART_DATA,
    chartData,
  }
}
