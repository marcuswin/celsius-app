import ACTIONS from "../../config/constants/ACTIONS";
import { BRANCH_LINKS } from "../../config/constants/common";

function initialState() {
  return {
    branchHashes: [],
    transfers: {},
  };
}

export default function transfersReducer(state = initialState(), action) {
  const transfers = {};

  switch (action.type) {
    case ACTIONS.BRANCH_LINK_REGISTERED:
      if (action.link.link_type === BRANCH_LINKS.TRANSFER_RECEIVED) {
        return {
          ...state,
          branchHashes: [...state.branchHashes, action.link.transfer_hash]
        };
      }
      break;

    case ACTIONS.GET_ALL_TRANSFERS_SUCCESS:
      action.transfers.forEach(t => { transfers[t.hash] = t });
      return {
        ...state,
        transfers: {
          ...state.transfers,
          ...transfers,
        }
      };

    case ACTIONS.GET_TRANSFER_SUCCESS:
      return {
        ...state,
        transfers: {
          ...state.transfers,
          [action.transfer.hash]: action.transfer,
        }
      };

    case ACTIONS.CLAIM_TRANSFER_SUCCESS:
      return {
        ...state,
        transfers: {
          ...state.transfers,
          [action.transfer.hash]: action.transfer,
        }
      };

    case ACTIONS.CREATE_TRANSFER_SUCCESS:
      return { ...state };

    default:
      return { ...state };
  }
}
