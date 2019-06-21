import axios from 'axios';
import apiUrl from './api-url';

const walletService = {
  getWalletDetails, // TODO remove
  getWalletSummary,
  getCoinAddress,
  getCoinOriginatingAddress, // TODO remove
  setCoinWithdrawalAddress,
  getCoinTransactions, // TODO remove
  getCoinGraphData, // TODO remove
  withdrawCrypto,
  getAllCoinWithdrawalAddresses,
};


/**
 * Gets details for users wallet
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#e40ee949-4cf6-4ecb-9fc7-3c202a539612
 * @deprecated: use getWalletSummary
 *
 * @return {Promise}
 */
function getWalletDetails() {
  return axios.get(`${apiUrl}/wallet`);
}


/**
 * Gets wallet summary and details for user
 * @see https://documenter.getpostman.com/view/4207695/S11RLvpb#37ed8a13-9d0e-49b1-b341-cbdba6f3094d
 *
 * @return {Promise}
 */
function getWalletSummary() {
  return axios.get(`${apiUrl}/wallet/summary`);
}


/**
 * Gets deposit address for coin for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#16084590-d24a-4beb-b704-4b2397650d7b
 *
 * @param {string} coin - eg. eth|ETH
 * @return {Promise}
 */
function getCoinAddress(coin) {
  return axios.get(`${apiUrl}/wallet/${coin.toLowerCase()}/address`);
}


/**
 * Gets originating/withdrawal address for coin for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#ee2461cf-cd62-4597-b822-8213d77acaee
 *
 * @param {string} coin - eg. eth|ETH
 * @return {Promise}
 */
function getCoinOriginatingAddress(coin) {
  return axios.get(`${apiUrl}/wallet/${coin.toLowerCase()}/withdrawal_address`);
}

/**
 * Sets originating/withdrawal address for coin for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#f7098f6c-8c42-4d84-96ca-22da8eeaa6eb
 *
 * @param {string} address - scanned or entered wallet address
 * @param {string} coin - eg. eth|ETH
 * @param {string} verification.pin - eg '1234'
 * @param {string} verification.twoFactorCode - eg '123456'

 * @return {Promise}
 */
function setCoinWithdrawalAddress(coin, address, verification) {
  return axios.post(`${apiUrl}/wallet/${coin.toLowerCase()}/withdrawal_address`, {
    address,
    ...verification
  });
}


/**
 * Get all transactions for a coin
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#a3d51752-fbb7-4857-8dd9-b21790b154e4
 * @deprecated: user transactionsService.getAll(query)
 *
 * @param {string} coin - eg. eth|ETH
 * @return {Promise}
 */
function getCoinTransactions(coin) {
  return axios.get(`${apiUrl}/wallet/${coin.toLowerCase()}/transactions`);
}


/**
 * Gets coin graph data
 * @deprecated
 *
 * @return {Promise}
 */
function getCoinGraphData(coin, time = '7d') {
  return axios.get(`${apiUrl}/wallet/${coin.toLowerCase()}/graph/${time}`);
}


/**
 * Withdraws crypto for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#2a5b14c9-f0a9-41b6-9c2f-a7195ec7022a
 *
 * @param {string} coin - eg. eth|ETH
 * @param {string} amount
 * @param {Object} verification
 * @param {string} verification.pin - eg '1234'
 * @param {string} verification.twoFactorCode - eg '123456'
 * @return {Promise}
 */
function withdrawCrypto(coin, amount, verification) {
  return axios.post(`${apiUrl}/wallet/${coin.toLowerCase()}/withdraw`, { amount, ...verification });
}

export default walletService;

/**
 *  Get all coin withdrawal adresses
 * @return {Promise}
 */
function getAllCoinWithdrawalAddresses () {
  return axios.get(`${apiUrl}/wallet/withdrawal_addresses`);
}
