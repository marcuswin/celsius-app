import ACTIONS from '../../config/constants/ACTIONS';
import API from "../../config/constants/API";
import {apiError, startApiCall} from "../api/apiActions";
import {showMessage} from "../ui/uiActions";
import walletService from '../../services/wallet-service';
import { updateMixpanelBalances } from '../../services/mixpanel';


export function getWalletDetails() {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.GET_WALLET_DETAILS));

      const res = await walletService.getWalletDetails()
      dispatch(getWalletDetailsSuccess(res.data));
    } catch(err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_WALLET_DETAILS, err));
    }
  }
}

function getWalletDetailsSuccess(wallet) {
  const mixpanelBalances = {};
  wallet.data.forEach(c => {
    mixpanelBalances[`Balance ${c.currency.short}`] = c.amount;
  });
  updateMixpanelBalances(mixpanelBalances);
  return {
    type: ACTIONS.GET_WALLET_DETAILS_SUCCESS,
    callName: API.GET_WALLET_DETAILS,
    wallet,
  }
}

export function getCoinAddress(coin) {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.GET_COIN_ADDRESS));

      const res = await walletService.getCoinAddress(coin)
      dispatch(getCoinAddressSuccess({
        [`${coin}Address`]: res.data.wallet.address,
        [`${coin}AlternateAddress`]: res.data.wallet.address_alt,
      }));
    } catch(err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_COIN_ADDRESS, err));
    }
  }
}

function getCoinAddressSuccess(address) {
  return {
    type: ACTIONS.GET_COIN_ADDRESS_SUCCESS,
    callName: API.GET_COIN_ADDRESS,
    address,
  }
}

export function getCoinWithdrawalAddress(coin) {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.GET_COIN_ORIGINATING_ADDRESS));

      const res = await walletService.getCoinOriginatingAddress(coin)
      dispatch(getCoinOriginatingAddressSuccess({
        [coin]: {
          address: res.data.address,
          manually_set: res.data.manually_set,
        },
      }));
    } catch(err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_COIN_ORIGINATING_ADDRESS, err));
    }
  }
}

/**
 * @param {string} coin
 * @param {string} address
 */
export function setCoinWithdrawalAddress(coin, address) {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.SET_COIN_WITHDRAWAL_ADDRESS));

      const response = await walletService.setCoinWithdrawalAddress(coin, address);
      dispatch(setCoinWithdrawalAddressSuccess(coin, {
          address: response.data.address,
          manually_set: response.data.manually_set,
      }));
    } catch (error) {
      dispatch(showMessage('error', error.msg));
      dispatch(apiError(API.SET_COIN_WITHDRAWAL_ADDRESS, error));
    }
  }
}

/**
 * @param {string} coin
 * @param {string} address
 * @param {number} amount
 * @param {Object} verification
 */
export function setCoinWithdrawalAddressAndWithdrawCrypto(coin, address, amount, verification) {
  let currentApiCall;

  return async dispatch => {
    try {
      currentApiCall = API.SET_COIN_WITHDRAWAL_ADDRESS;
      dispatch(startApiCall(currentApiCall));

      const response = await walletService.setCoinWithdrawalAddress(coin, address);

      dispatch(setCoinWithdrawalAddressSuccess(coin, {
        address: response.data.address,
        manually_set: response.data.manually_set,
      }));

      currentApiCall = API.WITHDRAW_CRYPTO;
      dispatch(startApiCall(currentApiCall));

      const res = await walletService.withdrawCrypto(coin, amount, verification);
      dispatch(withdrawCryptoSuccess(res.data.transaction));
      dispatch(getWalletDetails());
    } catch (error) {
      dispatch(showMessage('error', error.msg));
      dispatch(apiError(currentApiCall, error));
    }
  }
}

/**
 * @param {string} coin
 * @param {WithdrawalAddress} address
 * @returns {{type: string, callName: string, address: *}}
 */
function setCoinWithdrawalAddressSuccess(coin, address) {
  return {
    type: ACTIONS.SET_COIN_WITHDRAWAL_ADDRESS_SUCCESS,
    callName: API.SET_COIN_WITHDRAWAL_ADDRESS,
    address: {
      [coin]: address
    },
  }
}

function getCoinOriginatingAddressSuccess(address) {
  return {
    type: ACTIONS.GET_COIN_ORIGINATING_ADDRESS_SUCCESS,
    callName: API.GET_COIN_ORIGINATING_ADDRESS,
    address,
  }
}

export function withdrawCrypto(coin, amount, verification) {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.WITHDRAW_CRYPTO));

      const res = await walletService.withdrawCrypto(coin, amount, verification);
      dispatch(withdrawCryptoSuccess(res.data.transaction));
      dispatch(getWalletDetails());
    } catch(err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.WITHDRAW_CRYPTO, err));
    }
  }
}

function withdrawCryptoSuccess(transaction) {
  return {
    type: ACTIONS.WITHDRAW_CRYPTO_SUCCESS,
    callName: API.WITHDRAW_CRYPTO,
    transaction,
  }
}

export function storePin(pin) {
  return dispatch => dispatch({type: ACTIONS.STORE_PIN, pin});
}

export function getTransactionDetails(transactionId) {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.GET_TRANSACTION_DETAILS));

      const res = await walletService.getTransaction(transactionId);
      dispatch(getTransactionDetailsSuccess(res.data.transaction));
    } catch(err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_TRANSACTION_DETAILS, err));
    }
  }
}

function getTransactionDetailsSuccess(transaction) {
  return {
    type: ACTIONS.GET_TRANSACTION_DETAILS_SUCCESS,
    callName: API.GET_TRANSACTION_DETAILS,
    transaction,
  }
}

export function getCoinTransactions(coin) {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.GET_COIN_TRANSACTIONS));

      const res = await walletService.getCoinTransactions(coin);
      dispatch(getCoinTransactionsSuccess(res.data.transactions));
    } catch(err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_COIN_TRANSACTIONS, err));
    }
  }
}

function getCoinTransactionsSuccess(transactions) {
  return {
    type: ACTIONS.GET_COIN_TRANSACTIONS_SUCCESS,
    callName: API.GET_COIN_TRANSACTIONS,
    transactions,
  }
}

export function getAllTransactions() {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.GET_ALL_TRANSACTIONS));

      const res = await walletService.getAllTransactions();
      dispatch(getAllTransactionsSuccess(res.data.transactions));
    } catch(err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_ALL_TRANSACTIONS, err));
    }
  }
}

function getAllTransactionsSuccess(transactions) {
  return {
    type: ACTIONS.GET_ALL_TRANSACTIONS_SUCCESS,
    callName: API.GET_ALL_TRANSACTIONS,
    transactions,
  }
}
