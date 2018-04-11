import {StyleSheet} from 'react-native';
import {FONT_SCALE, STYLES} from "../../config/constants/style";

const ThankYouStyle = StyleSheet.create({
  content: {
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: STYLES.PRIMARY_BLUE
  },
  heading: {
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
  }
});

export default ThankYouStyle;
