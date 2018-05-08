import axios from 'axios';
import apiUrl from './api-url';


const portfolioService = {
  get,
  update,
  getSupportedCurrencies,
};


function get() {
  return axios.get(`${apiUrl}/portfolio`);
}


function update(data) {
  return axios.put(`${apiUrl}/portfolio`, {
    data,
  })
}


function getSupportedCurrencies () {
  return axios.get(`${apiUrl}/supported_currencies`)
}


export default portfolioService;