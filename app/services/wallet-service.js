import axios from 'axios';
import apiUrl from './api-url';

const walletService = {
  getWalletDetails,
  getCoinAddress,
  getCoinOriginatingAddress,
  getCoinTransactions,
  getCoinGraphData,
  getAllTransactions,
  withdrawCrypto,
  getTransaction,
};

function getWalletDetails() {
  return axios.get(`${apiUrl}/wallet`);
}

function getCoinAddress(coin) {
  return axios.get(`${apiUrl}/wallet/${coin.toLowerCase()}/address`);
}

function getCoinOriginatingAddress(coin) {
  return axios.get(`${apiUrl}/wallet/${coin.toLowerCase()}/originating_address`);
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

function withdrawCrypto(coin, amount, pin) {
  return axios.post(`${apiUrl}/wallet/${coin.toLowerCase()}/withdraw`, { amount: amount.toFixed(5), pin });
}

function getTransaction(transactionId) {
  return axios.get(`${apiUrl}/wallet/transactions/${transactionId}`);
}

export default walletService;
