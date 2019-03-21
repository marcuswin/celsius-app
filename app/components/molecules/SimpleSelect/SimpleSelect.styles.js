// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  inputAndroidContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: 'auto',
    alignItems: 'center',
  },
  inputIOSContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: 'auto',
    alignItems: 'center',
  },
  inputAndroid: {
    fontSize: 26,
    fontFamily: 'barlow-regular'
  },
  inputIOS: {
    fontSize: 26,
    fontFamily: 'barlow-regular',
  },
  iconContainer: {
    position: 'relative',
    marginLeft: 10
  }
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const SimpleSelectStyle = () => getThemedStyle(base, themed);

export default SimpleSelectStyle;
