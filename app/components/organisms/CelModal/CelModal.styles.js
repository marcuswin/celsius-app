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
    zIndex: 3
  },
  outsideCloseModal: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    position: 'absolute',
    zIndex: 0
  },
  closeBtn: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "transparent",
    zIndex: 10
  },
  imageWrapper: {
    position: "absolute",
    zIndex: 10,
    top: -heightPercentageToDP("20%") / 1.7,
    left: widthPercentageToDP("80%") / 2 - heightPercentageToDP("18%") / 2,
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
    paddingTop: 5,
    backgroundColor: STYLES.COLORS.LIGHT_GRAY,
    alignItems: "center",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    zIndex: 5
  },
  imageWrapperCircle: {
    width: widthPercentageToDP("28.8%"),
    height: widthPercentageToDP("28.8%"),
    borderRadius: widthPercentageToDP("28.8%") / 2,
    backgroundColor: "white",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    top: -heightPercentageToDP("8%"),
    left: widthPercentageToDP("31.5%"),
    ...STYLES.SHADOW_STYLES
  },
  modalImageCircle: {
    width: widthPercentageToDP("12%"),
    height: widthPercentageToDP("12%")
  },
  screen: {
    width: 300,
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "white",
  },
  title: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 30,
    color: STYLES.COLORS.DARK_GRAY

},
  description: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: '#737A82',
  },
  modalButton: {
    marginTop: 0,
    backgroundColor: STYLES.COLORS.CELSIUS_BLUE,
},
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const CelModalStyle = () => getThemedStyle(base, themed);

export default CelModalStyle;
