import axios from 'axios';
import apiUrl from './api-url';

const currenciesService = {
  getRates,
  getGraphs,
};


function getRates() {
  return axios.get(`${apiUrl}/currencies/rates`);
}

function getGraphs() {
  return axios.get(`${apiUrl}/currencies/graphs`);
}

export default currenciesService;
