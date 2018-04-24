import {StyleSheet, Dimensions} from 'react-native';
import {FONT_SCALE, STYLES} from "../../config/constants/style";

const { height, width } = Dimensions.get('window');

const ThankYouStyle = StyleSheet.create({
  content: {
    paddingTop: height * 0.10,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: STYLES.PRIMARY_BLUE
  },
  heading: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 40,
    fontFamily: 'agile-extra-bold',
    color: '#fff',
    lineHeight: 41,
    fontWeight: '800'
  },
  welcomeText: {
    color: '#fff',
    fontSize: FONT_SCALE * 21,
    textAlign: 'center',
    fontFamily: 'agile-light',
    paddingTop: 18,
    lineHeight: 25
  },
  imageWrapper: {
    height: 195,
    width: 195,
    borderWidth: 8,
    borderRadius: 10,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  celsiusLogo: {
    height: 62,
    width: 62,
    borderRadius: 31,
    position: 'absolute',
    right: -31,
    top: -31,
    borderWidth: 8,
    backgroundColor: STYLES.PRIMARY_BLUE,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    zIndex: 2
  },
  description: {
    fontSize: FONT_SCALE * 18,
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'agile-light'
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
  },
  heroImage: {
    width: 140,
    height: 140,
    opacity: 0.5,
  },
  heroImageWrapper: {
    paddingBottom: 10,
  },
  verificationText: {
    fontSize: 18,
    fontFamily: 'agile-light',
    color: '#fff',
    paddingBottom: 12,
  },
  descriptionText: {
    fontSize: 18,
    fontFamily: 'agile-light',
    color: '#fff',
    paddingBottom: 12,
    textAlign: 'center',
  },
  cancelWrapper: {
    paddingTop: 27,
    paddingBottom: 20,
  },
  statusSection: {
    position: 'absolute',
    top: 0.9 * height * 0.6,
    width: width - 80,
  }
});

export default ThankYouStyle;
