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
      if (action.link.link_type === BRANCH_LINKS.TRANSFER) {
        return {
          ...state,
          branchHashes: [...state.branchHashes, action.link.transfer_hash],
          transfers: {
            ...state.transfers,
            [action.link.transfer_hash]: {
              amount: action.link.amount,
              coin: action.link.coin,
              from: {
                name: action.link.from_name,
                profile_picture: action.link.from_profile_picture,
              }
            }
          }
        };
      }
      return state;

    case ACTIONS.GET_ALL_TRANSFERS_SUCCESS:
      action.transfers.forEach(t => {
        if (t.hash) transfers[t.hash] = t;
      });
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
    case ACTIONS.CREATE_TRANSFER_SUCCESS:
      return {
        ...state,
        transfers: {
          ...state.transfers,
          [action.transfer.hash]: action.transfer,
        }
      };

      // return {
      //   ...state,
      //   transfers: {
      //     ...state.transfers,
      //     [action.transfer.hash]: action.transfer,
      //   }
      // };

    default:
      return { ...state };
  }
}
