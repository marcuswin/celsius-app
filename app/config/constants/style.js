import {PixelRatio, Platform} from "react-native";

export const PIXEL_RATIO = PixelRatio.get();
// Font scaling for different iOS devices
// PIXEL_RATIO === 3 => FONT_SCALE = 1, iPhone X
// PIXEL_RATIO === 2.5 => FONT_SCALE = 0.9, iPhoneSE
// PIXEL_RATIO === 2 => FONT_SCALE = 0.8
const IPHONEX = 3;
// export const FONT_SCALE = 1 + ((PIXEL_RATIO - IPHONEX) / 5);
export const FONT_SCALE = calcFontScale();

function calcFontScale() {
  let scale;
  if (Platform.OS === 'ios') {
    scale = 1 + ((PIXEL_RATIO - IPHONEX) / 5);
  } else {
    scale = PixelRatio.getFontScale();
  }
  return scale;
}

export const COLORS = {
  blue: '#4156A6',
  green: '#4FB895',
  yellow: '#E19F30',
  pink: '#A866AA',
  gray: '#899099',
  gray2: '#3D4853',
  red: '#EF461A',
}

export const STYLES = {
  PRIMARY_BLUE: '#4156A6',
  PRIMARY_GREEN: '#4FB895',
  PRIMARY_RED: '#EF461A',
  WHITE_TEXT_COLOR: '#ffffff',
  INPUT_BACKGROUND_COLOR_WHITE: 'rgba(255, 255, 255, 0.1)',
  INPUT_COLOR_WHITE: '#ffffff',
  INPUT_LABEL_COLOR_WHITE: '#ffffff',
  COIN_DATA_GREEN: '#55BB99',
  GRAY_1: '#EEEEEE',
  GRAY_2: '#3D4853',
  GRAY_3: '#E9E9EF',
  GRAY_4: '#9DA3A9',
  GRAY_5: '#CED1D4',
  GRAY_6: '#C8C8C8',
  GRAY_7: '#899099',
  YELLOW: '#E19F30',
};

export const GLOBAL_STYLE_DEFINITIONS = {
  normalText: {
    color: STYLES.GRAY_2,
    fontSize: FONT_SCALE * 18,
    fontFamily: 'agile-extra-light',
  },
  blueTextColor: {
    color: STYLES.PRIMARY_BLUE,
  },
  invertedNormalText: {
    color: STYLES.WHITE_TEXT_COLOR,
    fontSize: FONT_SCALE * 18,
    fontFamily: 'agile-extra-light',
  },
  italicText: {
    fontFamily: 'agile-light-italic',
    color: STYLES.GRAY_2,
    fontSize: FONT_SCALE * 18
  },
  heading: {
    color: STYLES.GRAY_2,
    fontFamily: 'agile-bold',
    fontSize: FONT_SCALE * 21,
    textAlign: 'center',
    lineHeight: FONT_SCALE * 25,
    marginTop: 10,
    marginBottom: 10,
  },
  largeHeading: {
    color: '#3D4853',
    fontFamily: 'agile-extra-bold',
    fontSize: 36,
    lineHeight: 41,
    textAlign: 'center',
  },
  extraLightText: { fontFamily: 'agile-extra-light' },
  lightText: { fontFamily: 'agile-light' },
  mediumText: { fontFamily: 'agile-medium' },
  boldText: { fontFamily: 'agile-bold' },
  underlinedText: {
    textDecorationLine: 'underline',
  },
  centeredColumn: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  blueErrorText: {
    fontSize: Platform.OS === 'ios' ? FONT_SCALE * 16 : FONT_SCALE * 12,
    position: 'absolute',
    top: 65,
    color: '#fff'
  },
  errorText:{
    fontSize: Platform.OS === 'ios' ? FONT_SCALE * 16 : FONT_SCALE * 12,
    color: '#fff'
  },
  whiteErrorText: {
    fontSize: Platform.OS === 'ios' ? FONT_SCALE * 16 : FONT_SCALE * 12,
    position: 'absolute',
    top: 65,
    color: '#EF461A'
  },
  // celsius form styles
  errorInputWrapper: {
      borderColor: '#EF461A',
      borderWidth: 1,
      borderRadius: 8,
  },
  inputWrapper: {
    paddingLeft: 18,
    paddingRight: 18,
    paddingBottom: 8,
    paddingTop: 23,
    // marginBottom: 20,
    borderRadius: 8,
    height: 60,
  },
  blueInputWrapper: { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
  blueInputWrapperActive: {backgroundColor: 'rgba(255,255,255,0.35)'},
  blueInputWrapperDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    opacity: 0.4,
  },
  whiteInputWrapper: { backgroundColor: 'rgba(255,255,255,0.5)' },
  whiteInputWrapperActive: { backgroundColor: STYLES.INPUT_COLOR_WHITE },
  whiteInputWrapperDisabled: {
    backgroundColor: 'rgba(206, 209, 212, 0.4)',
  },
  inputItem: {
    borderBottomColor: 'transparent',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    zIndex: 0,
    marginRight: 0,
  },
  nonPasswordInputStyle: {
    fontFamily: 'agile-medium',
  },
  input: {
    fontSize: FONT_SCALE * 20,
    marginTop: 4,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 0,
    zIndex: 1,
    height: 28,
  },
  blueInputTextColor: { color: STYLES.INPUT_COLOR_WHITE },
  whiteInputTextColor: { color: STYLES.GRAY_2 },
  inputLabelWrapper: {
    left: 18,
    zIndex: 2,
    position: 'absolute',
    top: 18,
    height: 23,
    width: 300,
  },
  inputLabel: {
    color: STYLES.INPUT_LABEL_COLOR_WHITE,
    fontFamily: 'agile-light',
    opacity: 0.8,
    zIndex: 3,
    position: 'absolute',
    top: 0,
    left: 0,
    fontSize: FONT_SCALE * 20,
  },
  selectLabelInactive: {
    color: STYLES.INPUT_LABEL_COLOR_WHITE,
    fontFamily: 'agile-light',
    fontSize: FONT_SCALE * 20,
    opacity: 0.8,
    zIndex: 2,
  },
  selectLabelActive: {
    color: 'white',
    fontSize: FONT_SCALE * 12,
    opacity: 0.8,
    fontFamily: 'agile-light',
    position: 'absolute',
    top: 11,
    zIndex: 2,
    left: 18,
  },
  inputIconRight: {
    position: 'absolute',
    right: 15,
    top: 0,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.4,
  },
  shadow: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderRadius: 8
  }
};

export const FONTS = [
  {'Roboto': require('native-base/Fonts/Roboto.ttf')},
  {'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf')},
  {'agile-medium': require('../../../assets/fonts/Agile-Medium.otf')},
  {'agile-light': require('../../../assets/fonts/Agile-Light.otf')},
  {'agile-light-italic': require('../../../assets/fonts/Agile-LightItalic.otf')},
  {'agile-extra-light': require('../../../assets/fonts/Agile-Extralight.otf')},
  {'agile-bold': require('../../../assets/fonts/Agile-Bold.otf')},
  {'agile-book': require('../../../assets/fonts/Agile-Book.otf')},
  {'agile-extra-bold': require('../../../assets/fonts/Agile-Extrabold.otf')},
  {'inconsolata-regular': require('../../../assets/fonts/Inconsolata-Regular.ttf')},
];

export const CACHE_IMAGES = [
  require('../../../assets/images/icons/celsius_symbol_white.png'),
  require('../../../assets/images/icons/animated-spinner.gif'),
  require('../../../assets/images/icons/white_spinner.gif'),
  require('../../../assets/images/icons/icon-check.png'),
  require('../../../assets/images/icons/camera-flip.png'),
  require('../../../assets/images/two-thumbs-up.png'),
  require('../../../assets/images/bubble-pointer.png'),
  require('../../../assets/images/avatar-mouse-girl.jpg'),
  require('../../../assets/images/avatar-bear.jpg'),
  require('../../../assets/images/avatar-cat.jpg'),
  require('../../../assets/images/avatar-deer.jpg'),
  require('../../../assets/images/avatar-girl-dog.jpg'),
  require('../../../assets/images/avatar-hippo.jpg'),
  require('../../../assets/images/avatar-monkey.jpg'),
  require('../../../assets/images/avatar-monkey-girl.jpg'),
  require('../../../assets/images/avatar-sheep.jpg'),
  require('../../../assets/images/camera-mask-circle.png'),
  require('../../../assets/images/camera-mask-document.png'),
  require('../../../assets/images/phone_doggirl3x.png'),
  require('../../../assets/images/bear-NoKYC3x.png'),
  require('../../../assets/images/bear-happyKYC3x.png'),
  require('../../../assets/images/frenchy.png'),
  require('../../../assets/images/interest-illu.png'),
  require('../../../assets/images/deerTransactionHistory.png'),
  require('../../../assets/images/illuNoKYC3x.png'),
  require('../../../assets/images/OfflineMode/deer-tangled3x.png'),
  require('../../../assets/images/Onboarding_background3x.png'),
  require('../../../assets/images/interactivePart3x.png'),
  require('../../../assets/images/Conversation3x.png'),
  require('../../../assets/images/security_dog3x.png'),
  require('../../../assets/images/Group_232-3x.png'),
  require('../../../assets/images/authSuccess3x.png'),
  require('../../../assets/images/hodl-bear.png'),
  require('../../../assets/images/7pie.png'),
  require('../../../assets/images/9pie.png'),
  require('../../../assets/images/12pie.png'),
];
