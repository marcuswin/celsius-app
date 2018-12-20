import BigNumber from 'bignumber.js';

import ACTIONS from '../../config/constants/ACTIONS';
import { TRANSACTION_TYPES } from "../../config/constants/common";

function initialState() {
  return {
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
  const newTransactions = {};
  let currencies;

  switch (action.type) {
    case ACTIONS.GET_COIN_ADDRESS_SUCCESS:
      return {
        ...state,
        addresses: {
          ...state.addresses,
          ...action.address
        }
      };
    case ACTIONS.GET_COIN_ORIGINATING_ADDRESS_SUCCESS:
    case ACTIONS.SET_COIN_WITHDRAWAL_ADDRESS_SUCCESS:
      return {
        ...state,
        withdrawalAddresses: {
          ...state.withdrawalAddresses,
          ...action.address,
        }
      };
    case ACTIONS.GET_TRANSACTION_DETAILS_SUCCESS:
    case ACTIONS.WITHDRAW_CRYPTO_SUCCESS:
      return {
        ...state,
        transactions: {
          ...state.transactions,
          [action.transaction.id]: mapTransaction(action.transaction),
        },
        activeTransactionId: action.transaction.id,
      };

    case ACTIONS.GET_ALL_TRANSACTIONS_SUCCESS:
    case ACTIONS.GET_COIN_TRANSACTIONS_SUCCESS:
      action.transactions.forEach(t => { newTransactions[t.id] = mapTransaction(t) });
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
      currencies = action.wallet.data.map(c => {
        const currency = c;
        // round down crypto balances to 5 decimals, otherwise they get rounded wrong
        const amountBN = new BigNumber(currency.amount);
        currency.amountRaw = currency.amount;
        currency.amount = amountBN.toFixed(5, 1);
        currency.amountBN = amountBN;

        return currency;
      }).sort((a, b) => (b.amount * b.market.quotes.USD.price - a.amount * a.market.quotes.USD.price));

      return {
        ...state,
        interest: action.wallet.meta.interest,
        total: action.wallet.meta,
        currencies,
        coinOrder: currencies.map(c => c.currency.short),
      }

    case ACTIONS.STORE_PIN:
      return {
        ...state,
        pin: action.pin,
      }

    case ACTIONS.LOGOUT_USER:
      return { ...initialState() }

    default:
      return state;
  }
}

function mapTransaction(transaction) {
  return {
    ...transaction,
    type: getTransactionType(transaction)
  };
}

function getTransactionType(transaction) {
  if (["canceled", "removed", "rejected", "rejeceted"].includes(transaction.state)) return TRANSACTION_TYPES.CANCELED;

  if (transaction.nature === 'deposit' && !transaction.is_confirmed) return TRANSACTION_TYPES.DEPOSIT_PENDING;
  if (transaction.nature === 'deposit' && transaction.is_confirmed) return TRANSACTION_TYPES.DEPOSIT_CONFIRMED;
  if (transaction.nature === 'withdrawal' && !transaction.is_confirmed) return TRANSACTION_TYPES.WITHDRAWAL_PENDING;
  if (transaction.nature === 'withdrawal' && transaction.is_confirmed) return TRANSACTION_TYPES.WITHDRAWAL_CONFIRMED;
  if (transaction.nature === 'interest') return TRANSACTION_TYPES.INTEREST;
  if (transaction.nature === 'collateral') return TRANSACTION_TYPES.COLLATERAL;
  if (transaction.nature === 'bonus_token') return TRANSACTION_TYPES.BONUS_TOKEN;
  if (transaction.nature === 'referred_award') return TRANSACTION_TYPES.REFERRED_AWARD;

  if (transaction.nature === 'inbound_transfer' && transaction.transfer_data) return TRANSACTION_TYPES.TRANSFER_RECEIVED;
  if (transaction.nature === 'outbound_transfer' && transaction.transfer_data) {
    if (!transaction.transfer_data.claimed_at && !transaction.transfer_data.cleared_at && !transaction.transfer_data.expired_at) return TRANSACTION_TYPES.TRANSFER_PENDING;
    if (transaction.transfer_data.claimed_at && !transaction.transfer_data.cleared_at) return TRANSACTION_TYPES.TRANSFER_CLAIMED;
    if (transaction.transfer_data.claimed_at && transaction.transfer_data.cleared_at) return TRANSACTION_TYPES.TRANSFER_SENT;
    if (transaction.transfer_data.expired_at) return TRANSACTION_TYPES.TRANSFER_RETURNED;
  }

  if (transaction.type === 'incoming') return TRANSACTION_TYPES.IN;
  if (transaction.type === 'outgoing') return TRANSACTION_TYPES.OUT;
}
