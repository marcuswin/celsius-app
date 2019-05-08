// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';
import STYLES from '../../../constants/STYLES'

const base = {
    container: {
        flex: 1
    },
  secretText: {
    color: STYLES.COLORS.CELSIUS,
    textDecorationLine: 'underline',
    marginTop: 15,
    maxWidth: '70%'
  }
}

const themed = {
    light: {
    },

    dark: {
    },

    celsius: {
    }
}

const TwoFactorSettingsStyle = () => getThemedStyle(base, themed);

export default TwoFactorSettingsStyle
