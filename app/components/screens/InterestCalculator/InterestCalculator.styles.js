import { StyleSheet } from 'react-native';
import { FONT_SCALE } from "../../../config/constants/style";
// import {FONT_SCALE, STYLES} from "../../../config/constants/style";

const InterestCalculatorStyle = StyleSheet.create({
  amountBox: {
    borderRadius: 8,
    backgroundColor: '#899099',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 25,
    paddingRight: 25,
  },
  amountText: {
    fontFamily: 'agile-medium',
    fontSize: FONT_SCALE * 36,
    color: 'white',
  },
});

export default InterestCalculatorStyle;
