import { StyleSheet } from 'react-native';
import {STYLES} from "../../../config/constants/style";

const AnimatedHeadingStyle = StyleSheet.create({
  container: {
    paddingLeft: 40,
    paddingRight: 40,
    justifyContent: 'center',
    backgroundColor: STYLES.PRIMARY_BLUE
  },
  text: {
    fontWeight: '800',
    fontFamily: 'agile-extra-bold',
    color: 'rgba(255,255,255,1)'
  }
});

export default AnimatedHeadingStyle;
