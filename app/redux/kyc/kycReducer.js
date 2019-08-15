import ACTIONS from '../../constants/ACTIONS';
import { KYC_STATUSES } from "../../constants/DATA";

const initialState = {
  status: KYC_STATUSES.collecting,
}

export default function kycReducer(state = initialState, action) {

    switch (action.type) {
      case ACTIONS.START_KYC_SUCCESS:
      case ACTIONS.GET_KYC_STATUS_SUCCESS:
        return {
          ...state,
          status: action.kyc.status,
        }

    default:
        return { ...state };
    }
}
