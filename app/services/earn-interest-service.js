import axios from 'axios';
import apiUrl from './api-url';

const earnInterestService = {
  create,
  accept
};

function create() {
  return axios.post(`${apiUrl}/earn_interest`);
}

function accept() {
  return axios.post(`${apiUrl}/earn_interest/accept`);
}

export default earnInterestService;
