import { StyleSheet } from 'react-native';
import {FONT_SCALE} from "../../../config/constants/style";

const WalletBalanceStyle = StyleSheet.create({
  card: {
    paddingTop: 10,
    paddingLeft: 16,
    paddingRight: 16,
    // paddingBottom: 10,
  },
  totalInterestLabel: {
    color: '#3D4853',
    fontSize: FONT_SCALE * 11,
    opacity: 0.7,
    fontFamily: 'agile-book',
  },
  totalInterestValue: {
    marginTop: 5,
    marginBottom: 10,
    fontSize: FONT_SCALE * 29,
    color: '#3D4853',
    fontFamily: 'agile-medium',
  }
});

export default WalletBalanceStyle;
