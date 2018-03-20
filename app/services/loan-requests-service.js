import axios from 'axios';
import apiUrl from './api-url';

const loanRequestsService = {
  create,
  accept,
  getSupportedCurrencies,
};

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

export default loanRequestsService;
