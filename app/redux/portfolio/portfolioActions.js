import ACTIONS from '../../config/constants/ACTIONS';
import API from '../../config/constants/API';
import {startApiCall, apiError} from '../api/apiActions';
import {showMessage} from '../ui/uiActions';
import portfolioService from '../../services/portfolio-service';

import { actions as mixpanelActions } from '../../services/mixpanel';


export {
  getPortfolio,
  updatePortfolio,
  getEstimatedLoan,
  getEstimatedInterest,
}

function updatePortfolio(data) {
  mixpanelActions.saveCoinButton();

  return async dispatch => {
    dispatch(startApiCall(API.CREATE_PORTFOLIO_REQUEST));

    try {
      const res = await portfolioService.update(data);
      const portfolio = res.data;
      dispatch(updatePortfolioRequestSuccess(portfolio));

    } catch (err) {
      dispatch(showMessage(err.type === 'info' ? 'info' : 'error', err.msg));
      dispatch(apiError(API.CREATE_PORTFOLIO_REQUEST, err));
    }
  }
}

function updatePortfolioRequestSuccess(portfolio) {
  return {
    type: ACTIONS.CREATE_PORTFOLIO_SUCCESS,
    portfolio,
    callName: API.CREATE_PORTFOLIO_REQUEST,
  }
}

function getPortfolio() {
  return async dispatch => {
    dispatch(startApiCall(API.GET_PORTFOLIO_REQUEST));

    try {
      const res = await portfolioService.get();
      const portfolio = res;
      dispatch(getPortfolioRequestSuccess(portfolio));
    } catch (err) {
      dispatch(showMessage(err.type === 'info' ? 'info' : 'error', err.msg));
      dispatch(apiError(API.GET_PORTFOLIO_REQUEST, err));
    }
  }
}

function getPortfolioRequestSuccess(portfolio) {
  return {
    type: ACTIONS.GET_PORTFOLIO_SUCCESS,
    callName: API.GET_PORTFOLIO,
    payload: portfolio.data,
  }
}

function getEstimatedLoan() {
  return async dispatch => {
    dispatch(startApiCall(API.GET_ESTIMATED_LOAN));

    try {
      const res = await portfolioService.getEstimatedLoan();
      const estimatedLoan = res.data.estimated_loan;
      dispatch(getEstimatedLoanSuccess(estimatedLoan));
    } catch (err) {
      dispatch(showMessage(err.type === 'info' ? 'info' : 'error', err.msg));
      dispatch(apiError(API.GET_ESTIMATED_LOAN, err));
    }
  }
}

function getEstimatedLoanSuccess(estimatedLoan) {
  return {
    type: ACTIONS.GET_ESTIMATED_LOAN_SUCCESS,
    callName: API.GET_ESTIMATED_LOAN,
    estimatedLoan,
  }
}

function getEstimatedInterest() {
  return async dispatch => {
    dispatch(startApiCall(API.GET_ESTIMATED_INTEREST));

    try {
      const res = await portfolioService.getEstimatedInterest();
      const estimatedInterest = res.data.estimated_interest;
      dispatch(getEstimatedInterestSuccess(estimatedInterest));
    } catch (err) {
      dispatch(showMessage(err.type === 'info' ? 'info' : 'error', err.msg));
      dispatch(apiError(API.GET_ESTIMATED_INTEREST, err));
    }
  }
}

function getEstimatedInterestSuccess(estimatedInterest) {
  return {
    type: ACTIONS.GET_ESTIMATED_INTEREST_SUCCESS,
    callName: API.GET_ESTIMATED_INTEREST,
    estimatedInterest,
  }
}
