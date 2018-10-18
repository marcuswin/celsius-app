import ACTIONS from "../../config/constants/ACTIONS";

const initialState = {
  initialized: false,
  referralObject: null,

  allLinks: [],
  createdLinks: [],
};

export default function branchReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.BRANCH_LINK_REGISTERED:
      return {
        ...state,
        allLinks: [ ...state.allLinks, action.link ],
      };

    case ACTIONS.CREATE_BRANCH_LINK_SUCCESS:
      return {
        ...state,
        createdLinks: [
          ...state.createdLinks,
          action.branchLink
        ]
      };

    default:
      return state;
  }
}
