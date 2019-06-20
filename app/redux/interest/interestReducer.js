import ACTIONS from '../../constants/ACTIONS';

function initialState() {
    return {
        rates: undefined,
        ratesDisplay: undefined,
        ratesInfo: undefined,
        chartData: {},
    };
}

export default function interestReducer(state = initialState(), action) {
    switch (action.type) {
      case ACTIONS.GET_INTEREST_CHART_DATA_SUCCESS:

        return {
          ...state,
          chartData: action.chartData
        };

      default:
          return { ...state };
    }
}
