import ACTIONS from '../../constants/ACTIONS'
import * as transfersActions from '../transfers/transfersActions'
import * as uiActions from '../ui/uiActions'
import branchService from '../../services/branch-service'
import API from '../../constants/API'
import { apiError, startApiCall } from '../api/apiActions'
import { createIndividualLinkBUO } from '../../utils/branch-util'
import { BRANCH_LINKS } from '../../constants/DATA'
import { MODALS } from '../../constants/UI'

export {
  registerBranchLink,
  saveBranchLink,
  getBranchIndividualLink,
  createBranchIndividualLink
}

function saveBranchLink (rawLink) {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.SAVE_BRANCH_LINK))
      const branchLink = await branchService.create(rawLink)

      dispatch({
        type: ACTIONS.SAVE_BRANCH_LINK_SUCCESS,
        branchLink: branchLink.data
      })
    } catch (err) {
      dispatch(apiError(API.SAVE_BRANCH_LINK, err))
    }
  }
}

function createBranchIndividualLink () {
  return async dispatch => {
    const branchLink = await createIndividualLinkBUO()
    dispatch({
      type: ACTIONS.SET_INDIVIDUAL_REFERRAL_LINK,
      link: branchLink.url
    })
  }
}

function getBranchIndividualLink () {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.GET_INDIVIDUAL_LINK))

      const branchLinkRes = await branchService.getIndividualLink()

      dispatch({
        type: ACTIONS.GET_INDIVIDUAL_LINK_SUCCESS,
        callName: API.GET_INDIVIDUAL_LINK,
        link: branchLinkRes.data.url
      })
    } catch (err) {
      dispatch(uiActions.showMessage('error', err.msg))
      dispatch(apiError(API.GET_INDIVIDUAL_LINK, err))
    }
  }
}

function registerBranchLink (deepLink) {
  return dispatch => {
    const deepLinkParams = deepLink.params
    dispatch({
      type: ACTIONS.BRANCH_LINK_REGISTERED,
      link: deepLinkParams
    })
    if (
      deepLinkParams.link_type === BRANCH_LINKS.TRANSFER ||
      deepLinkParams.type === BRANCH_LINKS.TRANSFER
    ) {
      return dispatch(transfersActions.registerTransferLink(deepLinkParams))
    }

    if (
      deepLinkParams.link_type === BRANCH_LINKS.COMPANY_REFERRAL ||
      deepLinkParams.type === BRANCH_LINKS.COMPANY_REFERRAL ||
      deepLinkParams.link_type === BRANCH_LINKS.INDIVIDUAL_REFERRAL ||
      deepLinkParams.type === BRANCH_LINKS.INDIVIDUAL_REFERRAL
    ) {
      // TODO
      return dispatch(registerReferralLink(deepLinkParams))
    }
  }
}

function registerReferralLink (deepLink) {
  return async (dispatch, getState) => {
    try {
      const { profile } = getState().user
      if (profile.id) {
        return dispatch(
          uiActions.showMessage(
            'warning',
            "Sorry, but existing users can't use this link!"
          )
        )
      }

      dispatch(startApiCall(API.GET_LINK_BY_URL))

      const linkRes = await branchService.getByUrl(deepLink['~referring_link'])
      const linkResData = linkRes.data

      if (!linkResData.valid) {
        dispatch(apiError(API.GET_LINK_BY_URL))
        dispatch(
          uiActions.showMessage(
            'warning',
            'Sorry, but this link is not valid anymore!'
          )
        )
      } else {
        dispatch({
          type: ACTIONS.GET_LINK_BY_URL_SUCCESS,
          callName: API.GET_LINK_BY_URL,
          branchLink: linkResData.branch_link
        })

        if (
          !linkResData.branch_link.referred_award_amount ||
          !linkResData.branch_link.referred_award_coin
        ) {
          return
        }
        dispatch(uiActions.openModal(MODALS.REFERRAL_RECEIVED_MODAL))
      }
    } catch (err) {
      dispatch(apiError(API.GET_LINK_BY_URL, err))
      dispatch(uiActions.showMessage('error', err.msg))
    }
  }
}
