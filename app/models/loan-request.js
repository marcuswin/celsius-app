function LoanRequest (loanRequest) {
  Object.assign(this, loanRequest);

  this.totalCoinValue = this.loan_collaterals.reduce((total, lc) => total + lc.value_usd, 0);
}

export default LoanRequest
