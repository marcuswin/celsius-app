import LoanRequest from '../../models/loan-request';
import ACTIONS from '../../config/constants/ACTIONS';

const initialState = {
  loanRequest: undefined,
  supportedCurrencies: undefined,
  competitionRates: undefined,
};

export default (state = initialState, action) => {
  const { loanRequest, supportedCurrencies, competitionRates } = action;

  switch(action.type) {
    case ACTIONS.GET_LOAN_REQUEST_SUCCESS:
    case ACTIONS.CREATE_LOAN_REQUEST_SUCCESS:
      return {
        ...state,
        loanRequest: new LoanRequest(loanRequest),
        competitionRates,
      };

    case ACTIONS.ACCEPT_LOAN_REQUEST_SUCCESS:
      return {
        ...state,
        loanRequest: new LoanRequest(loanRequest),
      };

    case ACTIONS.CANCEL_LOAN_REQUEST_SUCCESS:
      return {
        ...state,
        loanRequest: null,
      };

    case ACTIONS.GET_SUPPORTED_CURRENCIES_SUCCESS:
      return {
        ...state,
        supportedCurrencies,
      };

    default:
      return { ...state };

  }
}
