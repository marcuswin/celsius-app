import { StyleSheet } from 'react-native';
import {FONT_SCALE} from "../../../config/constants/style";

const RemoveTwoFaModalStyle = StyleSheet.create({
    heading: {
      textAlign: 'left',
      marginBottom: 20,
      color: '#3D4853',
      fontFamily: 'agile-extra-bold',
      fontSize: 36 * FONT_SCALE
    },
  text: {
    color: "rgba(61,72,83,1)",
    fontSize: FONT_SCALE * 20,
    fontFamily: 'agile-extra-light',
  }
});

export default RemoveTwoFaModalStyle;
