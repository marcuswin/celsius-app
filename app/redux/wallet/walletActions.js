import ACTIONS from '../../config/constants/ACTIONS';
import API from "../../config/constants/API";
import {apiError, startApiCall} from "../api/apiActions";
import {showMessage} from "../ui/uiActions";
import walletService from '../../services/wallet-service';

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
  return {
    type: ACTIONS.GET_WALLET_DETAILS_SUCCESS,
    callName: API.GET_WALLET_DETAILS,
    wallet,
  }
}

export function getCoinBalance(coin) {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.GET_COIN_BALANCE));

      const res = await walletService.getCoinBalance(coin);
      dispatch(getCoinBalanceSuccess(res.data));
    } catch(err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_COIN_BALANCE, err));
    }
  }
}

function getCoinBalanceSuccess(coinBalance) {
  return {
    type: ACTIONS.GET_COIN_BALANCE_SUCCESS,
    callName: API.GET_COIN_BALANCE,
    coinBalance,
  }
}

export function getCoinAddress(coin) {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.GET_COIN_ADDRESS));

      const res = await walletService.getCoinAddress(coin)
      dispatch(getCoinAddressSuccess({ [`${coin}Address`]: res.data.wallet.address }));
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

export function withdrawCrypto(coin, amount) {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.WITHDRAW_CRYPTO));

      const res = await walletService.withdrawCrypto(coin, amount);
      dispatch(withdrawCryptoSuccess(res.data.transaction));
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
