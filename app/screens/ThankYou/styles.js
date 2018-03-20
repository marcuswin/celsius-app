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
    marginTop: 84,
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
