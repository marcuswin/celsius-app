// TODO(fj): split into wallet and transactions

import BigNumber from 'bignumber.js';

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
  let currencies;

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
    case ACTIONS.GET_COIN_ORIGINATING_ADDRESS_SUCCESS:
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

    default:
      return state;
  }
}
