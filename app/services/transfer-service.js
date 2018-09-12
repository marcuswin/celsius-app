import axios from 'axios';
import apiUrl from './api-url';

const transfersService = {
  getAll,
  get,
  claim,
  create,
};


function getAll() {
  return axios.get(`${apiUrl}/transfer`);
}

function get(transferId) {
  return axios.get(`${apiUrl}/transfer/${transferId}`);
}

function claim(transferId) {
  return axios.post(`${apiUrl}/transfer/${transferId}/claim`);
}

function create(transfer) {
  return axios.post(`${apiUrl}/transfer/`, { transfer });
}

export default transfersService;
