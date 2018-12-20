import axios from 'axios';
import apiUrl from './api-url';

const apiKeyService = {
  getAll,
  create,
  remove,
};


function getAll() {
  return axios.get(`${apiUrl}/api_key`);
}

function create(permissions) {
  return axios.post(`${apiUrl}/api_key`, permissions);
}

function remove(keyId) {
  return axios.delete(`${apiUrl}/api_key/${keyId}`);
}

export default apiKeyService;
