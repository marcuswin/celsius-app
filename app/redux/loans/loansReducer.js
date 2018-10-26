// import ACTIONS from "../../config/constants/ACTIONS";

function initialState() {
  return {
    // intial state goes here
  };
}

export default function loansReducer($$state = initialState(), action) {
  console.log(action.type);
  switch (action.type) {
    // case ACTIONS.TEST_ACTION:
    //     return { ...$$state };

    default:
      return { ...$$state };
  }
}
