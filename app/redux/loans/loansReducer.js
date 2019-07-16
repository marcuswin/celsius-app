import ACTIONS from "../../constants/ACTIONS";
import loanUtil from "../../utils/loan-util";

const USE_MOCK_LOANS = true

/**
 * TODO make it a function add JSDoc & desc for return
 */
function initialState() {
  return {
    ltvs: undefined,
    allLoans: []
  };
}

export default function loansReducer(state = initialState(), action) {
  let loans;
  switch (action.type) {
    case ACTIONS.GET_INITIAL_CELSIUS_DATA_SUCCESS:
      return {
        ...state,
        ltvs: action.ltvs,
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

    default:
      return { ...state };
  }
}
