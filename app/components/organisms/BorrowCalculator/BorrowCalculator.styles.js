import STYLES from "../../../constants/STYLES";
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1
  },
  cardStyle: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: STYLES.COLORS.WHITE,
    borderColor: STYLES.COLORS.DARK_GRAY3
  },
  selectedCardStyle: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: STYLES.COLORS.CELSIUS_BLUE,
    borderColor: STYLES.COLORS.CELSIUS_BLUE,
    color: STYLES.COLORS.WHITE
  },
  percentageTextStyle: {
    color: STYLES.COLORS.DARK_GRAY
  },
  selectedTextStyle: {
    color: STYLES.COLORS.WHITE
  },
  ltvWrapper: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  }
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const LoanCalculatorStyle = () => getThemedStyle(base, themed);

export default LoanCalculatorStyle;
