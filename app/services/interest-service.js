import axios from 'axios';
import apiUrl from './api-url';

const interestService = {
  getInterestRates,
  getInterestChartData
};


function getInterestRates() {
  return axios.get(`${apiUrl}/interest/rates`);
}

function getInterestChartData(interval) {
  return axios.get(`${apiUrl}/interest/graph/${interval}`);
}

export default interestService;
