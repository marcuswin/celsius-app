// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    marginBottom: 10,
  },
  switchButton: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  }
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const CoinSwitchStyle = () => getThemedStyle(base, themed);

export default CoinSwitchStyle;
