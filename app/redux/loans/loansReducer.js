import ACTIONS from "../../constants/ACTIONS";

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
      return {
        ...state,
        allLoans: action.allLoans,
      };

    case ACTIONS.GET_MARGIN_CALLS_SUCCESS:
      return {
        ...state,
        marginCalls: action.marginCalls
      };

    default:
      return { ...state };
  }
}
