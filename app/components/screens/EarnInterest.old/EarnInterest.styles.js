import {StyleSheet} from 'react-native';

import {FONT_SCALE, STYLES} from "../../../config/constants/style";

const EarnInterest = StyleSheet.create({
  content: {
    backgroundColor: '#F3F3F3',
    paddingLeft: 40,
    paddingRight: 40
  },
  heading: {
    textAlign: 'center',
    marginTop: 84,
    fontSize: 40,
    fontFamily: 'agile-extra-bold',
    color: '#fff',
    lineHeight: 41,
    fontWeight: '800'
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    paddingTop: 12,
    marginTop: 21,
    marginBottom: 28,
  },
  placeWrapper: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden'
  },
  hiddenElement: {
    paddingTop: '10.666666%'
  },
  welcomeText: {
    color: '#fff',
    fontSize: FONT_SCALE * 21,
    textAlign: 'center',
    fontFamily: 'agile-light',
    fontWeight: '300',
    paddingTop: 18,
    lineHeight: 25
  },
  emcWrapper: {
    width: '100%',
    marginTop: 22,
    marginBottom: 26
  },
  emcImage: {
    width: 200,
    height: 125,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  thankYouTitle: {
    marginTop: '25%',
    marginBottom: '7%',
    fontWeight: '800',
    fontFamily: 'agile-extra-bold',
    color: 'rgba(255,255,255,1)',
    fontSize: FONT_SCALE * 40,
    textAlign: 'center'
  },
  yourPlace: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%'
  },
  caret: {
    width: 20,
    height: 12,
    position: 'absolute',
    left: 0,
    top: 0,
    marginLeft: -10
  },
  caretWrapper: {
    height: 12,
    top: 0,
    position: 'absolute',
    left: '3%',
    right: '3%'
  },
  description: {
    fontSize: FONT_SCALE * 17,
    color: '#3D4853',
    lineHeight: FONT_SCALE * 23,
    fontWeight: '200',
    fontFamily: 'agile-extra-light'
  },
  buttonWrapper: {
    paddingTop: 29,
    justifyContent: 'center'
  },
  linkButtonText: {
    color: 'rgba(136,162,199,1)',
    fontSize: FONT_SCALE * 18,
    fontFamily: 'agile-medium'
  },
  linkButton: {
    marginTop: 20
  },
  welcomeTitle: {
    textAlign: 'center'
  },
  heroImage: {
    alignSelf: 'center',
    height: '30%'
  },
  submitButtonWrapper: {
    marginTop: 40,
    paddingBottom: 60,
  },
  submitButton: {
    height: 60,
    borderWidth: 2,
    borderColor: STYLES.PRIMARY_GREEN,
    backgroundColor: STYLES.PRIMARY_GREEN,
    justifyContent: 'center',
    borderRadius: 100
  },
  submitButtonTitle: {
    fontFamily: 'agile-medium',
    color: '#fff',
    textAlign: 'center',
    fontSize: FONT_SCALE * 21
  },
  thanksLenderContent: {
    backgroundColor: STYLES.PRIMARY_GREEN,
    paddingLeft: 40,
    paddingRight: 40
  },
  imageWrapper: {
    height: 230,
    width: 230,
    borderWidth: 10,
    borderRadius: 115,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  celsiusLogo: {
    height: 68,
    width: 68,
    borderRadius: 34,
    position: 'absolute',
    right: -10,
    top: -10,
    borderWidth: 10,
    backgroundColor: STYLES.PRIMARY_GREEN,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    zIndex: 2
  },
  socialIcons: {
    paddingTop: 22
  },
  socialIconsText: {
    fontFamily: 'agile-medium',
    fontSize: FONT_SCALE * 18,
    marginLeft: 10,
    color: '#fff'
  },
  telegramContainer: {
    marginBottom: 41,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    opacity: 0.5
  },
  telegramText: {
    marginLeft: 11,
    fontSize: FONT_SCALE * 18,
    color: '#fff',
    fontFamily: 'agile-light',
  }
});

export default EarnInterest;
