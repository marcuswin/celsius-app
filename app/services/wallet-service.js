// TODO(fj): check responses
// TODO(fj): separate graphs and history

import axios from 'axios';
import apiUrl from './api-url';

const walletService = {
  getWalletDetails,
  getWalletSummary,
  getCoinAddress,
  getCoinOriginatingAddress,
  setCoinWithdrawalAddress,
  getCoinTransactions,
  getCoinGraphData,
  getAllTransactions,
  withdrawCrypto,
  getTransaction,
};

function getWalletDetails() {
  return axios.get(`${apiUrl}/wallet`);
}

function getWalletSummary() {
  return axios.get(`${apiUrl}/wallet/summary`);
}

function getCoinAddress(coin) {
  return axios.get(`${apiUrl}/wallet/${coin.toLowerCase()}/address`);
}

function getCoinOriginatingAddress(coin) {
  return axios.get(`${apiUrl}/wallet/${coin.toLowerCase()}/originating_address`);
}

/**
 * @param {string} coin
 * @param {string} address
 * @returns {AxiosPromise<any>}
 */
function setCoinWithdrawalAddress(coin, address) {
  return axios.post(`${apiUrl}/wallet/${coin.toLowerCase()}/originating_address`, {
    address,
  });
}

function getCoinTransactions(coin) {
  return axios.get(`${apiUrl}/wallet/${coin.toLowerCase()}/transactions`);
}

function getCoinGraphData(coin, time = '7d') {
  return axios.get(`${apiUrl}/wallet/${coin.toLowerCase()}/graph/${time}`);
}

function getAllTransactions() {
  return axios.get(`${apiUrl}/wallet/transactions`);
}

function withdrawCrypto(coin, amount, verification) {
  return axios.post(`${apiUrl}/wallet/${coin.toLowerCase()}/withdraw`, {
    amount: amount.toFixed(5),
    ...verification,
  });
}

function getTransaction(transactionId) {
  return axios.get(`${apiUrl}/wallet/transactions/${transactionId}`);
}

export default walletService;
