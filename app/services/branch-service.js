import axios from 'axios';
import apiUrl from './api-url';

const branchService = {
  create,
  get,
};


function create(branchLink) {
  return axios.post(`${apiUrl}/branch`, branchLink);
}

function get(id) {
  return axios.get(`${apiUrl}/branch/${id}`);
}

export default branchService;
