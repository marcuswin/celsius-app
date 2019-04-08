// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1
  },
  wrapper: {
    paddingHorizontal: 30,
  },
  selectWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  amounts: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center'
  }
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const CelPayEnterAmountStyle = () => getThemedStyle(base, themed);

export default CelPayEnterAmountStyle;
