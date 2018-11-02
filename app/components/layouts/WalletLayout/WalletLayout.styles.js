import { StyleSheet } from 'react-native';
import { COLORS, FONT_SCALE } from "../../../config/constants/style";

const WalletLayoutStyle = StyleSheet.create({
  heading: {
    backgroundColor: COLORS.blue,
    paddingTop: 5,
    paddingBottom: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountText: {
    fontFamily: 'agile-bold',
    color: 'white',
    fontSize: FONT_SCALE * 40,
    textAlign: 'center',
  },
  subheadingText: {
    fontSize: FONT_SCALE * 21,
    opacity: 0.7,
    fontFamily: 'agile-light',
    color: 'white',
    textAlign: 'center',
  },
  totalLoader: {
    width: 32,
    height: 32,
    marginBottom: 16,
  },
  content: {
    paddingTop: 15,
    paddingLeft: 30,
    paddingRight: 30,
  }
});

export default WalletLayoutStyle;
