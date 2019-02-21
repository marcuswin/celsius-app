import axios from 'axios';
import apiUrl from './api-url';

const transactionsService = {
  getAll,
  getTransaction
};


function getAll(query) {
  return axios.get(`${apiUrl}/transactions`, { params: query });
}

function getTransaction(transactionId) {
  return axios.get(`${apiUrl}/wallet/transactions/${transactionId}`);
}

export default transactionsService;
