import ACTIONS from '../../config/constants/ACTIONS';
import API from '../../config/constants/API';
import {startApiCall, apiError} from './api';
import {showMessage} from './ui';
import loanRequestsService from '../../services/loan-requests-service';

export {
  getLoanRequest,
  createLoanRequest,
  getSupportedCurrencies,
  acceptLoanRequest,
  createLoanRequestInfo,
}

function createLoanRequest(collateralInfo) {
  return async dispatch => {
    dispatch(startApiCall(API.CREATE_LOAN_REQUEST));

    try {
      const res = await loanRequestsService.create(collateralInfo);
      const loanRequest = res.data.loan_request;
      const competitionRates = res.data.competition_rates;
      dispatch(createLoanRequestSuccess(loanRequest, competitionRates));

    } catch (err) {
      dispatch(showMessage(err.type === 'info' ? 'info' : 'error', err.msg));
      dispatch(apiError(API.CREATE_LOAN_REQUEST, err));
    }
  }
}

function createLoanRequestSuccess(loanRequest, competitionRates) {
  return {
    type: ACTIONS.CREATE_LOAN_REQUEST_SUCCESS,
    loanRequest,
    competitionRates,
    callName: API.CREATE_LOAN_REQUEST,
  }
}

function getLoanRequest() {
  return async dispatch => {
    dispatch(startApiCall(API.GET_LOAN_REQUEST));

    try {
      const res = await loanRequestsService.get();
      const loanRequest = res.data.loan_request;
      const competitionRates = res.data.competition_rates;
      dispatch(getLoanRequestSuccess(loanRequest, competitionRates));
    } catch (err) {
      dispatch(showMessage(err.type === 'info' ? 'info' : 'error', err.msg));
      dispatch(apiError(API.GET_LOAN_REQUEST, err));
    }
  }
}

function getLoanRequestSuccess(loanRequest, competitionRates) {
  return {
    type: ACTIONS.GET_LOAN_REQUEST_SUCCESS,
    callName: API.GET_LOAN_REQUEST,
    loanRequest,
    competitionRates,
  }
}

function getSupportedCurrencies() {
  return async dispatch => {
    dispatch(startApiCall(API.GET_SUPPORTED_CURRENCIES));

    try {
      const res = await loanRequestsService.getSupportedCurrencies();
      const supportedCurrencies = res.data.supported_currencies;
      dispatch(getSupportedCurrenciesSuccess(supportedCurrencies));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_SUPPORTED_CURRENCIES, err));
    }
  }
}

function getSupportedCurrenciesSuccess(supportedCurrencies) {
  return {
    type: ACTIONS.GET_SUPPORTED_CURRENCIES_SUCCESS,
    supportedCurrencies,
    callName: API.GET_SUPPORTED_CURRENCIES,
  }
}

function acceptLoanRequest(id) {
  return async dispatch => {
    dispatch(startApiCall(API.ACCEPT_LOAN_REQUEST));

    try {
      const res = await loanRequestsService.accept(id);
      const loanRequest = res.data.loan_request;
      loanRequest.order = res.data.order;

      dispatch(acceptLoanRequestSuccess(loanRequest));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.ACCEPT_LOAN_REQUEST, err));
    }
  }
}

function acceptLoanRequestSuccess(loanRequest) {
  return {
    type: ACTIONS.ACCEPT_LOAN_REQUEST_SUCCESS,
    loanRequest,
    callName: API.ACCEPT_LOAN_REQUEST,
  }
}

function createLoanRequestInfo(id, loanRequestInfo) {
  return async dispatch => {
    dispatch(startApiCall(API.CREATE_LOAN_REQUEST_INFO));

    try {
      const res = await loanRequestsService.createLoanInfo(id, loanRequestInfo);
      const loanRequest = res.data.loan_request;

      dispatch(createLoanRequestInfoSuccess(loanRequest));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.CREATE_LOAN_REQUEST_INFO, err));
    }
  }
}

function createLoanRequestInfoSuccess(loanRequest) {
  return {
    type: ACTIONS.CREATE_LOAN_REQUEST_INFO_SUCCESS,
    callName: API.CREATE_LOAN_REQUEST_INFO,
    loanRequest,
  }
}

