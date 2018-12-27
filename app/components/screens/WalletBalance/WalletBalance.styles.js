import { StyleSheet } from 'react-native';
import { FONT_SCALE, STYLES } from "../../../config/constants/style";

const WalletBalanceStyle = StyleSheet.create({
  card: {
    paddingTop: 10,
    paddingLeft: 16,
    paddingRight: 16,
    position: 'relative',
  },
  cardLoading: {
    paddingTop: 0,
    paddingLeft: 0,
    paddingBottom: 0,
    borderRadius: 8,
  },
  cardLoadingBig: {
    height: 150
  },
  cardLoadingSmall: {
    height: 100
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
  },
  todayRatesText: {
    position: 'absolute',
    bottom: 13,
    right: 16,
    fontSize: FONT_SCALE * 16,
    color: STYLES.PRIMARY_BLUE,
  }
});

export default WalletBalanceStyle;
