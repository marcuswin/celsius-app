import ACTIONS from "../../constants/ACTIONS";
import loanUtil from "../../utils/loan-util";

const USE_MOCK_LOANS = true
const USE_MOCK_MARGIN_CALLS = true

/**
 * TODO make it a function add JSDoc & desc for return
 */
function initialState() {
  return {
    ltvs: undefined,
    allLoans: [],
    activeLoan: null,
    marginCalls: []
  };
}

export default function loansReducer(state = initialState(), action) {
  let loans;
  let marginCalls;
  switch (action.type) {
    case ACTIONS.GET_INITIAL_CELSIUS_DATA_SUCCESS:
      return {
        ...state,
        ltvs: action.ltvs,
      };

    case ACTIONS.SET_ACTIVE_LOAN:
      return {
        ...state,
        activeLoan: state.allLoans.find(l => l.id === action.loanId),
      };

    case ACTIONS.GET_ALL_LOANS_SUCCESS:
      if (USE_MOCK_LOANS) {
        loans = Object
          .values(require("../../mock-data/loans.mock").default)
          .map(l => loanUtil.mapLoan(l))

      } else {
        loans = action.allLoans.map(l => loanUtil.mapLoan(l))
      }

      return {
        ...state,
        allLoans: loans,
      };

    case ACTIONS.GET_MARGIN_CALLS_SUCCESS:
      if(USE_MOCK_MARGIN_CALLS) {
        marginCalls = require("../../mock-data/margincalls.mock").default
      } else {
        marginCalls = action.marginCalls
      }

      
      return {
        ...state,
        marginCalls: marginCalls.map(m => loanUtil.mapMarginCall(m))
      };

    default:
      return { ...state };
  }
}
