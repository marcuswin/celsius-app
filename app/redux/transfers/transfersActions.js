import { Share } from "react-native";

import ACTIONS from '../../config/constants/ACTIONS';
import API from '../../config/constants/API';
import transferService from '../../services/transfer-service';
import { navigateTo } from "../nav/navActions";
import { showMessage, openModal } from "../ui/uiActions";
import { apiError, startApiCall } from "../api/apiActions";
import { BRANCH_LINKS, MODALS, TRANSFER_STATUSES } from "../../config/constants/common";
import { createBUO } from "../branch/branchActions";

export {
  getAllTransfers,
  getTransfer,
  claimTransfer,
  createTransfer,
  createBranchTransfer,
  registerTransferLink,
  claimAllBranchTransfers,
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
    let apiCall = API.CREATE_TRANSFER;
    dispatch(startApiCall(apiCall));
    const res = await transferService.create({
      amount: amount.toFixed(5),
      coin: coin.toUpperCase()
    });
    const transfer = res.data;
    dispatch(createTransferSuccess(transfer));

    const { user } = getState().users;
    const userName = `${user.first_name} ${user.last_name}`;

    apiCall = API.CREATE_BRANCH_LINK;
    dispatch(startApiCall(apiCall));
    const branchLink = await createBUO(
      `transfer:${transfer.hash}`,
      {
        locallyIndex: true,
        title: `You received ${amount.toFixed(5)} ${coin.toUpperCase()}`,
        contentImageUrl: 'https://image.ibb.co/kFkHnK/Celsius_Device_Mock_link.jpg',
        contentDescription: 'Click on the link to get your money!',
        contentMetadata: {
          customMetadata: {
            amount: transfer.amount,
            coin: transfer.coin,
            from_name: userName,
            from_profile_picture: user.profile_picture,
            transfer_hash: transfer.hash,
            link_type: BRANCH_LINKS.TRANSFER,
          }
        }
      },
      user.email
    );
    dispatch({
      type: ACTIONS.CREATE_BRANCH_LINK_SUCCESS,
      branchLink: {
        ...branchLink,
        linkType: BRANCH_LINKS.TRANSFER
      }
    });

    Share.share({ message: `Click on the link to claim your crypto ${ branchLink.url }` });
    dispatch(navigateTo('Home'));
  }
}

function registerTransferLink(deepLink) {
  return async (dispatch, getState) => {
    try {
      const { userActions } = getState().ui;
      const { user } = getState().users;

      if (user) {
        dispatch(startApiCall(API.GET_TRANSFER));
        const res = await transferService.get(deepLink.transfer_hash);
        const transfer = res.data;

        if (!transfer.claimed_at) {
          dispatch(getTransferSuccess(transfer));

          dispatch(claimTransfer(transfer.hash));
          if (userActions.enteredInitialPin) {
            dispatch(openModal(MODALS.TRANSFER_RECEIVED));
          }
        } else {
          dispatch(getTransferSuccess());
          dispatch(showMessage('warning', 'Link has already been claimed!'));
        }
      } else {
        dispatch(getTransferSuccess({
          hash: deepLink.transfer_hash,
          amount: deepLink.amount,
          coin: deepLink.coin,
          from: {
            name: deepLink.from_name,
            profile_picture: deepLink.profile_picture,
          },
        }));
        dispatch(openModal(MODALS.TRANSFER_RECEIVED));
      }
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_TRANSFER, err));
    }
  }
}

function claimAllBranchTransfers() {
  return (dispatch, getState) => {
    const { branchHashes } = getState().transfers;
    branchHashes.forEach(bh => dispatch(claimTransfer(bh)));
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
