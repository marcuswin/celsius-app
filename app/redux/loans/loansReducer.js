import ACTIONS from "../../config/constants/ACTIONS";

const initialState = {
  allLoans: []
}

export default function loansReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.GET_ALL_LOANS_SUCCESS:
      return {
        ...state,
        allLoans: action.allLoans,
      };
    default:
      return { ...state };
  }
}
