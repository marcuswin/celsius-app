import axios from 'axios';
import apiUrl from './api-url';

const loansService = {
  apply,
};


function apply(loanApplication) {
  return axios.post(`${apiUrl}/loans/apply`, loanApplication);
}

export default loansService;
