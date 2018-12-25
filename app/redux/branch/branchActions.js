import Branch, {BranchEvent} from "react-native-branch";
import { Constants } from 'expo';
import ACTIONS from "../../config/constants/ACTIONS";
import * as transfersActions from '../transfers/transfersActions';
import * as uiActions from '../ui/uiActions';
import branchService from '../../services/branch-service';
import { BRANCH_LINKS, MODALS } from "../../config/constants/common";
import API from "../../config/constants/API";
import { apiError, startApiCall } from "../api/apiActions";

export {
  registerBranchLink,
  createBranchLink,
  createBranchReferralLink,
  createBUO,
  saveBranchLink,
}

function createBranchLink(linkType, canonicalIdentifier, properties) {
  return async (dispatch, getState) => {
    if (Constants.appOwnership !== 'standalone') return dispatch(uiActions.showMessage('info', 'Cannot create referral link at this time!'));
    try {
      dispatch(startApiCall(API.CREATE_BRANCH_LINK));
      const { user } = getState().users;
      const branchLink = await createBUO(canonicalIdentifier, properties, user.email);

      dispatch({
        type: ACTIONS.CREATE_BRANCH_LINK_SUCCESS,
        branchLink: {
          linkType,
          ...branchLink
        }
      });
    } catch(err) {
      dispatch(apiError(API.CREATE_BRANCH_LINK, err));
    }
  }
}

function saveBranchLink(rawLink) {
  return async (dispatch) => {
    try {
      dispatch(startApiCall(API.SAVE_BRANCH_LINK));
      const branchLink = await branchService.create(rawLink);

      dispatch({
        type: ACTIONS.SAVE_BRANCH_LINK_SUCCESS,
        branchLink: branchLink.data,
      });
    } catch(err) {
      dispatch(apiError(API.SAVE_BRANCH_LINK, err));
    }
  }
}

async function createBUO(canonicalIdentifier, properties, email) {
  if (Constants.appOwnership !== 'standalone') return;

  const branchObject = await Branch.createBranchUniversalObject(canonicalIdentifier, properties);
  Branch.setIdentity(email);
  branchObject.logEvent(BranchEvent.ViewItem);

  const { url } = await branchObject.generateShortUrl();

  return {
    branchObject,
    url: `${url}/`,
  }
}

function createBranchReferralLink() {
  return (dispatch, getState) => {
    const { user } = getState().users;
    dispatch(createBranchLink(
      BRANCH_LINKS.INDIVIDUAL_REFERRAL,
      `referral:${user.id}`,
      {
        locallyIndex: true,
        title: 'Download the App Now to Earn Interest Like Me',
        contentImageUrl: 'https://image.ibb.co/jWfnh9/referall_image.png',
        contentDescription: 'Deposit coins & earn up to 5% interest annually on BTC, ETH, LTC and more.',
        contentMetadata: {
          customMetadata: {
            referrer_id: user.id,
            link_type: BRANCH_LINKS.INDIVIDUAL_REFERRAL,

            referrer_award_amount: 0,
            referred_award_amount: 0,
          }
        }
      }
    ))
  }
}

function registerBranchLink(deepLink) {
  return (dispatch, getState) => {
    dispatch({
      type: ACTIONS.BRANCH_LINK_REGISTERED,
      link: deepLink,
    })

    switch (deepLink.link_type) {
      case BRANCH_LINKS.TRANSFER:
        dispatch(transfersActions.registerTransferLink(deepLink));
        break;

      case BRANCH_LINKS.COMPANY_REFERRAL:
        if (!deepLink.expiration_date || new Date(deepLink.expiration_date) > new Date()) {
          if (!getState().users.user) {
            // TODO: should save all branch links
            dispatch(saveBranchLink(deepLink));
            dispatch(uiActions.openModal(MODALS.REFERRAL_RECEIVED_MODAL));
          } else {
            dispatch(uiActions.showMessage('warning', 'Sorry, but existing users can\'t use this link!'))
          }
        } else {
          dispatch(uiActions.showMessage('warning', 'Sorry, but this link has expired!'))
        }
        break;
      default:

    }
  }
}
