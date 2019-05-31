// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  switchButton: {
    zIndex: 1,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: 10,
    backgroundColor: "white",
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  icon: {
    backgroundColor: "white",
    opacity: 0.7,
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const CoinSwitchStyle = () => getThemedStyle(base, themed);

export default CoinSwitchStyle;
