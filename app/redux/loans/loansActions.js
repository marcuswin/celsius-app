import ACTIONS from '../../config/constants/ACTIONS';
import API from '../../config/constants/API';
import { showMessage, openModal, clearForm } from "../ui/uiActions";
import { apiError, startApiCall } from "../api/apiActions";
import { navigateTo } from "../nav/navActions";
import { MODALS } from "../../config/constants/common";
import loansService from '../../services/loans-service';

export {
  applyForALoan,
  getAllLoans
}

function applyForALoan() {
  return async (dispatch, getState) => {
    try {
      const { formData } = getState().ui;
      startApiCall(API.APPLY_FOR_LOAN);

      const loanApplication = {
        loan_amount: formData.amount,
        coin: formData.coin,
        ltv: formData.ltv.percent,
        interest: formData.ltv.interest,
        term_of_loan: formData.termOfLoan,
      }

      await loansService.apply(loanApplication);
      dispatch({ type: ACTIONS.APPLY_FOR_LOAN_SUCCESS });
      // analyticsEvents.applyForLoan(res.data)
      // dispatch(showMessage('success', 'You have successfully applied for a loan! Somebody from Celsius will contact you.'));
      dispatch(openModal(MODALS.BORROW_SUCCESS_MODAL));
      dispatch(navigateTo('Home', true));
      dispatch(clearForm());
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.APPLY_FOR_LOAN, err));
    }
  }
}

function getAllLoans() {
  return async (dispatch) => {
    try {
      startApiCall(API.GET_ALL_LOANS);

      const res = await loansService.getAllLoans();

      dispatch(getAllLoansSuccess(res.data));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_ALL_LOANS, err));
    }
  }
}

function getAllLoansSuccess(loans) {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.GET_ALL_LOANS_SUCCESS,
      callName: API.GET_ALL_LOANS,
      allLoans: loans,
    });
  }
}
