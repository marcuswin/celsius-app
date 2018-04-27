import { StyleSheet } from 'react-native';
import {FONT_SCALE} from "../../../config/constants/style";

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
