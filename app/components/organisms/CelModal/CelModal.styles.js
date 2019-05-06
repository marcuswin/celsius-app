import { Platform } from 'react-native';
import { getThemedStyle, heightPercentageToDP, widthPercentageToDP } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Platform.OS === 'android' ? 'rgba(243,243,243,0.9)' : 'rgba(243,243,243,0)',
    flex: 1,
  },
  modal: {
    backgroundColor: "white",
    width: widthPercentageToDP("90%"),
    borderRadius: 8,
  },
  closeBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "transparent",
    zIndex: 10
  },
  imageWrapper: {
    position: "absolute",
    zIndex: 10,
    top: -heightPercentageToDP("20%")/1.7,
    left: widthPercentageToDP("80%")/2 - heightPercentageToDP("18%")/2,
  },
  modalImage: {
    width: heightPercentageToDP("22.5%"),
    height: heightPercentageToDP("22.5%")
  },
  contentWrapper: {
    paddingRight: 20,
    paddingLeft: 20,
    marginBottom: 20
  },
  modalHeadingWrapper: {
    position: "absolute",
    top: 0,
    width: widthPercentageToDP("90%"),
    height: heightPercentageToDP("15.5%"),
    paddingTop: 10,
    backgroundColor: STYLES.COLORS.LIGHT_GRAY,
    alignItems: "center",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    zIndex: 5
  },
  mainHeadingText: {
    fontFamily: "barlow-extra-bold",
    color: STYLES.COLORS.MEDIUM_GRAY
  },
  secondaryHeadingText: {
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
