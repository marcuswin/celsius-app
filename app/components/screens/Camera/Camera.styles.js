import { StyleSheet, Dimensions, Platform } from 'react-native';
import {FONT_SCALE} from "../../../config/constants/style";

const { height, width } = Dimensions.get('window');

const CameraStyle = StyleSheet.create({
  content: {
    paddingLeft: 40,
    paddingRight: 40,
    height,
  },
  camera: Platform.OS === 'ios' ? {
    flex: 1,
  } : {
    height,
    width: 1.24 * width,
    position: 'absolute',
    left: -0.12 * width,
    paddingLeft: 0.12 * width,
    paddingRight: 0.12 * width,
  },
  androidWrapper: Platform.OS === 'ios' ? {
    flex: 1,
  } : {
    position: 'absolute',
    height,
    width,
    left: 0.12 * width,
    paddingBottom: 20,
    zIndex: 20,
  },
  view: {
    height: 0.88 * height,
    justifyContent: 'space-between',
  },
  flipCameraImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain'
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
    left: 0,
    zIndex: -5,
  },
  cameraPhoto: {
    position: 'absolute',
    width,
    height,
    zIndex: -5,
  },
});

export default CameraStyle;
