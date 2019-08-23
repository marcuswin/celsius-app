import ACTIONS from '../../constants/ACTIONS';
import API from '../../constants/API';
import { openModal, showMessage } from "../ui/uiActions";
import { apiError, startApiCall } from "../api/apiActions";
import { navigateTo } from "../nav/navActions";
import loansService from "../../services/loans-service";
import analytics from "../../utils/analytics";
import { MODALS } from "../../constants/UI";
import formatter from "../../utils/formatter";

export {
  applyForALoan,
  getAllLoans,
  confirmLoanInfo,
  setActiveLoan,
  cancelLoan,
  getMarginCalls,
  lockMarginCollateral,
  updateLoanSettings
}

/**
 * Applies the user for a loan
 */
function applyForALoan() {
  return (dispatch, getState) => {
    const { formData } = getState().forms;
    startApiCall(API.APPLY_FOR_LOAN);

    const loanApplication = {
      coin: formData.coin,
      amount_collateral_usd: formData.amountCollateralUsd,
      amount_collateral_crypto: formData.amountCollateralCrypto,
      ltv: formData.ltv,
      interest: formData.interest,
      loan_amount: formData.loanAmount,
      term_of_loan: formData.termOfLoan,
      bank_info_id: formData.bankInfo ? formData.bankInfo.id : null,
    }

    dispatch(navigateTo("VerifyProfile", {onSuccess: async () =>  {
      try {
        const verification = {
          pin: getState().forms.formData.pin,
          twoFactorCode: getState().forms.formData.code,
        };
        const res = await loansService.apply(loanApplication, verification);
        dispatch({ type: ACTIONS.APPLY_FOR_LOAN_SUCCESS, loan: res.data.loan });
        analytics.loanApplied(res.data.loan)
        dispatch(navigateTo('TransactionDetails', { id: res.data.transaction_id }));
        dispatch(openModal(MODALS.BORROW_CONFIRM))
      } catch (err) {
        dispatch(showMessage('error', err.msg));
        dispatch(apiError(API.APPLY_FOR_LOAN, err));
      }
    }}));
  }
}

/**
 * Get all loans for user
 */
function getAllLoans() {
  return async (dispatch) => {
    try {
      const allLoans = await loansService.getAllLoans();

      dispatch({
        type: ACTIONS.GET_ALL_LOANS_SUCCESS,
        callName: API.GET_ALL_LOANS,
        allLoans
      });

    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_ALL_LOANS, err));
    }
  }
}

/**
 * Get loan information for confirmation for user
 */
function confirmLoanInfo(data) {
  return async (dispatch) => {
    try {
      startApiCall(API.GET_CONFIRM_LOAN_INFO);
      const res = await loansService.setConfirmLoanInfo(data);
      const loanInfo = res.data

      dispatch({
        type: ACTIONS.GET_CONFIRM_LOAN_INFO_SUCCESS,
        callName: API.GET_CONFIRM_LOAN_INFO,
        loanInfo,
      });

    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_ALL_LOANS, err));
    }
  }
}

/**
 * Get margin call warnings
 */
function getMarginCalls() {
  return async (dispatch) => {
    try {
      startApiCall(API.GET_MARGIN_CALLS);

      const marginCalls = await loansService.getMarginCalls();

      dispatch({
        type: ACTIONS.GET_MARGIN_CALLS_SUCCESS,
        callName: API.GET_MARGIN_CALLS,
        marginCalls,
      });
    } catch (err) {

      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_MARGIN_CALLS, err));
    }
  }
}

/**
 * Add collateral on margin call
 *
 * @param {String} marginCallID
 * @param {Object} marginCallData
 * @param {String} marginCallData.coin
 * @param {String} marginCallData.amount_collateral_usd
 * @param {String} marginCallData.amount_collateral_crypto
 *
 * @returns {Promise}
 */
function lockMarginCollateral(marginCallID, marginCallData) {
  return async (dispatch) => {
    try {
      startApiCall(API.LOCK_MARGIN_CALL_COLLATERAL);

      await loansService.lockMarginCollateral(marginCallID, marginCallData);

      dispatch({
        type: ACTIONS.LOCK_MARGIN_CALL_COLLATERAL_SUCCESS,
        callName: API.LOCK_MARGIN_CALL_COLLATERAL
      });

      dispatch(showMessage("success", `You have successfully locked on additional ${formatter.crypto(marginCallData.amount_collateral_crypto, marginCallData.coin)} as collateral.`))
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.LOCK_MARGIN_CALL_COLLATERAL, err));
    }
  }
}

/**
 * Sets active loan in the reducer
 *
 * @param {uuid} - loanId
 */
function setActiveLoan(loanId) {
  return {
    type: ACTIONS.SET_ACTIVE_LOAN,
    loanId,
  }
}

/**
 * Cancels desired pending loan
 * @param id
 */
function cancelLoan() {
  return async (dispatch) => {
    try {
      startApiCall(API.CANCEL_LOAN)
      // id should be number
      // const res = await loansService.cancelLoan(id)

      // TODO add needed logic for redux or call getAllLoans()

    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.CANCEL_LOAN, err));
    }
  }
}

/**
 *  Update Loan Settings
 *
 *  param {String} loanId
 *  param {Object} loan.setting true/false
 */

function updateLoanSettings() {
  return async (dispatch) => {

    try {
      startApiCall(API.UPDATE_LOAN_SETTINGS)
      // const res = await loansService.updateLoanSettings(id, value)

    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.UPDATE_LOAN_SETTINGS, err));
    }
  }
}
