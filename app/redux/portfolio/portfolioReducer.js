import ACTIONS from '../../config/constants/ACTIONS';

const initialState = {
  portfolio: [],
  estimatedLoan: undefined,
  estimatedInterest: undefined,
};

export default (state = initialState, action) => {
  switch(action.type) {
    case ACTIONS.GET_PORTFOLIO_SUCCESS:
      return {
        ...state,
        portfolio: action.payload,
      }

    case ACTIONS.GET_ESTIMATED_LOAN_SUCCESS:
      return {
        ...state,
        estimatedLoan: action.estimatedLoan,
      }

    case ACTIONS.GET_ESTIMATED_INTEREST_SUCCESS:
      return {
        ...state,
        estimatedInterest: action.estimatedInterest,
      }

    default:
      return state

  }
}
