import ACTIONS from "../../config/constants/ACTIONS";
import * as transfersActions from "../transfers/transfersActions";
import * as uiActions from "../ui/uiActions";
import branchService from "../../services/branch-service";
import { BRANCH_LINKS, MODALS } from "../../config/constants/common";
import API from "../../config/constants/API";
import { apiError, startApiCall } from "../api/apiActions";
import { createIndividualLinkBUO } from "../../utils/branch-util";

export {
  registerBranchLink,
  saveBranchLink,
  getBranchLink,
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
        link: branchLinkRes.data.branch_link.branch_link
      });
    } catch (err) {
      dispatch(uiActions.showMessage("error", err.msg));
      dispatch(apiError(API.GET_INDIVIDUAL_LINK, err));
    }
  };
};

function registerBranchLink(deepLink) {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.BRANCH_LINK_REGISTERED,
      link: deepLink
    });

    switch (deepLink.link_type) {
      case BRANCH_LINKS.TRANSFER:
        return dispatch(transfersActions.registerTransferLink(deepLink));
      case BRANCH_LINKS.COMPANY_REFERRAL:
      case BRANCH_LINKS.INDIVIDUAL_REFERRAL:
        return dispatch(registerReferralLink(deepLink));
      default:
    }
  };
}

function registerReferralLink(deepLink) {
  return async (dispatch, getState) => {
    try {
      const { user } = getState().users
      if (user) return dispatch(uiActions.showMessage("warning", "Sorry, but existing users can't use this link!"));

      dispatch(startApiCall(API.GET_LINK_BY_URL));

      const linkRes = await branchService.getByUrl(deepLink['~referring_link']);
      const linkResData = linkRes.data;

      if (!linkResData.valid) {
        dispatch(apiError(API.GET_LINK_BY_URL));
        dispatch(uiActions.showMessage("warning", "Sorry, but this link is not valid anymore!"));
      } else {
        dispatch({
          type: ACTIONS.GET_LINK_BY_URL_SUCCESS,
          callName: API.GET_LINK_BY_URL,
          branchLink: linkResData.branch_link
        });

        if (!deepLink.referred_award_amount || !deepLink.referred_award_coin) return;
        dispatch(uiActions.openModal(MODALS.REFERRAL_RECEIVED_MODAL));
      }
    } catch(err) {
      dispatch(apiError(API.GET_LINK_BY_URL, err));
      dispatch(uiActions.showMessage("error", err.msg));
    }
  }
}

function getBranchLink(url) {
  return async (dispatch) => {
    try {
      dispatch(startApiCall(API.GET_LINK_BY_URL));

      const linkRes = await branchService.getByUrl(url);
      dispatch({
        type: ACTIONS.GET_LINK_BY_URL_SUCCESS,
        callName: API.GET_LINK_BY_URL,
        branchLink: linkRes.data
      });
    } catch (err) {
      dispatch(apiError(API.GET_LINK_BY_URL, err));
    }
  };
}
