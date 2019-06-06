import ACTIONS from '../../constants/ACTIONS';
import API from "../../constants/API";
import {apiError, startApiCall} from "../api/apiActions";
import {showMessage} from "../ui/uiActions";
import {clearForm} from "../forms/formsActions";
import walletService from '../../services/wallet-service';
import { updateMixpanelBalances } from '../../services/mixpanel';
import { navigateTo } from "../nav/navActions";
import addressUtil from "../../utils/address-util"

export {
  // new v3
  getWalletSummary,
  getAllCoinWithdrawalAddresses,
  setCoinWithdrawalAddress,

  // keep, maybe refactor
  getCoinAddress,
  getCoinWithdrawalAddress,

  // remove
  getWalletDetails,
  getCoinTransactions,
  storePin, // check use, and move somewhere else...
}



/**
 * Gets wallet summary for user
 */
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


/**
 * @deprecated: replaced with getWalletSummary
 */
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


/**
 * @deprecated
 */
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


/**
 * Gets Deposit address for coin
 * @param {string} coin - btc|eth|xrp
 */
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


/**
 * @todo: move to getCoinAddress
 */
function getCoinAddressSuccess(address) {
  return {
    type: ACTIONS.GET_COIN_ADDRESS_SUCCESS,
    callName: API.GET_COIN_ADDRESS,
    address,
  }
}


/**
 * Gets users withdrawal address for coin
 * @param {string} coin - @todo: check if BTC or btc
 */
function getCoinWithdrawalAddress(coin) {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.GET_COIN_ORIGINATING_ADDRESS));

      const res = await walletService.getCoinOriginatingAddress(coin)
      dispatch(getCoinOriginatingAddressSuccess({
        [coin]: {
          address: res.data.address,
          locked: res.data.locked,
        },
      }));
    } catch(err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_COIN_ORIGINATING_ADDRESS, err));
    }
  }
}

/**
 * Sets withdrawal address for user for coin
 *
 * @param {string} flow - one of withdrawal|change-address
 */
function setCoinWithdrawalAddress(flow = "withdrawal") {
  return async (dispatch, getState) => {
    try {
      const { formData } = getState().forms;
      const { coin, coinTag, withdrawAddress } = formData;

      const address = addressUtil.joinAddressTag(coin, withdrawAddress, coinTag)

      const verification = {
        pin: formData.pin,
        twoFactorCode: formData.code,
      }

      dispatch(startApiCall(API.SET_COIN_WITHDRAWAL_ADDRESS));
      const response = await walletService.setCoinWithdrawalAddress(coin, address, verification);

      dispatch(setCoinWithdrawalAddressSuccess(coin, response.data));

      const nextScreen = flow === "change-address" ? "WithdrawAddressOverview" : "WithdrawConfirm"
      dispatch(navigateTo(nextScreen))

      if (flow === "change-address") {
        dispatch(showMessage('success', `Open your email to confirm the change of your ${ formData.coin } withdrawal address. Note that withdrawals for ${ formData.coin } will be locked for the next 24h due to our security protocols.`))
        dispatch(clearForm())
      }
    } catch (error) {
      dispatch(showMessage('error', error.msg));
      dispatch(apiError(API.SET_COIN_WITHDRAWAL_ADDRESS, error));
    }
  }
}

/**
 *  Gets all withdrawal addresses previously set by user
 */

function getAllCoinWithdrawalAddresses() {
  return async (dispatch) => {
    try {
      dispatch(startApiCall(API.GET_ALL_COIN_WITHDRAWAL_ADDRESSES));
      const response = await walletService.getAllCoinWithdrawalAddresses()
      dispatch(getAllCoinWithdrawalAddressesSuccess(response.data))

    } catch (error) {
      dispatch(showMessage(`error`, error.msg));
      dispatch(apiError(API.GET_ALL_COIN_WITHDRAWAL_ADDRESSES, error))
    }
  }
}

function getAllCoinWithdrawalAddressesSuccess(allWalletAddresses) {
  return {
    type: ACTIONS.GET_ALL_COIN_WITHDRAWAL_ADDRESSES_SUCCESS,
    allWalletAddresses
  }
}

/**
 * @todo: move to setCoinWithdrawalAddress
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


/**
 * Checks user pin code
 * @param {Function} onSuccess - what to do if pin is correct
 */
function getCoinOriginatingAddressSuccess(address) {
  return {
    type: ACTIONS.GET_COIN_ORIGINATING_ADDRESS_SUCCESS,
    callName: API.GET_COIN_ORIGINATING_ADDRESS,
    address,
  }
}


/**
 * @deprecated
 */
function storePin(pin) {
  return dispatch => dispatch({type: ACTIONS.STORE_PIN, pin});
}


/**
 * @deprecated: getTransactions has a filter instead
 */
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


/**
 * @deprecated
 */
function getCoinTransactionsSuccess(transactions) {
  return {
    type: ACTIONS.GET_COIN_TRANSACTIONS_SUCCESS,
    callName: API.GET_COIN_TRANSACTIONS,
    transactions,
  }
}
