import Branch, {BranchEvent} from "react-native-branch";
import { Constants } from 'expo';
import ACTIONS from "../../config/constants/ACTIONS";

export function registerBranchLink(deepLink) {
  return dispatch => {
    dispatch({
      type: ACTIONS.BRANCH_LINK_REGISTERED,
      link: deepLink,
    })
  }
}

/**
 * @param {Object} user
 * @returns {Function}
 */
export function initializeBranch(user) {
  return async dispatch => {
    if (Constants.appOwnership === 'standalone') {
      const referralObject = await Branch.createBranchUniversalObject(
        `referral:${user.email}`,
        {
          locallyIndex: true,
          title: 'Join Celsius!',
          contentDescription: 'Deposit coins & earn up to 5% interest annually on your coins'
        }
      );

      Branch.setIdentity(user.email);

      referralObject.logEvent(BranchEvent.ViewItem);

      dispatch({
        type: ACTIONS.BRANCH_LINK_INITIALIZED,
        referralObject,
      });
    } else {
      dispatch({
        type: ACTIONS.BRANCH_LINK_INITIALIZED_DEV,
      });
    }
  }
}
