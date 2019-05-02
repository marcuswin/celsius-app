import { Platform } from 'react-native';
import STYLES from '../../../constants/STYLES'
import { getThemedStyle } from '../../../utils/styles-util'

const base = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 18,
    // paddingVertical: 15,
    borderRadius: 8,
    marginVertical: 20,
    height: 50,
    ...Platform.select({
      android: {
        borderColor: STYLES.COLORS.MEDIUM_GRAY1,
        borderTopWidth: 0.2,
        borderLeftWidth: 0.2,
        borderRightWidth: 0.5,
        borderBottomWidth: 2,
      },
      ios: {
        ...STYLES.SHADOW_STYLES,
      }
    })
  }
}

const themed = {
  light: {
    container: {
      backgroundColor: STYLES.COLORS.WHITE
    }
  },

  dark: {},

  celsius: {}
}

const IconButtonStyle = () => getThemedStyle(base, themed)

export default IconButtonStyle
