import { StyleSheet, Dimensions } from 'react-native';

import { FONT_SCALE, COLORS } from "../../../config/constants/style";

const { width } = Dimensions.get('window');


const WalletDetailsHeading = StyleSheet.create({
  root: {
    backgroundColor: COLORS.blue,
  },
  totalValueAmount: {
    color: 'white',
    fontSize: FONT_SCALE * 40,
    fontFamily: 'agile-bold',
    textAlign: 'center',
  },
  totalCoinAmount: {
    color: 'white',
    fontSize: FONT_SCALE * 21,
    opacity: .5,
    textAlign: 'center',
    marginTop: 15,
  },
  buttonWrapper: {
    display: 'flex',
    alignSelf: 'center',
    width: width / 3,
    marginTop: 26,
    marginBottom: 30,
  },
});

export default WalletDetailsHeading;
