// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  container: {
    flex: 1
  },
  coinPicking: {
    width: 100,
    alignSelf: 'center'
  },
  circleButton: {
    marginBottom: 5,
    marginTop: 20
  },
  iconStyle: {
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row'
  }
};

const themed = {
  light: {
    iconColor: {
      color: STYLES.COLORS.DARK_GRAY_OPACITY
    }
  },

  dark: {
    iconColor: {
      color: STYLES.COLORS.WHITE_OPACITY3
    }
  },

  celsius: {
    iconColor: {
      color: STYLES.COLORS.DARK_GRAY_OPACITY
    }
  }
};

const CoinPickerStyle = () => getThemedStyle(base, themed);

export default CoinPickerStyle;
