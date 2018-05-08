import ACTIONS from '../../config/constants/ACTIONS';
import API from '../../config/constants/API';
import {startApiCall, apiError} from '../api/apiActions';
import {showMessage} from '../ui/uiActions';
import portfolioRequestService from '../../services/portfolio-requests-service';

export {
  getPortfolio,
  updatePortfolio,
}

function updatePortfolio(data) {
  return async dispatch => {
    dispatch(startApiCall(API.CREATE_PORTFOLIO_REQUEST));

    try {
      const res = await portfolioRequestService.update(data);
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
      const res = await portfolioRequestService.get();
      const portfolio = res.data;
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
