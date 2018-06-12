import ACTIONS from '../../config/constants/ACTIONS';

function initialState() {
    return {
      balance: {
        totalUsd: 0,
        eth: 0,
        ethUsd: 0,
        btc: 0,
        btcUsd: 0,
      },
      addresses: {
        ethAddress: undefined,
        btcAddress: undefined,
      },
      transactions: {},
      activeTransactionId: undefined
    };
}

export default function walletReducer($$state = initialState(), action) {
    const newTransactions = {};

    switch (action.type) {
      case ACTIONS.GET_COIN_ADDRESS_SUCCESS:
          return {
            ...$$state,
            addresses: {
              ...$$state.addresses,
              ...action.address
            }
          };

      case ACTIONS.GET_TRANSACTION_DETAILS_SUCCESS:
      case ACTIONS.WITHDRAW_CRYPTO_SUCCESS:
          return {
            ...$$state,
            transactions: {
              ...$$state.transactions,
              [action.transaction.transaction_id]: action.transaction,
            },
            activeTransactionId: action.transaction.transaction_id,
          };

      case ACTIONS.GET_ALL_TRANSACTIONS_SUCCESS:
      case ACTIONS.GET_COIN_TRANSACTIONS_SUCCESS:
          action.transactions.forEach(t => { newTransactions[t.id] = t });
          return {
            ...$$state,
            transactions: {
              ...$$state.transactions,
              ...newTransactions,
            },
          };

      case ACTIONS.GET_WALLET_DETAILS_SUCCESS:
        return {
          ...$$state,
          balance: {
            totalUsd: action.walletBalance.balance,
            eth: action.walletBalance.eth.amount,
            ethUsd: action.walletBalance.eth.amount_usd,
            btc: action.walletBalance.btc.amount,
            btcUsd: action.walletBalance.btc.amount_usd,
          }
        }

      case ACTIONS.GET_COIN_BALANCE_SUCCESS:
        return {
          ...$$state,
          balance: {
            ...$$state.balance,
            eth: action.coinBalance.eth_balance !== undefined ? action.coinBalance.eth_balance : $$state.balance.eth,
            ethUsd: action.coinBalance.eth_balance_usd !== undefined ? action.coinBalance.eth_balance_usd : $$state.balance.ethUsd,
            btc: action.coinBalance.btc_balance !== undefined ? action.coinBalance.btc_balance : $$state.balance.btc,
            btcUsd: action.coinBalance.btc_balance_usd !== undefined ? action.coinBalance.btc_balance_usd : $$state.balance.btcUsd,
          }
        }

    default:
        return { ...$$state };
    }
}
