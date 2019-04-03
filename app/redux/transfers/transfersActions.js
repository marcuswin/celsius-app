import { Share } from "react-native";

import ACTIONS from '../../constants/ACTIONS';
import API from '../../constants/API';
import transferService from '../../services/transfer-service';
import { navigateTo, navigateBack } from "../nav/navActions";
import { showMessage, openModal } from "../ui/uiActions";
import { apiError, startApiCall } from "../api/apiActions";
import { BRANCH_LINKS, TRANSFER_STATUSES } from "../../constants/DATA";
import { getAllTransactions } from "../transactions/transactionsActions";
import { createCelPayBUO } from "../../utils/branch-util";
import { MODALS } from '../../constants/UI'

export {
  getAllTransfers,
  getTransfer,
  claimTransfer,
  cancelTransfer,
  createTransfer,
  createBranchTransfer,
  registerTransferLink,
  claimAllBranchTransfers
}


/**
 * Gets all transfers by status
 * @param {string} transferStatus - @todo: check all statuses
 */
function getAllTransfers(transferStatus) {
  return async dispatch => {
    dispatch(startApiCall(API.GET_ALL_TRANSFERS));

    try {
      const res = await transferService.getAll(transferStatus);
      const transfers = res.data;
      dispatch(getAllTransfersSuccess(transfers.map(mapTransfer)));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_ALL_TRANSFERS, err));
    }
  }
}


/**
 * @todo: move to getAllTransfers
 */
function getAllTransfersSuccess(transfers) {
  return {
    type: ACTIONS.GET_ALL_TRANSFERS_SUCCESS,
    callName: API.GET_ALL_TRANSFERS,
    transfers,
  }
}


/**
 * Gets single transfer by hash
 * @param {string} transferHash
 */
function getTransfer(transferHash) {
  return async dispatch => {
    dispatch(startApiCall(API.GET_TRANSFER));

    try {
      const res = await transferService.get(transferHash);
      const transfer = res.data;
      dispatch(getTransferSuccess(transfer));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_TRANSFER, err));
    }
  }
}


/**
 * @todo: move to getTransfer
 */
function getTransferSuccess(transfer) {
  return {
    type: ACTIONS.GET_TRANSFER_SUCCESS,
    callName: API.GET_TRANSFER,
    transfer: mapTransfer(transfer),
  }
}


/**
 * Gets all transfers by status
 * @param {string} transferStatus - @todo: check all statuses
 */
function claimTransfer(transferHash) {
  return async dispatch => {
    dispatch(startApiCall(API.CLAIM_TRANSFER));

    try {
      const res = await transferService.claim(transferHash);
      dispatch(claimTransferSuccess(res.data));
      dispatch(showMessage('success', "Transaction claimed"));
      dispatch(getAllTransactions())
      dispatch(navigateBack());
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.CLAIM_TRANSFER, err));
    }
  }
}


/**
 * @todo: move to claimTransfer
 */
function claimTransferSuccess(transfer) {
  return {
    type: ACTIONS.CLAIM_TRANSFER_SUCCESS,
    callName: API.CLAIM_TRANSFER,
    transfer: mapTransfer(transfer),
  }
}


/**
 * Cancels a pending transfer
 * @param {string} transferHash
 */
function cancelTransfer(transferHash) {
  return async dispatch => {
    dispatch(startApiCall(API.cancel_TRANSFER));

    try {
      const res = await transferService.cancel(transferHash);
      dispatch(cancelTransferSuccess(res.data));
      dispatch(showMessage('success', "Transaction canceled"));
      dispatch(getAllTransactions())
      dispatch(navigateBack());
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.CANCEL_TRANSFER, err));
    }
  }
}


/**
 * @todo: move to cancelTransfer
 */
function cancelTransferSuccess(transfer) {
  return {
    type: ACTIONS.CANCEL_TRANSFER_SUCCESS,
    callName: API.CANCEL_TRANSFER,
    transfer: mapTransfer(transfer),
  }
}


/**
 * Creates a transfer
 * @param {number|string} amount - 0.123456789|"0.123456789"
 * @param {string} coin - ETH|eth
 */
function createTransfer(amount, coin) {
  return async dispatch => {
    dispatch(startApiCall(API.CREATE_TRANSFER));

    try {
      const res = await transferService.create({
        amount: Number(amount).toFixed(5),
        coin: coin.toUpperCase()
      });
      dispatch(createTransferSuccess(res.data));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.CREATE_TRANSFER, err));
    }
  }
}


/**
 * @todo: move to createTransfer
 */
function createTransferSuccess(transfer) {
  return {
    type: ACTIONS.CREATE_TRANSFER_SUCCESS,
    callName: API.CREATE_TRANSFER,
    transfer,
  }
}


/**
 * Creates a transfer and a branch link and shares
 * @deprecated: moved to celPayLink
 */
function createBranchTransfer(amount, amountUsd, coin, verification) {
  return async (dispatch, getState ) => {
    let apiCall = API.CREATE_TRANSFER;
    dispatch(startApiCall(apiCall));
    const res = await transferService.create({
      amount: Number(amount).toFixed(5),
      coin: coin.toUpperCase(),
    }, verification);

    const transfer = res.data;
    dispatch(createTransferSuccess(transfer));

    const currencyAmount = getState().generalData.currencyRatesShort[transfer.coin.toLowerCase()];
    const usdAmount = currencyAmount * amount;

    const { profile } = getState().user;

    apiCall = API.CREATE_BRANCH_LINK;
    dispatch(startApiCall(apiCall));
    const branchLink = await createCelPayBUO(transfer)
    dispatch({
      type: ACTIONS.CREATE_BRANCH_LINK_SUCCESS,
      callName: API.CREATE_BRANCH_LINK,
      branchLink: {
        ...branchLink,
        linkType: BRANCH_LINKS.TRANSFER
      }
    });

    Share.share({ message: `${profile.first_name} has sent you $${usdAmount.toFixed(2)} in ${transfer.coin}! Click here to claim it in the Celsius Wallet. ${branchLink.url}` });
    dispatch(navigateTo('Home'));
    // TODO(fj): analytics
  }
}


/**
 * Triggered when transfer branch link is registered
 * @param {Object} deepLink - received deep link from branch
 */
function registerTransferLink(deepLink) {
  return async (dispatch, getState) => {
    let callName;

    try {
      // const { userActions } = getState().ui;
      const { profile } = getState().user;

      if (!profile) {
        dispatch(showMessage('warring', 'In order to user a CelPay link you must be logged in'))
        return;
      }

      callName = API.GET_TRANSFER;
      dispatch(startApiCall(API.GET_TRANSFER));
      let res = await transferService.get(deepLink.hash);
      const transfer = res.data;

      if (transfer.claimed_at) {
        dispatch(showMessage('warning', 'This CelPay Link has already been claimed!'));
        dispatch(getTransferSuccess());
        return;
      }
      dispatch(getTransferSuccess(transfer));

      if (profile.kyc_status !== "passed") {
        // TODO: handle CelPay links for not verified users
      }

      callName = API.CLAIM_TRANSFER;
      res = await transferService.claim(transfer.hash);
      dispatch(claimTransferSuccess(res.data));

      dispatch(openModal(MODALS.CELPAY_RECEIVED_MODAL));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(callName, err));
    }
  }
}


/**
 * Claims all pending transfers for newly registered user
 */
function claimAllBranchTransfers() {
  return (dispatch, getState) => {
    const { branchHashes } = getState().transfers;
    if (branchHashes && branchHashes.length) branchHashes.forEach(bh => dispatch(claimTransfer(bh)));
  }
}


/**
 * Maps all transfer props
 * @param {Object} transfer
 * @todo: move to reducer
 */

function mapTransfer(transfer) {
  if (!transfer) return;

  let status = TRANSFER_STATUSES.pending;
  if (transfer.claimed_at && !transfer.cleared_at) {
    status = TRANSFER_STATUSES.claimed;
  }
  if (transfer.cleared_at) {
    status = TRANSFER_STATUSES.cleared;
  }
  if (transfer.expired_at) {
    status = TRANSFER_STATUSES.expired;
  }

  return {
    ...transfer,
    status
  }
}
