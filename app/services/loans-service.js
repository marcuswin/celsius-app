import axios from 'axios';
import apiUrl from './api-url';

const loansService = {
  apply,
  getAllLoans,
  cancelLoan,
  getMarginCalls,
  lockMarginCollateral
};

/**
 * Applies the user for a loan on /loans/apply and takes collateral
 *
 * @param {Object} loanApplication
 * @param {string} loanApplication.coin - eg. ETH
 * @param {number} loanApplication.amount_collateral_usd
 * @param {number} loanApplication.amount_collateral_crypto
 * @param {number} loanApplication.ltv - loan to value, eg. 0.5
 * @param {number} loanApplication.interest - annual interest percentage, eg. 0.05
 * @param {string} loanApplication.loan_amount - amount to borrow in USD
 * @param {number} loanApplication.term_of_loan - in months, eg. 12
 * @param {string} loanApplication.bank_info_id - uuid of users bank_info
 * @param {Object} verification
 * @param {string} verification.pin - eg '1234'
 * @param {string} verification.twoFactorCode - eg '123456'
 *
 * @returns {Promise}
 *
 */
function apply(loanApplication, verification) {
  return axios.post(`${apiUrl}/loans/apply`, {
    ...loanApplication,
    ...verification
  });
}


/**
 * Gets all loans for user from BackOffice db
 *
 * @returns {Promise}
 */
function getAllLoans() {
  return axios.get(`${apiUrl}/loans`);
}

/**
 * Cancels desired pending loan
 *
 * @param {String} id
 * @returns {Promise}
 */
function cancelLoan(id) {
  return axios.put(`${apiUrl}/loans/${id}/cancel`)
}

/**
 * Gets all margin calls
 *
 * @returns {Promise}
 */
function getMarginCalls() {
  return axios.get(`${apiUrl}/loans/margin_calls`)
}

/**
 * Lock margin call collateral
 * 
 * @param {String} marginCallID
 * @param {Object} marginCallData
 * 
 * @returns {Promise}
 */
function lockMarginCollateral(marginCallID, marginCallData) {
  return axios.post(`${apiUrl}/loans/margin_calls/${marginCallID}/lock`, marginCallData)
}

export default loansService;
