import axios from 'axios';
import apiUrl from './api-url';

const apiKeyService = {
  getAll,
  create,
  revoke,
};


function getAll() {
  return axios.get(`${apiUrl}/api_key`);
}

function create(apiKey) {
  return axios.get(`${apiUrl}/api_key`, apiKey);
}

function revoke(keyId) {
  return axios.get(`${apiUrl}/api_key/${keyId}`);
}

export default apiKeyService;
