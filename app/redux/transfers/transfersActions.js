import { Share } from "react-native";

import ACTIONS from '../../config/constants/ACTIONS';
import API from '../../config/constants/API';
import transferService from '../../services/transfer-service';
import { navigateTo } from "../nav/navActions";
import { showMessage } from "../ui/uiActions";
import { apiError, startApiCall } from "../api/apiActions";
import { BRANCH_LINKS, TRANSFER_STATUSES } from "../../config/constants/common";
import { createBranchLink } from "../branch/branchActions";

export {
  getAllTransfers,
  getTransfer,
  claimTransfer,
  createTransfer,
  createBranchTransfer,
}

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
    transfer: mapTransfer(transfer),
  }
}

function claimTransfer(transferHash) {
  return async dispatch => {
    dispatch(startApiCall(API.CLAIM_TRANSFER));

    try {
      const res = await transferService.claim(transferHash);
      dispatch(claimTransferSuccess(res.data));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.CLAIM_TRANSFER, err));
    }
  }
}

function claimTransferSuccess(transfer) {
  return {
    type: ACTIONS.CLAIM_TRANSFER_SUCCESS,
    callName: API.CLAIM_TRANSFER,
    transfer: mapTransfer(transfer),
  }
}

function createTransfer(amount, coin) {
  return async dispatch => {
    dispatch(startApiCall(API.CREATE_TRANSFER));

    try {
      const res = await transferService.create({
        amount: amount.toFixed(5),
        coin: coin.toUpperCase()
      });
      dispatch(createTransferSuccess(res.data));
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

function createBranchTransfer(amount, coin) {
  return async (dispatch, getState ) => {
    dispatch(createTransfer(amount, coin))

    // get newest transfer
    const allTransferIds = Object.keys(getState().transfers.transfers);
    const transfers = allTransferIds.map(tid => getState().transfers.transfers[tid]);
    let newestTransfer = transfers[0];
    transfers.forEach(t => {
      if (newestTransfer.created_at < t.created_at) {
        newestTransfer = t;
      }
    })

    const { user } = getState().users;
    const userName = `${user.first_name} ${user.last_name}`;
    dispatch(createBranchLink(
      BRANCH_LINKS.TRANSFER,
      `transfer:${newestTransfer.hash}`,
      {
        locallyIndex: true,
        title: 'You Got Money!',
        contentImageUrl: 'https://image.ibb.co/jWfnh9/referall_image.png',
        contentDescription: 'Click on link to get money!',
        contentMetadata: {
          customMetadata: {
            amount: newestTransfer.amount,
            coin: newestTransfer.coin,
            from_name: userName,
            from_profile_picture: user.profile_picture,
            transfer_hash: newestTransfer.hash,
            link_type: BRANCH_LINKS.TRANSFER,
          }
        }
      }
    ))

    const { createdLinks } = getState().branch;
    const url = createdLinks[createdLinks.length - 1].url;

    Share.share({ message: `Hello, your money is waiting Sir! ${ url }`, title: 'Money!!!' });
    dispatch(navigateTo('Home'));
  }
}

function mapTransfer(transfer) {
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
