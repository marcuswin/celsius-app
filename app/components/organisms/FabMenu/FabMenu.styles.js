import { getThemedStyle } from '../../../utils/styles-util'
import STYLES from '../../../constants/STYLES'

const base = {
  container: {},
  fabButton: {
    position: 'absolute',
    bottom: 30,
    right: 20
  },
  menuContainer: {
    justifyContent: 'center'
  },
  opacityCircle: {
    backgroundColor: STYLES.COLORS.CELSIUS,
    width: 60,
    height: 60,
    borderRadius: 30
  },
  menuItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30
  },
  background: {
    opacity: 0.95,
    backgroundColor: 'white'
  }
}

const themed = {
  light: {},

  dark: {},

  celsius: {}
}

const FabMenuStyle = () => getThemedStyle(base, themed)

export default FabMenuStyle
