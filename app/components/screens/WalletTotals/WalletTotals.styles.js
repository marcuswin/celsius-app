import { Dimensions, StyleSheet } from "react-native";
import {FONT_SCALE} from "../../../config/constants/style";

const { width } = Dimensions.get('window');

const WalletTotalsStyle = StyleSheet.create({
  list: {
    width,
    margin: 'auto'

  },
  listItem: {
    height: 140,
    backgroundColor: 'white',
    padding: 36,
    marginLeft: 0
  },
  coinInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinAmount: {
    marginRight: 47
  },
  coinPercentage: {
  },
  name: {
    fontSize: FONT_SCALE * 11,
    fontWeight: '300',
    fontFamily: 'agile-book',
    color: 'rgba(61,72,83,0.5)',
    marginTop: 30,
    marginBottom: 7
  },
  fiatAmount: {
    fontSize: FONT_SCALE * 30,
    fontWeight: '500',
    fontFamily: 'agile-bold',
    color: 'rgba(61,72,83,1)',
    marginBottom: 7,

  },
  cryptoAmount: {
    fontSize: FONT_SCALE * 14,
    fontWeight: '300',
    fontFamily: 'agile-light',
    color: 'rgba(61,72,83,1)',
    marginBottom: 25
  },
  history: {
    marginRight: 36,
    marginLeft: 36,
    marginTop: 32,
    marginBottom: 30
  }
});

export default WalletTotalsStyle;
