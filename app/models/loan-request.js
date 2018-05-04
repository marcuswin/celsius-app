function LoanRequest (loanRequest) {
  Object.assign(this, loanRequest);

  if (this.loan_collaterals) this.totalCoinValue = this.loan_collaterals.reduce((total, lc) => total + lc.value_usd, 0);
}

export default LoanRequest
