import ACTIONS from "../../constants/ACTIONS";

function initialState() {
  return {
    ltvs: undefined,
    allLoans: []
  };
}

export default function loansReducer(state = initialState(), action) {
  switch (action.type) {
    case ACTIONS.GET_INITIAL_CELSIUS_DATA_SUCCESS:
      return {
        ...state,
        ltvs: action.ltvs,
      };

    case ACTIONS.GET_ALL_LOANS_SUCCESS:
      return {
        ...state,
        allLoans: action.allLoans,
      };

    default:
      return { ...state };
  }
}
