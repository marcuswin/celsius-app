import axios from 'axios';
import apiUrl from './api-url';

const transfersService = {
  getAll,
  get,
  claim,
  create,
};


// status = ['pending', 'returned'] ?
function getAll(status) {
  return axios.get(`${apiUrl}/transfers/${status}`);
}

function get(transferHash) {
  return axios.get(`${apiUrl}/transfer/${transferHash}`);
}

function claim(transferHash) {
  return axios.post(`${apiUrl}/transfer/${transferHash}/claim`);
}

function create(transfer, verification) {
  return axios.put(`${apiUrl}/transfer`, {
    ...transfer,
    ...verification,
  });
}

export default transfersService;
