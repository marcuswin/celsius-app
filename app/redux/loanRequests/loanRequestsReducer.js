import LoanRequest from '../../models/loan-request';
import ACTIONS from '../../config/constants/ACTIONS';

const initialState = {
  loanRequest: undefined,
  supportedCurrencies: undefined,
  competitionRates: undefined,
  loanStatus: undefined
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

    case ACTIONS.STATUS_LOAN_REQUEST_SUCCESS:
      return {
        ...state,
        loanStatus: action.status,
      };

    case ACTIONS.CANCEL_LOAN_REQUEST_SUCCESS:
      return {
        ...state,
        loanRequest: null,
      };

    case ACTIONS.CREATE_LOAN_DETAILS_SUCCESS:
    case ACTIONS.GET_LOAN_DETAILS_SUCCESS:
      return {
        ...state,
        loanRequest: {
          ...state.loanRequest,
          loan_purpose: action.loanDetails.loan_purpose,
          note: action.loanDetails.note,
          source_of_funds: action.loanDetails.source_of_funds,
          ssn: action.loanDetails.ssn,
          public_wallet_address: action.loanDetails.public_wallet_address,
          // bank_name: action.loanDetails.bank_name,
          // bank_routing_number: action.loanDetails.bank_routing_number,
          // bank_account_number: action.loanDetails.bank_account_number,
        },
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
