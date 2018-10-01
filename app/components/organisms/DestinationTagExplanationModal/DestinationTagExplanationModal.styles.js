import { StyleSheet } from 'react-native';
import {FONT_SCALE} from "../../../config/constants/style";

const DestinationTagExplanationModalStyle = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
  },
  title: {
    marginBottom: 32,
    fontSize: 36 * FONT_SCALE,
    fontFamily: 'agile-bold',
    textAlign: 'center'
  },
  explanation: {
    marginBottom: 24,
    fontSize: 18 * FONT_SCALE,
    fontFamily: 'agile-light',
    textAlign: 'center'
  }
});

export default DestinationTagExplanationModalStyle;
