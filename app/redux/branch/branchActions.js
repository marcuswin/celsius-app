import ACTIONS from "../../config/constants/ACTIONS";
import * as transfersActions from "../transfers/transfersActions";
import * as uiActions from "../ui/uiActions";
import branchService from "../../services/branch-service";
import { BRANCH_LINKS, MODALS } from "../../config/constants/common";
import API from "../../config/constants/API";
import { apiError, startApiCall } from "../api/apiActions";
import { createIndividualLinkBUO } from "../../utils/branch-util";
import logger from "../../utils/logger-util";

export {
  registerBranchLink,
  saveBranchLink,
  getBranchIndividualLink,
  createBranchIndividualLink
};

function saveBranchLink(rawLink) {
  return async (dispatch) => {
    try {
      dispatch(startApiCall(API.SAVE_BRANCH_LINK));
      const branchLink = await branchService.create(rawLink);

      dispatch({
        type: ACTIONS.SAVE_BRANCH_LINK_SUCCESS,
        branchLink: branchLink.data
      });
    } catch (err) {
      dispatch(apiError(API.SAVE_BRANCH_LINK, err));
    }
  };
}

function createBranchIndividualLink() {
  return async (dispatch) => {
    const branchLink = await createIndividualLinkBUO();
    dispatch({
      type: ACTIONS.SET_INDIVIDUAL_REFERRAL_LINK,
      link: branchLink.url
    });
  };
}

function getBranchIndividualLink() {
  return async (dispatch) => {
    try {
      dispatch(startApiCall(API.GET_INDIVIDUAL_LINK));

      const branchLinkRes = await branchService.getIndividualLink();

      dispatch({
        type: ACTIONS.GET_INDIVIDUAL_LINK_SUCCESS,
        callName: API.GET_INDIVIDUAL_LINK,
        link: branchLinkRes.data.url
      });
    } catch (err) {
      dispatch(uiActions.showMessage("error", err.msg));
      dispatch(apiError(API.GET_INDIVIDUAL_LINK, err));
    }
  };
};

function registerBranchLink(deepLink) {
  return (dispatch, getState) => {
    dispatch({
      type: ACTIONS.BRANCH_LINK_REGISTERED,
      link: deepLink
    });

    switch (deepLink.link_type) {
      case BRANCH_LINKS.TRANSFER:
        dispatch(transfersActions.registerTransferLink(deepLink));
        break;

      case BRANCH_LINKS.COMPANY_REFERRAL:
        logger.logme({ companyLink: deepLink });

        // TODO(fj): endpoint for checking valid link ?

        if (!deepLink.referred_award_amount || !deepLink.referred_award_coin) return;

        if (!deepLink.expiration_date || new Date(deepLink.expiration_date) > new Date()) {
          if (!getState().users.user) {

            dispatch(uiActions.openModal(MODALS.REFERRAL_RECEIVED_MODAL));
          } else {
            dispatch(uiActions.showMessage("warning", "Sorry, but existing users can't use this link!"));
          }
        } else {
          dispatch(uiActions.showMessage("warning", "Sorry, but this link has expired!"));
        }
        break;

      case BRANCH_LINKS.INDIVIDUAL_REFERRAL:
        logger.logme({ individualLink: deepLink });
        if (!getState().users.user) {
          // TODO(fj): check if individual link is valid on an enpoint //max number of users check|country|award change

          // dispatch(saveBranchLink(deepLink));

          dispatch(uiActions.openModal(MODALS.REFERRAL_RECEIVED_MODAL));
        } else {
          dispatch(uiActions.showMessage("warning", "Sorry, but existing users can't use this link!"));
        }
        break;

      default:

    }
  };
}
