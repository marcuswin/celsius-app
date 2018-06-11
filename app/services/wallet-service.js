import axios from 'axios';
import apiUrl from './api-url';

const walletService = {
  getWalletDetails,
  getCoinBalance,
  getCoinAddress,
  getCoinTransactions,
  getCoinGraphData,
  getAllTransactions,
  withdrawCrypto,
  getTransaction,
};

function getWalletDetails() {
  return axios.get(`${apiUrl}/wallet`);
}

function getCoinBalance(coin) {
  return axios.get(`${apiUrl}/wallet/${coin.toLowerCase()}/balance`);
}

function getCoinAddress(coin) {
  return axios.get(`${apiUrl}/wallet/${coin.toLowerCase()}/address`);
}

function getCoinTransactions(coin) {
  return axios.get(`${apiUrl}/wallet/${coin.toLowerCase()}/transactions`);
}

function getCoinGraphData(coin, time = '7d') {
  return axios.get(`${apiUrl}/wallet/${coin.toLowerCase()}/graph/${time}`);
}

function getAllTransactions() {
  return axios.get(`${apiUrl}/transactions`);
}

function withdrawCrypto(coin, amount) {
  return axios.post(`${apiUrl}/wallet/${coin.toLowerCase()}/withdraw`, { amount });
}

function getTransaction(transactionId) {
  return axios.get(`${apiUrl}/wallet/transactions/${transactionId}`);
}

export default walletService;
