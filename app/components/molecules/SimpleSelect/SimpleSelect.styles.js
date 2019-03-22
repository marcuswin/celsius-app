// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util'
import STYLES from '../../../constants/STYLES';

const base = {
  inputAndroidContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: 'auto',
    alignItems: 'center'
  },
  inputIOSContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: 'auto',
    alignItems: 'center'
  },
  inputAndroid: {
    fontSize: 26,
    fontFamily: 'barlow-regular',
    color: STYLES.COLORS.DARK_GRAY
  },
  inputIOS: {
    fontSize: 26,
    fontFamily: 'barlow-regular',
    color: STYLES.COLORS.DARK_GRAY
  },
  iconContainer: {
    position: 'relative',
    marginLeft: 10
  }
}

const themed = {
  light: {},

  dark: {},

  celsius: {}
}

const SimpleSelectStyle = () => getThemedStyle(base, themed)

export default SimpleSelectStyle
