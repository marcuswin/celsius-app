import axios from 'axios';
import apiUrl from './api-url';

const interestService = {
  getInterestRates,
  getInterestChartData
};


/**
 * Gets interest rates for all supported currencies
 * @deprecated: moved to getCelsiusInitialData
 *
 * @returns {Promise}
 */
function getInterestRates() {
  return axios.get(`${apiUrl}/interest/rates`);
}


/**
 * Gets graphs for interest
 * @deprecated: moved to graphService
 *
 * @returns {Promise}
 */
function getInterestChartData(interval) {
  return axios.get(`${apiUrl}/interest/graph/${interval}`);
}

export default interestService;
