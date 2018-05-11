import { StyleSheet } from 'react-native';
import {FONT_SCALE, STYLES} from "../../../config/constants/style";

const MessageStyle = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
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
  success: {
    backgroundColor: STYLES.PRIMARY_GREEN,
  },
  text: {
    fontFamily: 'agile-light',
    color: 'white',
    fontSize: FONT_SCALE * 18,
    textAlign: 'center',
  }
});

export default MessageStyle;
