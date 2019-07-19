// import STYLES from '../../../constants/STYLES';
import { getThemedStyle, heightPercentageToDP } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
    container: {
        flex: 1
    },
  innerCircle: {
    position: "absolute",
    top: heightPercentageToDP("1.1%"),
    left: heightPercentageToDP("1.1%"),
    width: heightPercentageToDP("20.3%"),
    height: heightPercentageToDP("20.3%"),
    borderRadius: heightPercentageToDP("20.3%") / 2,
  },
  contentCircle: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: heightPercentageToDP("2.55%"),
    left: heightPercentageToDP("2.58%"),
    width: heightPercentageToDP("17.4%"),
    height: heightPercentageToDP("17.4%"),
    borderRadius: heightPercentageToDP("17.4%") / 2,
  }
};

const themed = {
    light: {
      progressBackground: {
        backgroundColor: STYLES.COLORS.WHITE
      }
    },

    dark: {
      progressBackground: {
        backgroundColor: STYLES.COLORS.DARK_HEADER
      }
    },

    celsius: {
    }
}

const CircularProgressBarStyle = () => getThemedStyle(base, themed);

export default CircularProgressBarStyle
