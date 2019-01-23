import ACTIONS from "../../config/constants/ACTIONS";
import { BRANCH_LINKS } from "../../config/constants/common";

const initialState = {
  initialized: false,
  referralObject: null,
  referralLinkId: null,

  screen: null,

  allLinks: [],
  createdLinks: [],
  savedLinks: [],
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

    case ACTIONS.SAVE_BRANCH_LINK_SUCCESS:
      return {
        ...state,
        savedLinks: [
          ...state.savedLinks,
          action.branchLink
        ],
        referralLinkId: [BRANCH_LINKS.COMPANY_REFERRAL, BRANCH_LINKS.INDIVIDUAL_REFERRAL].indexOf(action.branchLink.link_type) !== -1 ? action.branchLink.id : state.referralLinkId,
      };

    case ACTIONS.CLEAR_BRANCH_SCREEN:
    case ACTIONS.REGISTER_NAVIGATION_LINK:
      return {
        ...state,
        screen: action.screen,
      };

    default:
      return state;
  }
}
