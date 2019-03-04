// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1
  },
  wrapper: {
    borderColor: "rgba(200,200,200,0.3)",
    borderBottomWidth: 1
  }
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const InterestRateInfoTableStyle = () => getThemedStyle(base, themed);

export default InterestRateInfoTableStyle;
