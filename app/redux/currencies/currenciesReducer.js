import ACTIONS from '../../constants/ACTIONS';

const initialState = {
  rates: undefined,
  graphs: undefined,
}

export default function currenciesReducer(state = initialState, action) {

    switch (action.type) {
    case ACTIONS.GET_CURRENCY_RATES_SUCCESS:
        return {
          ...state,
          rates: action.rates,
        };
    case ACTIONS.GET_CURRENCY_GRAPHS_SUCCESS:
        return {
          ...state,
          graphs: action.graphs,
        };

    default:
        return { ...state };
    }
}
