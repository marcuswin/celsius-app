// import STYLES from '../../../constants/STYLES';
import { getThemedStyle, heightPercentageToDP, widthPercentageToDP } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  container: {
    flex: 1
  },
  progressView: {
    height: heightPercentageToDP("25.5%"),
    backgroundColor: STYLES.COLORS.CELSIUS_BLUE,
    flexDirection: "row",
    alignItems: "center",
  },
  bonusCard: {
    width: widthPercentageToDP("89%"),
    backgroundColor: "white",
    flexDirection: "column",
  },
  image: {
    resizeMode: "contain",
    width: widthPercentageToDP("9%"),
    height: widthPercentageToDP("9%"),
  },
  circle: {
    width: widthPercentageToDP("17%"),
    height: widthPercentageToDP("17%"),
    borderRadius: heightPercentageToDP("17%") / 2,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: heightPercentageToDP("3%")
  },
  title: {
    marginTop: heightPercentageToDP("1.5%")
  },
  explanation: {
    marginTop: heightPercentageToDP("0.8%")
  },
  hodlImage: {
    resizeMode: "contain",
    height: heightPercentageToDP("20%"),
    width: widthPercentageToDP("85%")
  },
  arcChart: {
    marginHorizontal: widthPercentageToDP("8%")
  },
  contentWrapper: {
    marginHorizontal: 20,
    marginTop: heightPercentageToDP("1.5%")
  },
  interestCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const LoyaltyProgramStyle = () => getThemedStyle(base, themed);

export default LoyaltyProgramStyle;
