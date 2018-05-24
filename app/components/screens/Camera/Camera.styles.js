import { StyleSheet, Dimensions } from 'react-native';
import {FONT_SCALE} from "../../../config/constants/style";

const { height, width } = Dimensions.get('window');

const CameraStyle = StyleSheet.create({
  content: {
    paddingLeft: 40,
    paddingRight: 40,
    height,
  },
  mask: {
    height: height - 120,
    justifyContent: 'space-between',
  },
  heading: {
    marginTop: 40,
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
  cameraPhoto: {
    position: 'absolute',
    top: 0,
    left: -40,
    width,
    height,
    zIndex: -5,
  },
  bottomSection: {
  }
});

export default CameraStyle;
