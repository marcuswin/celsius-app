import { StyleSheet, Dimensions, Platform } from 'react-native';
import {FONT_SCALE} from "../../../config/constants/style";

const { width, height } = Dimensions.get('window');

const CameraStyles = StyleSheet.create({
  // header: {
  //   backgroundColor: 'transparent',
  //   paddingRight: 40,
  //   paddingLeft: 20,
  //   borderBottomColor: 'transparent',
  // },
  backButton: {
    position: 'absolute',
    left: 40,
    bottom: 0
  },
  flipCamera: {
    position: 'absolute',
    right: 40,
    bottom: 0,
  },
  flipCameraImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
  backArrow: {
    color: 'white',
    fontSize: FONT_SCALE * 33,
    marginLeft: -10
  },
  backButtonText: {
    color: 'white',
    marginLeft: -20
  },
  heading: {
    color: 'white',
    fontSize: FONT_SCALE * 18,
  },
  headingWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  takePictureButton: {
    height: 100,
    width: '100%',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    paddingLeft: 40,
    paddingRight: 40,
    justifyContent: 'center'
  }
});

export default CameraStyles;
