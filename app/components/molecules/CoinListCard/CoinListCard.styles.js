// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1
  },
  coinImage: {
    width: 40,
    height: 40,
    marginRight: 12
  },
  cardInnerView: {
    flexDirection: "row",
    marginHorizontal: 12
  },
  wrapper: {
    width: "100%"
  },
  coinTextWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%"
  }
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const CoinListCardStyle = () => getThemedStyle(base, themed);

export default CoinListCardStyle;
