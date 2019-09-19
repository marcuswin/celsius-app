import axios from 'axios';
import apiUrl from './api-url';
import { mocks } from '../../dev-settings'
import loanUtil from "../utils/loan-util";

const loansService = {
  apply,
  getAllLoans,
  setConfirmLoanInfo,
  cancelLoan,
  getMarginCalls,
  lockMarginCollateral,
  updateLoanSettings,
  loanApplyPreviewData,
  getLoanSettings,
  prepayInterest,
  payPrincipal,
  payMonthlyInterest,
  getAmortizationTable
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
 *
 * @returns {Promise}
 *
 */

function loanApplyPreviewData(loanApplication) {
  return axios.post(`${apiUrl}/loans/apply_preview`, {
    ...loanApplication,
  });
}



/**
 * Gets all loans for user from BackOffice db
 *
 * @returns {Promise}
 */
function setConfirmLoanInfo(loanData) {
  if (mocks.USE_MOCK_LOAN_INFO) {
    return { data: {loan: (require("../mock-data/loans.mock").default.CONFIRM_LOAN)} }
  }
  return axios.post(`${apiUrl}/loans/new-loan-preview`, {
    loanData
  });
}


/**
* Gets confirm loan information
*
* @returns {Promise}
*/
async function getAllLoans () {
  let loans
  if (mocks.USE_MOCK_LOANS) {
     loans = Object.values(require("../mock-data/loans.mock").default.ALL_LOANS)
  } else {
    const res = await axios.get(`${apiUrl}/loans`);
    loans = res.data
  }
  return loans.map(l => loanUtil.mapLoan(l))
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
async function getMarginCalls() {
  let marginCalls
    if(mocks.USE_MOCK_MARGIN_CALLS) {
      marginCalls = require("../mock-data/margincalls.mock").default
    } else {
      const res = await axios.get(`${apiUrl}/loans/margin_calls`)
      marginCalls = res.data
    }

   return marginCalls.map(m => loanUtil.mapMarginCall(m))
}

/**
 * Lock margin call collateral
 *
 * @param {String} marginCallID
 * @param {String} marginCallData.coin
 * @param {String} marginCallData.amount_collateral_usd
 * @param {String} marginCallData.amount_collateral_crypto
 *
 * @returns {Promise}
 */
function lockMarginCollateral(marginCallID, marginCallData) {
  return axios.post(`${apiUrl}/loans/margin_calls/${marginCallID}/lock`, marginCallData)
}

/**
 *
 * Update Loan Settings
 *
 * @param {String} loanId
 * @returns {Promise}
 */
function updateLoanSettings(loanId, value) {
  return axios.put(`${apiUrl}/loans/${loanId}/settings`, value)
}

/**
 *
 * @param {Number}loanId
 * @returns {Promise}
 */
function getLoanSettings(loanId){
  return axios.get(`${apiUrl}/loans/${loanId}/settings`)
}

/**
 * Prepay interest for a loan
 *
 * @param {Number} numberOfInstallments - number of months to prepay
 * @param {String} coin - BTC|XRP
 * @param {UUID} id - id of the loan
 * @returns {Promise}
 */
function prepayInterest(numberOfInstallments, coin, id) {
  return axios.post(`${apiUrl}/loans/${id}/payment/prepayment`, {
    numberOfInstallments,
    coin
  })
}

/**
 * Creates the principal payment for specific loan, and finishes the loan
 *
 * @param {Number} id - loan id
 * @returns {Promise}
 */
function payPrincipal(id) {
  return axios.post(`${apiUrl}/loans/${id}/payment/receiving_principal_back`)
}

/**
 * Creates the monthly interest payment for specific loan
 *
 * @param {Number} id - loan id
 * @returns {Promise}
 */
function payMonthlyInterest(id) {
  return axios.post(`${apiUrl}/loans/${id}/payment/monthly_interest`)
}

/**
 *
 * @param id
 * @returns {Promise}
 */
function getAmortizationTable(id) {
  return axios.get(`${apiUrl}/loans/${id}/amortization-table`)
}

export default loansService;
