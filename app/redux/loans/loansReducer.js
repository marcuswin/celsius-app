import ACTIONS from "../../constants/ACTIONS";

function initialState() {
  return {
    ltvs: undefined,
  };
}

export default function loansReducer(state = initialState(), action) {
  switch (action.type) {
    case ACTIONS.GET_INITIAL_CELSIUS_DATA_SUCCESS:
      return {
        ...state,
        ltvs: action.ltvs,
      };
    default:
      return { ...state };
  }
}
