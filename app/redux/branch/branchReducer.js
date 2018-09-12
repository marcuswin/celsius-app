import ACTIONS from "../../config/constants/ACTIONS";

const initialState = {
  allLinks: [],
  initialized: false,
  referralObject: null
};

export default function branchReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.BRANCH_LINK_REGISTERED:
      return {
        ...state,
        allLinks: [ ...state.allLinks, action.link ],
      };
    case ACTIONS.BRANCH_LINK_INITIALIZED:
      return {
        ...state,
        initialized: true,
        referralObject: action.referralObject
      };
    case ACTIONS.BRANCH_LINK_INITIALIZED_DEV:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
}
