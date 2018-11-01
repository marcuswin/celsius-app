import { Dimensions, Platform, PixelRatio } from 'react-native';

export default {
  getMargins,
  getPadding,
  normalize
}

function getMargins(margin) {
  if (!margin) return getMargins('0 0 0 0');

  const margins = margin.split(' ');
  if (margins.length !== 4) return getMargins();

  return {
    marginTop: Number(margins[0]),
    marginRight: Number(margins[1]),
    marginBottom: Number(margins[2]),
    marginLeft: Number(margins[3]),
  }
}

function getPadding(padding) {
  if (!padding) return getPadding('0 0 0 0');

  const paddings = padding.split(' ');
  if (paddings.length !== 4) return getPadding();

  return {
    paddingTop: Number(paddings[0]),
    paddingRight: Number(paddings[1]),
    paddingBottom: Number(paddings[2]),
    paddingLeft: Number(paddings[3]),
  }
}

const {
  width: SCREEN_WIDTH,
  // height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone X's scale
const scale = SCREEN_WIDTH / 375;

export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  }
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2

}
