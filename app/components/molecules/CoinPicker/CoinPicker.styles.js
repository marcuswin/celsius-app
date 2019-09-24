// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  container: {
    flex: 1
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
