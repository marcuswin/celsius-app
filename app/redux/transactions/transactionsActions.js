import ACTIONS from "../../constants/ACTIONS";
import API from "../../constants/API";
import { apiError, startApiCall } from "../api/apiActions";
import { showMessage } from "../ui/uiActions";
import transactions from "../../services/transactions-service";

export function getAllTransactions({ limit, type, coin }) {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.GET_ALL_TRANSACTIONS))
      const response = await transactions.getAll({ limit, type, coin })

      dispatch({
        type: ACTIONS.GET_ALL_TRANSACTIONS_SUCCESS,
        transactions: response.data,
      })
    } catch(err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_ALL_TRANSACTIONS, err));
    }
  }
}
