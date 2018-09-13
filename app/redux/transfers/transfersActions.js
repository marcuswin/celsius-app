import ACTIONS from '../../config/constants/ACTIONS';
import API from '../../config/constants/API';
import transferService from '../../services/transfer-service';
import { showMessage } from "../ui/uiActions";
import { apiError, startApiCall } from "../api/apiActions";

export {
  getAllTransfers,
  getTransfer,
  claimTransfer,
  createTransfer,
}

function getAllTransfers(transferStatus) {
  return async dispatch => {
    dispatch(startApiCall(API.GET_ALL_TRANSFERS));

    try {
      const res = await transferService.getAll(transferStatus);
      const transfers = res.data;
      dispatch(getAllTransfersSuccess(transfers));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_ALL_TRANSFERS, err));
    }
  }
}

function getAllTransfersSuccess(transfers) {
  return {
    type: ACTIONS.GET_ALL_TRANSFERS_SUCCESS,
    callName: API.GET_ALL_TRANSFERS,
    transfers,
  }
}

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

function getTransferSuccess(transfer) {
  return {
    type: ACTIONS.GET_TRANSFER_SUCCESS,
    callName: API.GET_TRANSFER,
    transfer,
  }
}

function claimTransfer(transferHash) {
  return async dispatch => {
    dispatch(startApiCall(API.CLAIM_TRANSFER));

    try {
      // await transferService.claim(transferHash);
      setTimeout(() => {
        dispatch(claimTransferSuccess(transferHash));
      }, 200)
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.CLAIM_TRANSFER, err));
    }
  }
}

function claimTransferSuccess(transferHash) {
  return {
    type: ACTIONS.CLAIM_TRANSFER_SUCCESS,
    callName: API.CLAIM_TRANSFER,
    transferHash,
  }
}

function createTransfer(transfer) {
  return async dispatch => {
    dispatch(startApiCall(API.CREATE_TRANSFER));

    try {
      const res = await transferService.create(transfer);
      const newTransfer = res.data;
      dispatch(createTransferSuccess(newTransfer));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.CREATE_TRANSFER, err));
    }
  }
}

function createTransferSuccess(transfer) {
  return {
    type: ACTIONS.CREATE_TRANSFER_SUCCESS,
    callName: API.CREATE_TRANSFER,
    transfer,
  }
}
