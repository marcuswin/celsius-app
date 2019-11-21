// import STYLES from '../../../constants/STYLES';
import {
  getThemedStyle,
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  container: {
    height: heightPercentageToDP("24%"),
    position: "absolute",
    right: -20,
    left: -20,
    top: -20,
  },
  halfCircleRight: {
    position: "absolute",
    marginTop: heightPercentageToDP("1%"),
    left: -heightPercentageToDP("13%"),
    height: heightPercentageToDP("22%"),
    width: heightPercentageToDP("22%"),
    backgroundColor: STYLES.COLORS.WHITE_OPACITY2,
    borderRadius: heightPercentageToDP("11%"),
    justifyContent: "center",
    alignItems: "flex-end",
  },
  mainWrapper: {
    flexDirection: "row",
  },
  textAlignment: {
    marginTop: heightPercentageToDP("1.7%"),
    alignItems: "flex-start",
    paddingLeft: widthPercentageToDP("22%"),
    paddingRight: widthPercentageToDP("2%"),
  },
  image: {
    marginRight: heightPercentageToDP("3%"),
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const KYCandPromotionsTriggerStyle = () => getThemedStyle(base, themed);

export default KYCandPromotionsTriggerStyle;
