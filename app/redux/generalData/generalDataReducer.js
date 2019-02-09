// TODO(fj) add currency rates to initial state
// TODO(fj) split graphs ?

import ACTIONS from '../../constants/ACTIONS';

function initialState() {
  return {
    supportedCurrencies: undefined,
    kycDocTypes: undefined,
    backendStatus: undefined,
    blacklistedCountryLocation: [],
    blacklistedCountryResidency: [],
    blacklistedStatesLocation: [],
    blacklistedStatesResidency: []
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

    case ACTIONS.GET_BACKEND_STATUS_SUCCESS:
      return {
        ...state,
        backendStatus: action.backendStatus,
      };

    case ACTIONS.GET_BLACKLISTED_COUNTRIES_SUCCESS:
      return {
        ...state,
        blacklistedCountryLocation: action.blacklistedCountryLocation,
        blacklistedCountryResidency: action.blacklistedCountryResidency,
        blacklistedStatesLocation: action.blacklistedStatesLocation,
        blacklistedStatesResidency: action.blacklistedStatesResidency
      };

  default:
    return state;
  }
}
