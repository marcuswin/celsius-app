// import ACTIONS from "../../config/constants/ACTIONS";

function initialState() {
  return {
    allLoans: []
  };
}

export default function loansReducer($$state = initialState(), action) {
  switch (action.type) {
    default:
      return { ...$$state };
  }
}
