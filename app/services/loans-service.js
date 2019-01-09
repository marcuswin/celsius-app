import axios from 'axios';
import apiUrl from './api-url';

const loansService = {
  apply,
  getAllLoans
};

function apply(loanApplication) {
  return axios.post(`${apiUrl}/loans/apply`, loanApplication);
}

function getAllLoans() {
  return axios.get(`${apiUrl}/loans`);
}

export default loansService;
