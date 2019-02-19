// TODO(fj): export actions as object
// TODO(fj): split into wallet and transactions

import ACTIONS from '../../constants/ACTIONS';
import API from "../../constants/API";
import {apiError, startApiCall} from "../api/apiActions";
import {showMessage} from "../ui/uiActions";
import walletService from '../../services/wallet-service';
import { updateMixpanelBalances } from '../../services/mixpanel';
import { analyticsEvents } from "../../utils/analytics-util";
import { navigateTo } from "../nav/navActions";

export {
  // new v3
  getWalletSummary,

  // keep, maybe refactor
  getCoinAddress,
  getCoinWithdrawalAddress,
  setCoinWithdrawalAddress,
  withdrawCrypto,
  setCoinWithdrawalAddressAndWithdrawCrypto,

  // remove
  getWalletDetails,
  getCoinTransactions,
  getTransactionDetails, // move to transactions
  storePin, // check use, and move somewhere else...
}


function getWalletSummary() {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.GET_WALLET_SUMMARY));
      const res = await walletService.getWalletSummary()

      dispatch({
        type: ACTIONS.GET_WALLET_SUMMARY_SUCCESS,
        wallet: res.data,
      })
    } catch(err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_WALLET_SUMMARY, err));
    }
  }
}

function getWalletDetails() {
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

function getCoinAddress(coin) {
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

function getCoinWithdrawalAddress(coin) {
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
function setCoinWithdrawalAddress(coin, address) {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.SET_COIN_WITHDRAWAL_ADDRESS));

      const response = await walletService.setCoinWithdrawalAddress(coin, address);
      dispatch(setCoinWithdrawalAddressSuccess(coin, {
          address: response.data.address,
          manually_set: response.data.manually_set,
      }));

      dispatch(navigateTo('VerifyProfile', {
        onSuccess: () => navigateTo('WithdrawConfirm')
      }))
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
function setCoinWithdrawalAddressAndWithdrawCrypto(coin, address, amount, verification) {
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

function withdrawCrypto() {
  return async (dispatch, getState) => {
    try {
      const { formData } = getState().forms
      const { coin, amountCrypto, pin, code } = formData
      dispatch(startApiCall(API.WITHDRAW_CRYPTO));

      const res = await walletService.withdrawCrypto(coin, amountCrypto, pin || code);
      dispatch(withdrawCryptoSuccess(res.data.transaction));
      dispatch(getWalletSummary());
    } catch(err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.WITHDRAW_CRYPTO, err));
    }
  }
}

function withdrawCryptoSuccess(transaction) {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.WITHDRAW_CRYPTO_SUCCESS,
      callName: API.WITHDRAW_CRYPTO,
      transaction,
    });

    dispatch(navigateTo('TransactionsDetails', { id: transaction.id }))

    analyticsEvents.confirmWithdraw({
      id: transaction.id,
      amount: transaction.amount,
      coin: transaction.coin
    });
  }
}

function storePin(pin) {
  return dispatch => dispatch({type: ACTIONS.STORE_PIN, pin});
}

function getTransactionDetails(transactionId) {
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

function getCoinTransactions(coin) {
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
