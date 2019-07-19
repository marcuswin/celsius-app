// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  coinIconWrapper: {
    width: 40,
    position: 'absolute',
    height: '100%',
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  coinTextWrapper: {
    position: 'absolute',
    right: 0,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const BorrowEnterAmountStyle = () => getThemedStyle(base, themed);

export default BorrowEnterAmountStyle;
