// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  selectWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const CelPayEnterAmountStyle = () => getThemedStyle(base, themed);

export default CelPayEnterAmountStyle;
