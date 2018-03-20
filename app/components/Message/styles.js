import { StyleSheet } from 'react-native';
import {FONT_SCALE} from "../../config/constants/style";

const MessageStyle = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: 40
  },
  error: {
    backgroundColor: 'rgb(236, 66, 40)',
  },
  info: {
    backgroundColor: 'rgb(155, 155, 155)',
  },
  warning: {
    backgroundColor: 'rgb(223, 158, 64)',
  },
  text: {
    fontFamily: 'agile-light',
    color: 'white',
    fontSize: FONT_SCALE * 18,
    textAlign: 'center',
  }
});

export default MessageStyle;
