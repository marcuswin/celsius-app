// TODO(fj) add currency rates to initial state
// TODO(fj) split graphs ?

import ACTIONS from '../../constants/ACTIONS';

function initialState() {
  return {
    kycDocTypes: undefined,
    backendStatus: undefined,
    interestRates: undefined,
    minimumLoanAmount: undefined,
    celUtilityTiers: undefined,
    withdrawalSettings: undefined,

    // TODO: remove
    supportedCurrencies: undefined,
    blacklistedCountryLocation: [],
    blacklistedCountryResidency: [],
    blacklistedStatesLocation: [],
    blacklistedStatesResidency: []
  };
}

export default function generalDataReducer(state = initialState(), action) {
  const currencyRates = {};
  const currencyRatesShort = {};
  let interestRates

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

    case ACTIONS.GET_INITIAL_CELSIUS_DATA_SUCCESS:
      return {
        ...state,
        interestRates: action.interestRates,
        minimumLoanAmount: action.minimumLoanAmount,
        celUtilityTiers: action.celUtilityTiers,
        withdrawalSettings: action.withdrawalSettings,
      };

    case ACTIONS.GET_LOYALTY_INFO_SUCCESS:
      interestRates = { ...state.interestRates }

      Object.keys(state.interestRates).forEach(coinShort => {
        interestRates[coinShort].cel_rate = ((1 + Number(action.loyaltyInfo.earn_interest_bonus)) * state.interestRates[coinShort].rate).toString()
      })

      return {
        ...state,
        interestRates,
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
