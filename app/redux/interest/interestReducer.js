import ACTIONS from '../../config/constants/ACTIONS';

function initialState() {
    return {
        rates: undefined,
    };
}

export default function interestReducer($$state = initialState(), action) {
    const rates = {};

    switch (action.type) {
      case ACTIONS.GET_INTEREST_RATES_SUCCESS:
        action.interestRates.forEach(ir => {
          rates[ir.coin] = ir.rate;
        })

        return {
          ...$$state,
          rates,
        }

      default:
          return { ...$$state };
    }
}
