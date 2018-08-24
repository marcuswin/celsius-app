import axios from 'axios';
import apiUrl from './api-url';

const interestService = {
  getInterestRates,
};


function getInterestRates() {
  return axios.get(`${apiUrl}/interest/rates`);
}

export default interestService;
