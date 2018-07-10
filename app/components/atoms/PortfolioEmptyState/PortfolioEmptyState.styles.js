import {Dimensions, StyleSheet} from 'react-native';
// import {FONT_SCALE, STYLES} from "../../../config/constants/style";

const { width } = Dimensions.get('window');

const PortfolioEmptyStateStyle = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    alignItems: 'center'
  },
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: width * 0.4,
    width: width * 0.4 + 16,
  }
});

export default PortfolioEmptyStateStyle;
