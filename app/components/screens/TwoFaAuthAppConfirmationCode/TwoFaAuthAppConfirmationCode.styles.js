import { StyleSheet } from 'react-native';
import {FONT_SCALE} from "../../../config/constants/style";

const TwoFaAuthAppConfirmationCodeStyle = StyleSheet.create({
  title: {
    marginTop: 25,
    fontSize: FONT_SCALE * 20,
  },
  input: {
    marginTop: 20,
    marginBottom: 20
  }
});

export default TwoFaAuthAppConfirmationCodeStyle;
