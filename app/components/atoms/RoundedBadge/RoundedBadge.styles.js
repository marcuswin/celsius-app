import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    borderRadius: 15,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 1
  }
};

const themed = {
  light: {
    container: {
      borderColor: STYLES.COLORS.DARK_GRAY_OPACITY
    }
  },

  dark: {
    container: {
      borderColor: STYLES.COLORS.WHITE_OPACITY5      
    }
  },

  celsius: {}
};

const RoundedBadgeStyle = () => getThemedStyle(base, themed);

export default RoundedBadgeStyle;
