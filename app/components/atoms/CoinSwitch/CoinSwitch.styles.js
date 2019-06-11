// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util'
import STYLES from '../../../constants/STYLES'

const base = {
  container: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  switchButton: {
    zIndex: 1,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: 10,
    height: 40,
    width: 40,
    borderRadius: 20
  }
}

const themed = {
  light: {
    switchButton: {
      backgroundColor: STYLES.COLORS.WHITE
    }
  },

  dark: {
    switchButton: {
      backgroundColor: STYLES.COLORS.DARK_HEADER
    }
  },

  celsius: {
    switchButton: {
      backgroundColor: STYLES.COLORS.WHITE
    }
  }
}

const CoinSwitchStyle = () => getThemedStyle(base, themed)

export default CoinSwitchStyle
