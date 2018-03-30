import axios from 'axios';
import apiUrl from './api-url';

const loanRequestsService = {
  get,
  create,
  accept,
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

function getSupportedCurrencies() {
  return axios.get(`${apiUrl}/loan_requests/supported_currencies`);
}

function createLoanInfo(loanRequestId, loanInfo) {
  return axios.post(`${apiUrl}/loan_requests/${loanRequestId}/loan_info`, {
    loan_purpose: loanInfo.purposeOfLoan,
    note: loanInfo.note,
  })
}

export default loanRequestsService;
