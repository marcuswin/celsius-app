import ACTIONS from '../../config/constants/ACTIONS';

function initialState() {
  return {
    supportedCurrencies: undefined,
  };
}

export default function generalDataReducer(state = initialState(), action) {
  const currencyRates = {};
  const currencyRatesShort = {};

  switch (action.type) {
    case ACTIONS.GET_SUPPORTED_CURRENCIES_SUCCESS:
      action.supportedCurrencies.forEach(sc => {
        currencyRates[sc.name] = sc.market.quotes.USD.price;
        currencyRatesShort[sc.short.toLowerCase()] = sc.market.quotes.USD.price;
      });
      return {
        ...state,
        supportedCurrencies: action.supportedCurrencies,
        currencyRates,
        currencyRatesShort,
      };

    case ACTIONS.GET_KYC_DOC_TYPES_SUCCESS:
      return {
        ...state,
        kycDocTypes: action.kycDocTypes,
      };

  default:
    return state;
  }
}
