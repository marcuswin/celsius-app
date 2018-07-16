import { StyleSheet } from 'react-native';
import {FONT_SCALE, STYLES} from "../../../config/constants/style";

const MessageStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 64,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: "space-between",
    backgroundColor: '#273363'
  },
  messageWrapper: {
    flexDirection: "row",
    alignItems: 'center',
    width: "80%"
  },
  errorCircle: {
    width: 27,
    height: 27,
    borderRadius: 27/2,
    backgroundColor: 'rgb(236, 66, 40)',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successCircle: {
    width: 27,
    height: 27,
    borderRadius: 27/2,
    backgroundColor: STYLES.PRIMARY_GREEN,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningCircle: {
    width: 27,
    height: 27,
    borderRadius: 27/2,
    backgroundColor: 'rgb(223, 158, 64)',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    backgroundColor: 'rgb(155, 155, 155)',
  },
  neutral: {
    backgroundColor: STYLES.GRAY_2,
  },
  text: {
    fontFamily: 'agile-light',
    color: 'white',
    fontSize: FONT_SCALE * 15,
    textAlign: 'center',
  },
  errorText: {
    color: 'rgb(236, 66, 40)',
  },
  infoText: {
    color: 'rgb(155, 155, 155)',
  },
  warningText: {
    color: 'rgb(223, 158, 64)',
  },
  successText: {
    color: STYLES.PRIMARY_GREEN,
  },
  neutralText: {
    color: STYLES.WHITE_TEXT_COLOR,
  }
});

export default MessageStyle;
