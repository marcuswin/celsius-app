import ACTIONS from "../../constants/ACTIONS";

const initialState = {
  rates: undefined,
  graphs: undefined,
  currencyRatesShort: undefined,
};

export default function currenciesReducer(state = initialState, action) {
  let currencyRatesShort;

  switch (action.type) {
    case ACTIONS.GET_CURRENCY_RATES_SUCCESS:
      action.rates.forEach(sc => {
        currencyRatesShort[sc.short.toLowerCase()] = sc.market_quotes_usd.price;
      });

      return {
        ...state,
        rates: action.rates,
        currencyRatesShort,
      };
    case ACTIONS.GET_CURRENCY_GRAPHS_SUCCESS:
      return {
        ...state,
        graphs: action.graphs
      };

    default:
      return { ...state };
  }
}
