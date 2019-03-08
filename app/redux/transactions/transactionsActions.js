import ACTIONS from "../../constants/ACTIONS";
import API from "../../constants/API";
import { apiError, startApiCall } from "../api/apiActions";
import { showMessage } from "../ui/uiActions";
import transactions from "../../services/transactions-service";
import walletService from "../../services/wallet-service";
import { navigateTo } from "../nav/navActions";
import { analyticsEvents } from "../../utils/analytics-util";
import { getWalletSummary } from "../wallet/walletActions";

export {
  getAllTransactions,
  getTransactionDetails,
  withdrawCrypto,
}


/**
 * Gets transactions
 * @param {Object} query
 * @param {number} query.limit
 * @param {string} query.type - one of received|withdraw|interest
 * @param {string} query.coin - eg. BTC|ETH|XRP...
 */
function getAllTransactions(query = {}) {
  return async dispatch => {
    try {
      const { limit, type, coin } = query;
      dispatch(startApiCall(API.GET_ALL_TRANSACTIONS))
      const response = await transactions.getAll({ limit, type, coin })

      dispatch({
        type: ACTIONS.GET_ALL_TRANSACTIONS_SUCCESS,
        transactions: response.data,
      })
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_ALL_TRANSACTIONS, err));
    }
  }
}


/**
 * Gets single transaction by id
 * @param {string} id
 */
function getTransactionDetails(id = "") {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.GET_TRANSACTION_DETAILS));

      const res = await transactions.getTransaction(id);
      dispatch(getTransactionDetailsSuccess(res.data.transaction));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_TRANSACTION_DETAILS, err));
    }
  }
}

/**
 * Gets single transaction by id
 * @todo: move to getTransactionDetails
 */
function getTransactionDetailsSuccess(transaction) {
  return {
    type: ACTIONS.GET_TRANSACTION_DETAILS_SUCCESS,
    callName: API.GET_TRANSACTION_DETAILS,
    transaction,
  }
}

/**
 * Withdraws crypto for the user
 */
function withdrawCrypto() {
  return async (dispatch, getState) => {
    try {
      const { formData } = getState().forms
      const { coin, amountCrypto, pin, code } = formData
      dispatch(startApiCall(API.WITHDRAW_CRYPTO));

      const res = await walletService.withdrawCrypto(coin, amountCrypto, { pin, twoFactorCode: code });
      dispatch(getWalletSummary());
      dispatch(withdrawCryptoSuccess(res.data.transaction));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.WITHDRAW_CRYPTO, err));
    }
  }
}

/**
 * @todo: move to withdrawCrypto
 */
function withdrawCryptoSuccess(transaction) {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.WITHDRAW_CRYPTO_SUCCESS,
      callName: API.WITHDRAW_CRYPTO,
      transaction,
    });

    dispatch(navigateTo('TransactionDetails', { id: transaction.id }))

    analyticsEvents.confirmWithdraw({
      id: transaction.id,
      amount: transaction.amount,
      coin: transaction.coin
    });
  }
}
