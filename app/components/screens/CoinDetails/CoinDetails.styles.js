// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    paddingHorizontal: 20
  },
  buttons: {
    position: "absolute",
    right: 0
  },
  coinAmountWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20
  },
  separator: {
    right: 0,
    position: 'absolute'
  }
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const CoinDetailsStyle = () => getThemedStyle(base, themed);

export default CoinDetailsStyle;
