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
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 0.5
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
