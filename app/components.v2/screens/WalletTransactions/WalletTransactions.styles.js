import { StyleSheet, Dimensions } from 'react-native';
// import {FONT_SCALE, STYLES} from "../../../config/constants/style";

const {width} = Dimensions.get('window');

const WalletTransactionsStyle = StyleSheet.create({
  image: {
    width: width / 2.5,
    height: width / 2.5 + 20,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  text: {
    textAlign: 'center',
    marginBottom: 20
  },
  header: {
    textAlign: 'center'
  }
});

export default WalletTransactionsStyle;
