import { LOAN_STATUS, LOAN_TYPES } from "../constants/DATA";
import STYLES from "../constants/STYLES";

const loanUtil = {
  mapLoan,
}

function mapLoan(loan) {
  const newLoan = { ...loan }
  newLoan.type = getLoanType(loan)
  newLoan.uiProps = getLoanStatusDetails(loan)

  return newLoan
}

function getLoanType() {
  // TODO
  return LOAN_TYPES.LOAN_REJECTED;
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
        displayText: "Loan payout",
        collateral: "Unlocked Collateral:"
      };

    case LOAN_STATUS.REJECTED:
      return {
        color: STYLES.COLORS.RED,
        displayText: "Loan rejected",
        collateral: "Estimated Collateral:"
      };

      // case canceled

    default:
      return {
        color: STYLES.COLORS.CELSIUS_BLUE,
        displayText: "Loan active"
      };
  }
};

export default loanUtil
