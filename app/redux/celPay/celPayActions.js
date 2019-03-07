import { Share } from "react-native";

// import ACTIONS from '../../constants/ACTIONS';
// import { apiError, startApiCall } from "../api/apiActions";
// import API from "../../constants/API";
import { showMessage } from "../ui/uiActions";
// import transfersService from "../../services/transfer-service";
import formatter from "../../utils/formatter";
import { navigateTo } from "../nav/navActions";

export {
  celPayFriend,
  celPayShareLink,
}

function celPayFriend() {
  return async (dispatch, getState) => {
    try {
      // get form data
      const { amountCrypto, friend, coin } = getState().forms.formData

      // const transfer = {
      //   amount: amountCrypto,
      //   coin: coin.toUpperCase(),
      //   friend_id: friend.id,
      //   message,
      // };
      // const verification = { code, pin }
      //
      // dispatch(startApiCall(API.CREATE_TRANSFER))
      // const transferRes = await transfersService.create(transfer, verification)
      // const transaction = transferRes.data
      //
      // dispatch({
      //   type: ACTIONS.CREATE_TRANSFER_SUCCESS,
      //   transfer: transaction,
      // })

      // show message
      const names = friend.name ? friend.name.split(' ') : undefined;
      let msg = `Successfully sent ${formatter.crypto(amountCrypto, coin)}`;
      if (names && names[0]) msg += ` to ${names[0]}!`;
      dispatch(showMessage('success', msg))
      dispatch(navigateTo('WalletLanding'))
      // navigate to transaction details
    } catch (err) {
      // dispatch(apiError(API.CREATE_TRANSFER, err))
      dispatch(showMessage('error', err.msg))
    }
  }
}

function celPayShareLink() {
  return async (dispatch, getState) => {
    try {
      // get form data
      const { amountCrypto, coin } = getState().forms.formData

      // const transfer = {
      //   amount: amountCrypto,
      //   coin: coin.toUpperCase(),
      //   friend_id: friend.id,
      // };
      // const verification = { code, pin }
      //
      // dispatch(startApiCall(API.CREATE_TRANSFER))
      // const transferRes = await transfersService.create(transfer, verification)
      // const transaction = transferRes.data
      //
      // dispatch({
      //   type: ACTIONS.CREATE_TRANSFER_SUCCESS,
      //   transfer: transaction,
      // })

      // create branch link or get from BE on creation
      const branchLink = 'www.celpay.io';

      const shareMsg = `Here is ${formatter.crypto(amountCrypto, coin)} :) ${branchLink}`;
      await Share.share({ message: shareMsg, title: 'Celsius CelPay' });

      const msg = `Successfully sent ${formatter.crypto(amountCrypto, coin)}!`;
      dispatch(showMessage('success', msg));
      dispatch(navigateTo('WalletLanding'));

    } catch (err) {
      // dispatch(apiError(API.CREATE_TRANSFER, err))
      dispatch(showMessage('error', err.msg))
    }
  }
}
