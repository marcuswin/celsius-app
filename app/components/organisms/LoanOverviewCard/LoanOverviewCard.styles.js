// import STYLES from '../../../constants/STYLES';
import { getThemedStyle, widthPercentageToDP } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
    width: widthPercentageToDP("70%")
  },
  buttonContainer: { flexDirection: "row", padding: 12, justifyContent: "space-around" },
  interest: { flexDirection: "row", padding: 12 },
  status: { flexDirection: "row", alignItems: "center" },
  info: { alignItems: "center", padding: 12 }
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const LoanOverviewCardStyle = () => getThemedStyle(base, themed);

export default LoanOverviewCardStyle;

