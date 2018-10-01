import ACTIONS from '../../config/constants/ACTIONS';

function initialState() {
    return {
        rates: undefined,
        ratesDisplay: undefined,
        chartData: {},
    };
}

export default function interestReducer($$state = initialState(), action) {
    const rates = {};
    const ratesDisplay = {};

    switch (action.type) {
      case ACTIONS.GET_INTEREST_RATES_SUCCESS:
        action.interestRates.forEach(ir => {
          rates[ir.coin] = ir.rate;
          ratesDisplay[ir.coin] = (ir.rate * 100).toFixed(2);
        });

        return {
          ...$$state,
          rates,
          ratesDisplay,
        };

      case ACTIONS.GET_INTEREST_CHART_DATA_SUCCESS:

        return {
          ...$$state,
          chartData: action.chartData
        };

      default:
          return { ...$$state };
    }
}
