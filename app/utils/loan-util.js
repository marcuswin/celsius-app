import { LOAN_STATUS } from "../constants/DATA";
import STYLES from "../constants/STYLES";

const loanUtil = {
  mapLoan,
};

function mapLoan(loan) {
  const newLoan = { ...loan };
  newLoan.type = getLoanType(loan);
  newLoan.uiProps = getLoanStatusDetails(loan);
  newLoan.uiSections = getLoanSections(loan);

  return newLoan
}

// TODO check if needed in later iterations
function getLoanType(loan) {
  // TODO type is ie. USD_LOAN
  return loan.type;

}

function getLoanStatusDetails(loan) {
  switch (loan.status) {
    case LOAN_STATUS.ACTIVE:
    case LOAN_STATUS.APPROVED:
      return {
        color: STYLES.COLORS.CELSIUS_BLUE,
        displayText: "Loan active",
        collateral: "Collateral:"
      };

    case LOAN_STATUS.PENDING:
      return {
        color: STYLES.COLORS.ORANGE,
        displayText: "Loan pending",
        collateral: "Estimated Collateral:"
      };

    case LOAN_STATUS.COMPLETED:
      return {
        color: STYLES.COLORS.GREEN,
        displayText: "Completed Loan",
        collateral: "Unlocked Collateral:"
      };

    case LOAN_STATUS.REJECTED:
      return {
        color: STYLES.COLORS.RED,
        displayText: "Loan rejected",
        collateral: "Estimated Collateral:"
      };

    case LOAN_STATUS.CANCELED:
      return {
        color: STYLES.COLORS.RED,
        displayText: "Loan canceled",
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

export default loanUtil
