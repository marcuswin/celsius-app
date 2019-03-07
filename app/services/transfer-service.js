import axios from 'axios';
import apiUrl from './api-url';

const transfersService = {
  getAll,
  get,
  claim,
  cancel,
  create
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

function cancel(transferHash) {
  return axios.post(`${apiUrl}/transfer/${transferHash}/cancel`);
}

/**
 * Creates a CelPay transfer and link on /transfer
 *
 * @param {Object} transfer
 * @param {string} transfer.amount
 * @param {string} transfer.coin - eg. ETH
 * @param {string} transfer.friend_id - uuid
 * @param {string} transfer.message
 * @param {Object} verification
 * @param {string} verification.pin - eg '1234'
 * @param {string} verification.twoFactorCode - eg '123456'
 *
 * @returns {Promise}
 *
 */
function create(transfer, verification) {
  return axios.post(`${apiUrl}/transfer`, {
    ...transfer,
    ...verification,
  });
}

export default transfersService;
