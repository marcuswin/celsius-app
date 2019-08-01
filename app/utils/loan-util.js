import { LOAN_STATUS, LOAN_TYPES } from "../constants/DATA";
import STYLES from "../constants/STYLES";
import formatter from "./formatter";
import store from "../redux/store";

const loanUtil = {
  mapLoan,
  mapMarginCall
};

function mapMarginCall(marginCall) {
  const newMarginCall = { ...marginCall }
  newMarginCall.allCoins = {}
  const walletSummary = store.getState().wallet.summary
  const  currenciesRates = store.getState().currencies.rates
  walletSummary.coins.forEach(coin => {
    const currenciesRateForCoin = currenciesRates.find((currenciesRate) => currenciesRate.short === coin.short).market_quotes_usd.price
    newMarginCall.allCoins[coin.short] = marginCall.margin_call_usd_amount / currenciesRateForCoin
  })
  return newMarginCall;
}

function mapLoan(loan) {
  const newLoan = { ...loan };
  newLoan.uiProps = getLoanStatusDetails(loan);
  newLoan.uiSections = getLoanSections(loan);
  newLoan.amortization_table = flagPaidPayments(loan);

  newLoan.hasInterestPaymentStarted = Number(newLoan.total_interest_paid) !== 0
  newLoan.hasInterestPaymentFinished = Number(newLoan.total_interest_paid) === Number(newLoan.total_interest)

  return newLoan
}

function getLoanStatusDetails(loan) {
  const commonProps = {
    displayAmount: loan.type === LOAN_TYPES.USD_LOAN
      ? formatter.usd(loan.loan_amount)
      : formatter.crypto(loan.loan_amount, loan.coin_loan_asset, { noPrecision: true })
  }

  switch (loan.status) {
    case LOAN_STATUS.ACTIVE:
    case LOAN_STATUS.APPROVED:
      return {
        ...commonProps,
        color: STYLES.COLORS.CELSIUS_BLUE,
        displayText: "Active Loan",
        collateral: "Collateral:"
      };

    case LOAN_STATUS.PENDING:
      return {
        ...commonProps,
        color: STYLES.COLORS.ORANGE,
        displayText: "Pending Loan",
        collateral: "Estimated Collateral:"
      };

    case LOAN_STATUS.COMPLETED:
      return {
        ...commonProps,
        color: STYLES.COLORS.GREEN,
        displayText: "Completed Loan",
        collateral: "Unlocked Collateral:"
      };

    case LOAN_STATUS.REJECTED:
      return {
        ...commonProps,
        color: STYLES.COLORS.RED,
        displayText: "Loan rejected",
        collateral: "Estimated Collateral:"
      };

    case LOAN_STATUS.CANCELED:
      return {
        ...commonProps,
        color: STYLES.COLORS.RED,
        displayText: "Canceled Loan",
        collateral: "Estimated Collateral:"
      };

    default:
      break;
  }
};

function getLoanSections(loan) {
  switch(loan.status) {
    case LOAN_STATUS.ACTIVE:
    case LOAN_STATUS.APPROVED:
      return ["initiation:date", "collateral", "term", "annualInterest", "marginCall", "liquidation", "nextInterest", "maturity"];
    case LOAN_STATUS.PENDING:
      return ["initiation:date", "estimated:collateral", "term", "annualInterest", "marginCall", "liquidation", "firstInterest", "maturity"];
    case LOAN_STATUS.COMPLETED:
      return ["completion:date", "initiation:date", "unlocked:collateral", "term", "annualInterest"];
    case LOAN_STATUS.CANCELED:
      return ["cancellation:date", "initiation:date", "estimated:collateral", "term", "annualInterest"];
    case LOAN_STATUS.REJECTED:
      return ["rejection:date", "initiation:date", "estimated:collateral", "term", "annualInterest"];
    default:
      break;
  }
}

function flagPaidPayments(loan) {
  const amortizationTable = loan.amortization_table.map(p => ({
    ...p,
    isPaid: Number(p.amountToPay) === Number(p.amountPaid),
  }))

  return amortizationTable
}

export default loanUtil
