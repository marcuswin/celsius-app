// import STYLES from '../../../constants/STYLES';
import {
  getThemedStyle,
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  container: {
    height: heightPercentageToDP("26%"),
    position: "absolute",
    right: -20,
    left: -20,
    top: -20,
  },
  halfCircleRight: {
    position: "absolute",
    marginTop: heightPercentageToDP("2%"),
    left: -heightPercentageToDP("11%"),
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
    alignItems: "flex-start",
    paddingLeft: widthPercentageToDP("22%"),
    paddingRight: widthPercentageToDP("2%"),
  },
  image: {
    marginRight: 15,
    width: 35,
    height: 35,
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
