import ACTIONS from '../../config/constants/ACTIONS';

function initialState() {
    return {
      addresses: {
        ethAddress: undefined,
        btcAddress: undefined,
        ethOriginatingAddress: undefined,
        btcOriginatingAddress: undefined,
      },
      transactions: {},
      activeTransactionId: undefined,
      walletBalance: null,
      total: null,
      currencies: null,
    };
}

export default function walletReducer(state = initialState(), action) {
    const newTransactions = {};

    switch (action.type) {
      case ACTIONS.GET_COIN_ADDRESS_SUCCESS:
      case ACTIONS.GET_COIN_ORIGINATING_ADDRESS_SUCCESS:
          return {
            ...state,
            addresses: {
              ...state.addresses,
              ...action.address
            }
          };

      case ACTIONS.GET_TRANSACTION_DETAILS_SUCCESS:
      case ACTIONS.WITHDRAW_CRYPTO_SUCCESS:
          return {
            ...state,
            transactions: {
              ...state.transactions,
              [action.transaction.transaction_id]: action.transaction,
            },
            activeTransactionId: action.transaction.transaction_id,
          };

      case ACTIONS.GET_ALL_TRANSACTIONS_SUCCESS:
      case ACTIONS.GET_COIN_TRANSACTIONS_SUCCESS:
          action.transactions.forEach(t => { newTransactions[t.id] = t });
          return {
            ...state,
            transactions: {
              ...state.transactions,
              ...newTransactions,
            },
          };

      case ACTIONS.GET_COIN_BALANCE_SUCCESS:
        return {
          ...state,
          ...action.walletBalance
        }

      case ACTIONS.GET_WALLET_DETAILS_SUCCESS:
        return {
          ...state,
          total: action.wallet.meta,
          currencies: action.wallet.data,
        }

      case ACTIONS.STORE_PIN:
        return {
          ...state,
          pin: action.pin,
        }

    default:
      return state;
    }
}
