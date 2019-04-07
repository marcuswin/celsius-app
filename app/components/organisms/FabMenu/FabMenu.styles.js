import { getThemedStyle } from '../../../utils/styles-util';

const base = {
  container: {
  },
  menuContainer: {
    justifyContent: 'center',
  },
  menuItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  background: {
    opacity: 0.95,
    backgroundColor: 'white'
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

const FabMenuStyle = () => getThemedStyle(base, themed);

export default FabMenuStyle
