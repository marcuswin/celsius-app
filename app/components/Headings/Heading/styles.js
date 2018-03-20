import { StyleSheet } from 'react-native';
import { FONT_SCALE } from "../../../config/constants/style";

const HeadingStyle = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  text: {
    fontWeight: '800',
    fontFamily: 'agile-extra-bold',
    color: 'rgba(255,255,255,1)',
    fontSize: FONT_SCALE * 42,
    textAlign: 'center'
  }
});

export default HeadingStyle;
