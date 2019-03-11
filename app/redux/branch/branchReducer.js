import ACTIONS from "../../constants/ACTIONS";
import { BRANCH_LINKS } from "../../config/constants/common";

const initialState = {
  registeredLink: null,

  transferHash: null,
};

export default function branchReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.BRANCH_LINK_REGISTERED:
      return {
        ...state,
        registeredLink: action.link,
        transferHash: action.link.hash,
      };

    case ACTIONS.CREATE_BRANCH_LINK_SUCCESS:
      return {
        ...state,
      };

    case ACTIONS.SAVE_BRANCH_LINK_SUCCESS:
      return {
        ...state,
        referralLinkId: [BRANCH_LINKS.COMPANY_REFERRAL, BRANCH_LINKS.INDIVIDUAL_REFERRAL].indexOf(action.branchLink.link_type) !== -1 ? action.branchLink.id : state.referralLinkId,
      };

    default:
      return state;
  }
}
