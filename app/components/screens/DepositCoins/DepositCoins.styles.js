import { StyleSheet, Dimensions } from 'react-native';
// import {FONT_SCALE, STYLES} from "../../../config/constants/style";

const { width } = Dimensions.get('window');

const DepositCoinsStyle = StyleSheet.create({
  pieChart: {
    width: width * 0.6,
    height: width * 0.6 * 1.21,
  },
  hippoImage: {
    height: width * 0.25,
    width: width * 0.25 * 1.13,
  },
  hippoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  }
});

export default DepositCoinsStyle;
