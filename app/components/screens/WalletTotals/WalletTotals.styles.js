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
    paddingLeft: 30,
    paddingRight: 30,
    marginLeft: 0,
    flexDirection: 'row',
  },
  name: {
    fontSize: FONT_SCALE * 11,
    fontFamily: 'agile-book',
    color: 'rgba(61,72,83,0.5)',
    marginTop: 30,
    marginBottom: 7
  },
  fiatAmount: {
    fontSize: FONT_SCALE * 30,
    fontFamily: 'agile-bold',
    color: 'rgba(61,72,83,1)',
    marginBottom: 7,

  },
  cryptoAmount: {
    fontSize: FONT_SCALE * 14,
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
