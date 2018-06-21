import {Dimensions, StyleSheet} from 'react-native';
// import {FONT_SCALE, STYLES} from "../../../config/constants/style";

const { width } = Dimensions.get('window');

const PortfolioEmptyStateStyle = StyleSheet.create({
  wrapper: {
    marginTop: 30,
  },
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: width * 0.33,
    width: width * 0.33 * 1.2,
  }
});

export default PortfolioEmptyStateStyle;
