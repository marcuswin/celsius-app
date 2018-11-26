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

function create(apiKey) {
  return axios.post(`${apiUrl}/api_key`, apiKey);
}

function remove(keyId) {
  return axios.delete(`${apiUrl}/api_key`, {
    data: { api_key: keyId },
  });
}

export default apiKeyService;
