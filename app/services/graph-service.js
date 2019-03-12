import axios from 'axios';
import apiUrl from './api-url';

const graphService = {
  getTotalWalletBalance,
  getCoinWalletBalance,
  getInterestGraph
};

function getTotalWalletBalance(interval) {
  return axios.get(`${apiUrl}/graphs/wallet/${interval}`);
};

function getCoinWalletBalance(coin, interval) {
  return axios.get(`${apiUrl}/graphs/wallet/${coin}/${interval}`);
};

function getInterestGraph(interval) {
  return axios.get(`${apiUrl}/graphs/interest/${interval}`);
};

export default graphService;
