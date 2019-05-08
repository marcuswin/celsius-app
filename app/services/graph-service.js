import axios from 'axios';
import apiUrl from './api-url';

const graphService = {
  getTotalWalletBalance,
  getCoinWalletBalance,
  getInterestGraph,
  getCoinInterestGraph
};

function getTotalWalletBalance(interval) {
  return axios.get(`${apiUrl}/graphs/wallet/${interval}`);
}

function getCoinWalletBalance(coin, interval) {
  return axios.get(`${apiUrl}/graphs/wallet/${coin}/${interval}`);
}

function getInterestGraph(interval) {
  return axios.get(`${apiUrl}/graphs/interest/${interval}`);
}

function getCoinInterestGraph(coin, interval) {
  return axios.get(`${apiUrl}/graphs/interest/${coin}/${interval}`);
}

export default graphService;
