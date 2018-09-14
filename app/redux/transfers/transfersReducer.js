import ACTIONS from "../../config/constants/ACTIONS";
import { BRANCH_LINKS } from "../../config/constants/common";

function initialState() {
  return {
    branchHashes: [
      '23740906ce9b9d6784ab28392763bdbc396b5bb8526745d37092538cddb1cb2abc007bea72a07b57c3f5c7daf3c77c152521e113f4c3ed551d4a5105a6d40c59',
      'f2ef2b23d10281ba5ba84a76c6fb48fd8fbc2d0ddd0cf5ccc331935876f0787a7dbda425681abe9d1a0a31726d349adc77f7c2ac06a44ba3413f46fadb2df721',
    ],
    transfers: {},
  };
}

export default function transfersReducer(state = initialState(), action) {
  const transfers = {};
  let branchHashes = [];

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
      branchHashes = [ ...state.branchHashes ];
      branchHashes.splice(state.branchHashes.indexOf(action.transferHash), 1);
      return {
        ...state,
        branchHashes,
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
