import {Dimensions, Platform, StyleSheet} from 'react-native';
import {STYLES, FONT_SCALE, PIXEL_RATIO} from "../../config/constants/style";

const {height} = Dimensions.get('window');

const WelcomeStyle = StyleSheet.create({
  content: {
    backgroundColor: STYLES.PRIMARY_BLUE,
    paddingLeft: 40,
    paddingRight: 40
  },
  view: {
    height: Platform.OS === 'ios' ? (height - (PIXEL_RATIO * 50) + 40) : 'auto',
    justifyContent: 'flex-end',
  },
  description: {
    fontSize: 18,
    color: STYLES.WHITE_TEXT_COLOR,
    fontWeight: '300',
    fontFamily: 'agile-light',
    paddingTop: 10
  },
  buttonWrapper: {
    paddingTop: 57,
    justifyContent: 'center'
  },
  linkButtonText: {
    color: 'rgba(136,162,199,1)',
    fontSize: FONT_SCALE * 18,
    fontFamily: 'agile-medium'
  },
  linkButton: {
    marginTop: 40,
    paddingBottom: 60
  },
  welcomeTitle: {
    textAlign: 'center',
  },
  heroImage: {
    width: 170,
    height: 170
  },
  heroImageWrapper: {
    paddingBottom: 10
  }
});

export default WelcomeStyle;
