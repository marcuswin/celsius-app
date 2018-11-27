import { StyleSheet } from 'react-native';
import { FONT_SCALE, STYLES } from "../../../config/constants/style";

const VerifyIdentityScreenStyle = StyleSheet.create({
  title: {
    marginTop: 25,
    color: STYLES.WHITE_TEXT_COLOR,
    fontFamily: 'agile-extra-bold',
    fontSize: FONT_SCALE * 42,
    textAlign: 'center',
  },
  description: {
    marginTop: 20,
    marginBottom: 20,
    fontFamily: 'agile-light',
    fontSize: FONT_SCALE * 18,
    color: STYLES.WHITE_TEXT_COLOR,
    textAlign: 'center',
  }
});

export default VerifyIdentityScreenStyle;
