import axios from 'axios';
import apiUrl from './api-url';

const borrowersService = {
  login,
  getLoggedIn,
  register,
  registerExisting,
};

function login({ email, password }) {
  return axios.post(`${apiUrl}/borrowers/login`, {
    email,
    password,
  });
}

function getLoggedIn() {
  return axios.get(`${apiUrl}/me?_=${ new Date().getTime() }`);
}

function register({ email, password, firstName, lastName }) {
  return axios.post(`${apiUrl}/borrowers/register`, {
    email,
    password,
    first_name: firstName,
    last_name: lastName,
    // TODO: remove these fields from backend
    eth_wallet_address: '0xe',
    phone: 1234567890,
  });
}

function registerExisting({ firstName, lastName }) {
  return axios.post(`${apiUrl}/borrowers/register_existing`, {
    // TODO: add these fields to endpoint
    first_name: firstName,
    last_name: lastName,
    // TODO: remove these fields from endpoint
    eth_wallet_address: '0xe',
    phone: 1234567890,
  });
}

export default borrowersService;
