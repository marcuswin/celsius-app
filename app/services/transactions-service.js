import axios from 'axios';
import apiUrl from './api-url';

const transactionsService = {
  getAll,
};


function getAll(query) {
  return axios.get(`${apiUrl}/transactions`, { params: query });
}

export default transactionsService;
