import { StyleSheet } from 'react-native';
import {FONT_SCALE} from "../../../config/constants/style";

const CameraStyles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    paddingRight: 40,
    paddingLeft: 20,
    borderBottomColor: 'transparent',
  },
  flipCamera: {
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
});

export default CameraStyles;
