// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
  container: {
    flex: 1
  },
  buttonsWrapper: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12
  },
  buttonIconText: {
    flexDirection: 'row',
    justifyContent: "space-around",
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

const BorrowLandingStyle = () => getThemedStyle(base, themed);

export default BorrowLandingStyle
