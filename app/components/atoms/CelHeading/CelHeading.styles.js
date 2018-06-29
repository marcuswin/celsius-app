import { StyleSheet } from 'react-native';
import {FONT_SCALE, STYLES} from "../../../config/constants/style";

const CelHeadingStyle = StyleSheet.create({
  container: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 20,
    paddingTop: 10,
    justifyContent: 'center',
    backgroundColor: STYLES.PRIMARY_BLUE,
  },
  heading: {
    fontFamily: 'agile-bold',
    color: 'white',
    fontSize: FONT_SCALE * 40,
  },
  subheading: {
    fontSize: FONT_SCALE * 21,
    opacity: 0.7,
    fontFamily: 'agile-light',
    color: 'white',
  },
});

export default CelHeadingStyle;
