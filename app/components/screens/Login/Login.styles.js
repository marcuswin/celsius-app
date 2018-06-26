import { StyleSheet } from 'react-native';
import {FONT_SCALE, STYLES} from "../../../config/constants/style";

const LoginStyle = StyleSheet.create({
  content: {
    backgroundColor: STYLES.PRIMARY_BLUE,
    paddingLeft: 40,
    paddingRight: 40,
  },
  description: {
    fontSize: FONT_SCALE * 18,
    color: STYLES.WHITE_TEXT_COLOR,
    lineHeight: FONT_SCALE * 23,
    fontFamily: 'agile-light',
  },
  formWrapper: {
    paddingTop: 29
  },
  buttonWrapper: {
    paddingBottom: 60,
  },
  forgottenButton: {
    marginTop: 40,
    paddingBottom: 60,
  },
  linkButtonText: {
    color: 'rgba(136,162,199,1)',
    fontSize: FONT_SCALE * 18,
    fontFamily: 'agile-medium'
  },
});

export default LoginStyle;
