import { getThemedStyle, heightPercentageToDP, widthPercentageToDP } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    position: "relative",
    backgroundColor: "white",
    width: widthPercentageToDP("90%"),
    borderRadius: 8,
  },
  closeBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 20,
    height: 20,
    backgroundColor: "transparent",
    zIndex: 10
  },
  btn: {
    width: 100,
    height: 70,
    marginLeft: 120,
    marginRight: 120
  },
  imageWrapper: {
    position: "absolute",
    zIndex: 10,
    top: -heightPercentageToDP("16%")/1.7,
    left: widthPercentageToDP("90%")/2 - heightPercentageToDP("16%")/2,
  },
  modalImage: {
    width: heightPercentageToDP("16%"),
    height: heightPercentageToDP("16%")
  },
  contentWrapper: {
    marginTop: 40,
    paddingRight: 20,
    paddingLeft: 20,
    marginBottom: 20
  },
  modalHeadingWrapper: {
    position: "absolute",
    top: 0,
    width: widthPercentageToDP("90%"),
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: STYLES.COLORS.LIGHT_GRAY,
    alignItems: "center",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: heightPercentageToDP("15.3%"),
    zIndex: 5
  },
  mainHeadingText: {
    fontFamily: "barlow-extra-bold",
    color: STYLES.COLORS.MEDIUM_GRAY
  },
  secondaryHeadingText: {
    fontFamily: "barlow-extra-bold",
    color: STYLES.COLORS.MEDIUM_GRAY
  }
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const CelModalStyle = () => getThemedStyle(base, themed);

export default CelModalStyle;
