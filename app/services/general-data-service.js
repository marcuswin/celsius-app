import axios from 'axios';
import apiUrl from './api-url';

const generalDataService = {
  getSupportedCurrencies,
};


function getSupportedCurrencies() {
  return axios.get(`${apiUrl}/currencies`);
}

export default generalDataService;
