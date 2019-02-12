// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    marginBottom: 10,
  },
  switchWrapper: {
    position: 'absolute',
    right: 0,
    height: '100%',
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
