import axios from 'axios';
import apiUrl from './api-url';

const generalDataService = {
  getSupportedCurrencies,
  getBackendStatus,
};


function getSupportedCurrencies() {
  return axios.get(`${apiUrl}/currencies`);
}

function getBackendStatus() {
  return axios.get(`${apiUrl}/status`);
}

export default generalDataService;
