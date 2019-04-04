import API from '../../constants/API';
import { startApiCall, apiError } from '../api/apiActions';
import usersService from '../../services/users-service';
import { showMessage } from "../ui/uiActions";
import ACTIONS from '../../constants/ACTIONS'

export {
  getLoyaltyInfo
}

function getLoyaltyInfo() {
  return async(dispatch) => {
    try {
      dispatch(startApiCall(API.GET_LOYALTY_INFO));
      const res = await usersService.getLoyaltyInfo();
      const loyaltyInfo = res.data;
      dispatch(getLoyaltyInfoSuccess(loyaltyInfo))
    } catch (err) {
      dispatch(showMessage(`error`, err.msg))
      dispatch(apiError(API.GET_LOYALTY_INFO, err))
    }
  }
}

function getLoyaltyInfoSuccess(loyaltyInfo) {
  return {
    type: ACTIONS.GET_LOYALTY_INFO_SUCCESS,
    callName:API.GET_LOYALTY_INFO,
    loyaltyInfo
  }
}
