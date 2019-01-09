import { StyleSheet } from 'react-native';

import { FONT_SCALE, COLORS } from "../../../config/constants/style";

const WalletDetailsHeading = StyleSheet.create({
  root: {
    backgroundColor: COLORS.blue,
    paddingTop: 10,
    paddingBottom: 30,
  },
  totalValueAmount: {
    color: 'white',
    fontSize: FONT_SCALE * 40,
    fontFamily: 'agile-extra-bold',
    textAlign: 'center',
  },
  totalCoinAmountWrapper: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 15,
  },
  totalCoinAmount: {
    color: 'white',
    fontSize: FONT_SCALE * 21,
    fontFamily: 'agile-light',
    marginLeft: 8,
    opacity: .8,
  },
  buttonWrapper: {
    display: 'flex',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 36,
    marginTop: 26,
  },
});

export default WalletDetailsHeading;
