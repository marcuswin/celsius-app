import {Dimensions, Platform, StyleSheet} from 'react-native';
import {STYLES, PIXEL_RATIO} from "../../../config/constants/style";

const {height} = Dimensions.get('window');

const WelcomeStyle = StyleSheet.create({
  content: {
    backgroundColor: STYLES.PRIMARY_BLUE,
  },
  view: {
    minHeight: Platform.OS === 'ios' ? (height - (PIXEL_RATIO * 50) + 40) : 'auto',
    justifyContent: 'center',
    paddingLeft: 40,
    paddingRight: 40,
  },
  buttonWrapper: {
    justifyContent: 'center',

  },
});

export default WelcomeStyle;
