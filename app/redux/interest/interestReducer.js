import ACTIONS from '../../config/constants/ACTIONS';

function initialState() {
    return {
        rates: undefined,
        ratesDisplay: undefined,
        ratesInfo: undefined,
        chartData: {},
    };
}

export default function interestReducer(state = initialState(), action) {
    const rates = {};
    const ratesDisplay = {};
    const ratesInfo = {};

    switch (action.type) {
      case ACTIONS.GET_INTEREST_RATES_SUCCESS:
        action.interestRates.forEach(ir => {
          rates[ir.coin] = ir.rate;
          ratesDisplay[ir.coin] = (ir.rate * 100).toFixed(2);
          ratesInfo[ir.coin] = ir.currency;
        });

        return {
          ...state,
          rates,
          ratesDisplay,
          ratesInfo,
        };

      case ACTIONS.GET_INTEREST_CHART_DATA_SUCCESS:

        return {
          ...state,
          chartData: action.chartData
        };

      default:
          return { ...state };
    }
}
