import axios from 'axios';
import apiUrl from './api-url';

const branchService = {
  create,
  get,
  createEvent,
};


function create(branchLink) {
  return axios.post(`${apiUrl}/branch`, branchLink);
}

function get(id) {
  return axios.get(`${apiUrl}/branch/${id}`);
}

function createEvent(event) {
  return axios.post(`https://api2.branch.io/v1/event`, {
    ...event,
    branch_key: 'key_test_aes8Fgj3UgmHVgoqX8bhXlmpFznNawe2',
  });
}

export default branchService;
