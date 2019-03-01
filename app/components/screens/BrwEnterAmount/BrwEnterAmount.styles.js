import { StyleSheet } from 'react-native';
import { FONT_SCALE, STYLES } from "../../../config/constants/style";
// import {FONT_SCALE, STYLES} from "../../../config/constants/style";

const BrwEnterAmountStyle = StyleSheet.create({
    heading: {
      color: STYLES.GRAY_2,
      fontFamily: 'agile-bold',
      fontSize: FONT_SCALE * 21,
      textAlign: 'center',
      lineHeight: FONT_SCALE * 25,
      marginTop: 10,
      marginBottom: 10,
    },
    explanation: {
    color: STYLES.GRAY_2,
    fontSize: FONT_SCALE * 18,
    fontFamily: 'agile-extra-light',
      textAlign: 'center',
    }
});

export default BrwEnterAmountStyle;
