import { StyleSheet } from 'react-native';
import {FONT_SCALE} from "../../../config/constants/style";

const BitcoinCashForkInfoStyle = StyleSheet.create({
  alternateAddressWrapper: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.12)',
    borderRadius: 10,
    marginTop: 30,
    marginVertical: 10,
  },
  alternateAddressText: {
    fontFamily: 'agile-light',
    fontSize: FONT_SCALE * 16,
    textAlign: 'center',
    color: 'white',
  },
});

export default BitcoinCashForkInfoStyle;
