import { LOAN_PAYMENT_TYPES, LOAN_STATUS, LOAN_TYPES } from "../constants/DATA";
import STYLES from "../constants/STYLES";
import formatter from "./formatter";
import store from "../redux/store";

const loanUtil = {
  mapLoan,
  mapMarginCall
};

function mapMarginCall(marginCall) {
  if (!marginCall) return

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

  // NOTE should probably be removed or updated once BE is done
  newLoan.total_interest = newLoan.id && getTotalInterest(loan);
  newLoan.total_interest_paid = newLoan.id && getInterestPaid(loan);
  newLoan.hasInterestPaymentFinished = newLoan.id && isInterestPaid(newLoan)

  newLoan.hasInterestPaymentStarted = Number(newLoan.total_interest_paid) !== 0
  newLoan.margin_call = mapMarginCall(newLoan.margin_call)
  // newLoan.canPrepayInterest = newLoan.max_possible_prepayment_period && newLoan.max_possible_prepayment_period >= 6
  newLoan.canPrepayInterest = true
  newLoan.max_possible_prepayment_period = 8

  // console.log({ newLoan })

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
      return ["cancellation:date", "initiation:date", "term", "annualInterest"];
    case LOAN_STATUS.REJECTED:
      return ["rejection:date", "initiation:date", "term", "annualInterest"];
    default:
      break;
  }
}

function flagPaidPayments(loan) {
  if (!loan.amortization_table || !loan.amortization_table.length) return []

  const amortizationTable = loan.amortization_table.map(p => ({
    ...p,
    isPaid: Number(p.amountToPay) === Number(p.amountPaid),
  }))

  return amortizationTable
}

function isInterestPaid(loan) {
  let areAllPaymentsMade = true
  loan.amortization_table
    .filter(row => row.type === LOAN_PAYMENT_TYPES.MONTHLY_INTEREST)
    .forEach(row => {
      areAllPaymentsMade = areAllPaymentsMade && row.isPaid
    })

  return areAllPaymentsMade
}

function getTotalInterest(loan) {
  let totalInterest = 0
  loan.amortization_table
    .filter(row => row.type === LOAN_PAYMENT_TYPES.MONTHLY_INTEREST)
    .forEach(row => {
      totalInterest += Number(row.amountToPay)
    })

  return totalInterest.toFixed(2)
}


function getInterestPaid(loan) {
  let interestPaid = 0
  loan.amortization_table
    .filter(row => row.type === LOAN_PAYMENT_TYPES.MONTHLY_INTEREST)
    .forEach(row => {
      interestPaid += Number(row.amountPaid)
    })

  return interestPaid.toFixed(2)
}

export default loanUtil
