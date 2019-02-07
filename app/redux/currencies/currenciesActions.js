import ACTIONS from "../../constants/ACTIONS";
import API from "../../constants/API";
import { apiError, startApiCall } from "../api/apiActions";
import { showMessage } from "../ui/uiActions";
import currencies from "../../services/currencies-service";

export function getCurrencyRates() {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.GET_CURRENCY_RATES))
      const ratesRes = await currencies.getRates()

      dispatch({
        type: ACTIONS.GET_CURRENCY_RATES_SUCCESS,
        rates: ratesRes.data,
      })
    } catch(err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_CURRENCY_RATES, err));
    }
  }
}

export function getCurrencyGraphs() {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.GET_CURRENCY_GRAPHS))
      const graphsRes = await currencies.getGraphs()

      dispatch({
        type: ACTIONS.GET_CURRENCY_GRAPHS_SUCCESS,
        graphs: graphsRes.data,
      })
    } catch(err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_CURRENCY_GRAPHS, err));
    }
  }
}
