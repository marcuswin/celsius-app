import { Platform } from 'react-native';
import { getThemedStyle } from '../../../utils/styles-util'
import STYLES from '../../../constants/STYLES'

const base = {
  container: {
    borderRadius: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    ...Platform.select({
      android: {
          shadowOffset: { width: 0, height: 3 },
          borderColor: '#E9E9E9',
          borderRadius: 30,
          borderTopWidth: 0.2,
          borderLeftWidth: 0.2,
          borderRightWidth: 0.5,
          borderBottomWidth: 4,
      },
      ios: {
          ...STYLES.SHADOW_STYLES,
      }
  })
  },
  view: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: STYLES.COLORS.DARK_GRAY,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    zIndex: -1,
    
  },
  text: {
    marginTop: 10
  }
}

const themed = {
  light: {
    viewmenu: {
      backgroundColor: STYLES.COLORS.WHITE
    },
    textmenu: {
      color: STYLES.COLORS.DARK_GRAY
    },
    viewcoin: {
      backgroundColor: STYLES.COLORS.WHITE
    },
    textcoin: {
      color: STYLES.COLORS.DARK_GRAY
    },
    fillColor: {
      color: STYLES.COLORS.DARK_GRAY
    }
  },

  dark: {
    viewmenu: {
      backgroundColor: STYLES.COLORS.DARK_HEADER
    },
    textmenu: {
      color: STYLES.COLORS.WHITE
    },
    viewcoin: {
      backgroundColor: STYLES.COLORS.DARK_HEADER
    },
    textcoin: {
      color: STYLES.COLORS.WHITE
    },
    fillColor: {
      color: STYLES.COLORS.WHITE_OPACITY5
    }
  },

  celsius: {
    viewmenu: {
      backgroundColor: STYLES.COLORS.CELSIUS
    },
    textmenu: {
      color: STYLES.COLORS.WHITE
    },
    viewcoin: {
      backgroundColor: STYLES.COLORS.CELSIUS
    },
    textcoin: {
      color: STYLES.COLORS.WHITE
    },
    fillColor: {
      color: STYLES.COLORS.WHITE
    }
  }
}

const CircleButtonStyle = theme =>
  theme ? getThemedStyle(base, themed, theme) : getThemedStyle(base, themed)

export default CircleButtonStyle
