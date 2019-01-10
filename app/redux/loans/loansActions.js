import ACTIONS from '../../config/constants/ACTIONS';
import API from '../../config/constants/API';
import { showMessage, openModal, clearForm } from "../ui/uiActions";
import { apiError, startApiCall } from "../api/apiActions";
import { navigateTo } from "../nav/navActions";
// import loansService from "../../services/loans-service";
// import { analyticsEvents } from "../../utils/analytics-util";
import { MODALS, LOAN_STATUSES } from "../../config/constants/common";
// import { LOAN_STATUSES } from "../../config/constants/common";
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
        collateral_amount_crypto: formData.collateralAmountCrypto,
        collateral_amount_usd: formData.collateralAmountUSD,
        coin: formData.coin,
        ltv: formData.ltv.percent,
        interest: formData.ltv.interest,
        term_of_loan: formData.termOfLoan,
        monthly_payment: formData.amount * formData.ltv.interest / formData.termOfLoan,
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

      // const res = await loansService.getAllLoans();
      const res = {
        data: {
          loans: [
            { id: 1000, amount_collateral_usd: 1000, amount_collateral_crypto: 12.5, coin: 'BTC', status: LOAN_STATUSES.pending, created_at: new Date(), ltv: 0.5, interest: 0.12, term_of_loan: 12, monthly_payment: 80 },
            { id: 20000, amount_collateral_usd: 20000, amount_collateral_crypto: 122.5, coin: 'ETH', status: LOAN_STATUSES.rejected, created_at: new Date(), ltv: 0.5, interest: 0.12, term_of_loan: 12, monthly_payment: 80 },
            { id: 15000, amount_collateral_usd: 15000, amount_collateral_crypto: 120, coin: 'ETH', status: LOAN_STATUSES.approved, created_at: new Date(), ltv: 0.5, interest: 0.12, term_of_loan: 12, monthly_payment: 80 },
            { id: 10000, amount_collateral_usd: 10000, amount_collateral_crypto: 125, coin: 'XRP', status: LOAN_STATUSES.active, created_at: new Date(), ltv: 0.5, interest: 0.12, term_of_loan: 12, monthly_payment: 80 },
            { id: 12000, amount_collateral_usd: 12000, amount_collateral_crypto: 155, coin: 'LTC', status: LOAN_STATUSES.completed, created_at: new Date(), ltv: 0.5, interest: 0.12, term_of_loan: 12, monthly_payment: 80 },
          ]
        }
      }

      dispatch(getAllLoansSuccess(res.data.loans));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_ALL_LOANS, err));
    }
  }
}

function getAllLoansSuccess(loans) {
  return (dispatch) => {
    console.log(loans)
    dispatch({
      type: ACTIONS.GET_ALL_LOANS_SUCCESS,
      callName: API.GET_ALL_LOANS,
      allLoans: loans,
    });
  }
}