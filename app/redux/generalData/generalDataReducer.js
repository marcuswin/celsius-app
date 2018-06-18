import ACTIONS from '../../config/constants/ACTIONS';

function initialState() {
  return {
    supportedCurrencies: undefined,
  };
}

export default function generalDataReducer(state = initialState(), action) {
  switch (action.type) {
    case ACTIONS.GET_SUPPORTED_CURRENCIES_SUCCESS:
      return {
        ...state,
        supportedCurrencies: action.supportedCurrencies,
      };

  default:
    return state;
  }
}
