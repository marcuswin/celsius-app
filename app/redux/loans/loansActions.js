import ACTIONS from '../../config/constants/ACTIONS';
import API from '../../config/constants/API';
import { showMessage, openModal, clearForm } from "../ui/uiActions";
import { apiError, startApiCall } from "../api/apiActions";
import { navigateTo } from "../nav/navActions";
// import loansService from "../../services/loans-service";
// import { analyticsEvents } from "../../utils/analytics-util";
import { MODALS } from "../../config/constants/common";

export {
  applyForALoan,
}

function applyForALoan() {
  return async (dispatch) => {
    try {
      // const { formData } = getState().ui;
      startApiCall(API.APPLY_FOR_LOAN);

      // const loanApplication = {
      //   coin: formData.coin,
      //   collateral_amount_usd: formData.amountCollateralUSD,
      //   collateral_amount_crypto: formData.amountCollateralCrypto,
      //   ltv: formData.ltv.percent,
      //   interest: formData.ltv.interest,
      //   loan_amount: formData.amount,
      //   monthly_payment: formData.monthlyPayment || 0,
      // }

      // const res = await loansService.apply(loanApplication);
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
