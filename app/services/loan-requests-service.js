import axios from 'axios';
import apiUrl from './api-url';

const loanRequestsService = {
  get,
  create,
  accept,
  cancel,
  getSupportedCurrencies,
  getLoanDetails,
  createLoanDetails,
  status
};

function get() {
  return axios.get(`${apiUrl}/loan_requests`);
}

function create(loanCollaterals) {
  return axios.post(`${apiUrl}/loan_requests`, {
    loan_collaterals: loanCollaterals,
  })
}

function accept() {
  return axios.put(`${apiUrl}/loan_requests/accept`);
}

function status() {
  return axios.get(`${apiUrl}/loan_requests/status`);
}

function cancel() {
  return axios.put(`${apiUrl}/loan_requests/cancel`);
}

function getSupportedCurrencies() {
  return axios.get(`${apiUrl}/loan_requests/supported_currencies`);
}

function getLoanDetails() {
  return axios.get(`${apiUrl}/loan_requests/loan_info`)
}

function createLoanDetails(loanDetails) {
  return axios.post(`${apiUrl}/loan_requests/loan_info`, {
    public_wallet_address: loanDetails.publicWalletAddress,
    ssn: loanDetails.socialSecurityNumber,
    source_of_funds: loanDetails.sourceOfFunds,
    loan_purpose: loanDetails.purposeOfLoan,
    note: loanDetails.note,
    bank_name: loanDetails.name,
    bank_routing_number: loanDetails.routingNumber,
    bank_account_number: loanDetails.accountNumber,
  })
}

export default loanRequestsService;
