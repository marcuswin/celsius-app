import { LOAN_STATUS } from "../constants/DATA";
import STYLES from "../constants/STYLES";

export {
  getLoanStatusDetails
}


function getLoanStatusDetails(status) {
  switch (status) {
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
