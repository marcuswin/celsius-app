import {Dimensions, StyleSheet} from 'react-native';
import { heightPercentageToDP } from "../../../utils/scale";
// import {FONT_SCALE, STYLES} from "../../../config/constants/style";

const { width } = Dimensions.get('window');

const EmptyStateStyle = StyleSheet.create({
  wrapper: {
    marginTop: heightPercentageToDP("25%"),
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: width * 0.4,
    width: width * 0.4 + 16,
  }
});

export default EmptyStateStyle;
