import { StyleSheet, Dimensions } from 'react-native';
import {STYLES} from "../../../config/constants/style";

const { width, height } = Dimensions.get('window');
const imageSize = Math.min(((height - width) / (width * 2)), 0.5) * width;

const ImageHeadingStyle = StyleSheet.create({
  wrapper: {
  },
  coloredSection: {
    backgroundColor: STYLES.PRIMARY_BLUE,
    height: imageSize / 2 + 10,
  },
  greySection: {
    backgroundColor: '#f3f3f3',
    height: imageSize / 2 + 10,
  },
  imageWrapper: {
    position: 'absolute',
    top: 10,
    left: (width - imageSize) / 2,
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
    borderWidth: 5,
    borderColor: STYLES.GRAY_3,
  },
});

export default ImageHeadingStyle;
