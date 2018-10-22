import { StyleSheet } from 'react-native';
import { FONT_SCALE } from "../../../config/constants/style";
// import {FONT_SCALE, STYLES} from "../../../config/constants/style";

const TwoFaWelcomeStyle = StyleSheet.create({
    title: {
      marginTop: 25,
      fontSize: FONT_SCALE * 20,
    },
  authenticator: {
    marginTop: 20,
  }
});

export default TwoFaWelcomeStyle;
