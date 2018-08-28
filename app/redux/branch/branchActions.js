import ACTIONS from "../../config/constants/ACTIONS";

export function registerBranchLink(deepLink) {
  return dispatch => {
    dispatch({
      type: ACTIONS.BRANCH_LINK_REGISTERED,
      link: deepLink,
    })
  }
}
