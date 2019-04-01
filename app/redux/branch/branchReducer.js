import ACTIONS from '../../constants/ACTIONS'
import { BRANCH_LINKS } from '../../constants/DATA'

const initialState = {
  registeredLink: null,
  promoCode: null,
  transferHash: null,
};


export default function branchReducer (state = initialState, action) {
  switch (action.type) {
    case ACTIONS.BRANCH_LINK_REGISTERED:
      return {
        ...state,
        registeredLink: action.link,
        transferHash: action.link.hash
      }
    case ACTIONS.GET_LINK_BY_URL_SUCCESS:
      return {
        ...state,
        registeredLink: {
          ...state.registeredLink,
          ...action.branchLink
        }
      }
    case ACTIONS.CREATE_BRANCH_LINK_SUCCESS:
      return {
        ...state
      }

    case ACTIONS.SAVE_BRANCH_LINK_SUCCESS:
      return {
        ...state,
        referralLinkId:
          [
            BRANCH_LINKS.COMPANY_REFERRAL,
            BRANCH_LINKS.INDIVIDUAL_REFERRAL
          ].indexOf(action.branchLink.link_type) !== -1
            ? action.branchLink.id
            : state.referralLinkId
      }

    case ACTIONS.CHECK_PROFILE_PROMO_CODE_SUCCESS:
      return {
        ...state,
        promoCode: action.code
      };

    case ACTIONS.SUBMIT_PROMO_CODE_SUCCESS:
        return {
          state,
          registeredLink: {
            ...state.registeredLink,
            ...action.branchLink
          }
        };

    default:
      return state
  }
}
