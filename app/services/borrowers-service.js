import axios from 'axios';
import apiUrl from './api-url';

const borrowersService = {
  login,
};

function login({ email, password }) {
  return axios.post(`${apiUrl}/borrowers/login`, {
    email,
    password,
  });
}

export default borrowersService;
