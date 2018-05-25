import { StyleSheet, Dimensions } from 'react-native';
import {FONT_SCALE} from "../../../config/constants/style";

const { height, width } = Dimensions.get('window');

const CameraStyle = StyleSheet.create({
  content: {
    paddingLeft: 40,
    paddingRight: 40,
    height,
  },
  view: {
    height: 0.88 * height,
    justifyContent: 'space-between',
  },
  heading: {
    marginTop: 0.02 * height,
    fontFamily: 'agile-bold',
    textAlign: 'center',
    fontSize: FONT_SCALE * 42,
    color: 'white',
    letterSpacing: 0.5,
  },
  cameraCopy: {
    color: 'white',
    textAlign: 'center',
  },
  bottomSection: {
    height: 0.3 * height,
    justifyContent: 'space-between',
  },
  cameraPhoto: {
    position: 'absolute',
    width,
    height,
    zIndex: -5,
  },
  maskImage: {
    position: 'absolute',
    width,
    height,
    zIndex: -4,
  },
  maskImageTransparent: {
    position: 'absolute',
    width,
    height,
    opacity: 0.7,
  },
});

export default CameraStyle;
