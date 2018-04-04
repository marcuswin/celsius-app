import axios from 'axios';
import apiUrl from './api-url';

const loanRequestsService = {
  get,
  create,
  accept,
  cancel,
  getSupportedCurrencies,
  createLoanInfo,
};

function get() {
  return axios.get(`${apiUrl}/loan_requests`);
}

function create(loanCollaterals) {
  return axios.post(`${apiUrl}/loan_requests`, {
    loan_collaterals: loanCollaterals,
  })
}

function accept(id) {
  return axios.put(`${apiUrl}/loan_requests/${id}/accept`);
}

function cancel() {
  return axios.put(`${apiUrl}/loan_requests/cancel`);
}

function getSupportedCurrencies() {
  return axios.get(`${apiUrl}/loan_requests/supported_currencies`);
}

function createLoanInfo(loanInfo) {
  return axios.post(`${apiUrl}/loan_requests/loan_info`, {
    loan_purpose: loanInfo.purposeOfLoan,
    note: loanInfo.note,
  })
}

export default loanRequestsService;
