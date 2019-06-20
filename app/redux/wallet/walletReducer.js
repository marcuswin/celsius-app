// TODO(fj): split into wallet and transactions

import ACTIONS from '../../constants/ACTIONS';

function initialState() {
  return {
    summary: undefined,
    addresses: {},
    withdrawalAddresses: {},
    transactions: {},
    activeTransactionId: undefined,
    walletBalance: null,
    total: null,
    interest: {},
    currencies: null,
    coinOrder: [],
  };
}

export default function walletReducer(state = initialState(), action) {
  switch (action.type) {
    case ACTIONS.GET_WALLET_SUMMARY_SUCCESS:
      return {
        ...state,
        summary: action.wallet,
      }
    case ACTIONS.GET_COIN_ADDRESS_SUCCESS:
      return {
        ...state,
        addresses: {
          ...state.addresses,
          ...action.address
        }
      };
    case ACTIONS.SET_COIN_WITHDRAWAL_ADDRESS_SUCCESS:
      return {
        ...state,
        withdrawalAddresses: {
          ...state.withdrawalAddresses,
          ...action.address,
        }
      };
    case ACTIONS.GET_ALL_COIN_WITHDRAWAL_ADDRESSES_SUCCESS:
      return {
        ...state,
        withdrawalAddresses: {
          ...state.withdrawalAddresses,
          ...action.allWalletAddresses,
        }
      };

    default:
      return state;
  }
}
