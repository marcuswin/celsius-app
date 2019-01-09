import { StyleSheet, Dimensions, Platform } from 'react-native';
import { FONT_SCALE, STYLES } from "../../../config/constants/style";

const { height, width } = Dimensions.get('window');
const imageSize = width - 60

const CameraStyle = StyleSheet.create({
  content: {
    flex: 1
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
  previewView: {
    // height: 0.88 * height,
    // justifyContent: 'space-between',
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
    marginHorizontal: 40,
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
  cameraView: {
    position: 'absolute',
    width,
    height,
    zIndex: -4,
    flexDirection: 'row',
    alignItems: 'center'
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
    width: imageSize,
    height: imageSize
  },
  backBtn: {
    color: 'white',
    paddingLeft: 5,
    textAlign: 'right',
    opacity: 0.8,
    marginTop: 2,
    fontSize: FONT_SCALE * 18,
    fontFamily: 'agile-medium',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.15)',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  outerCircle: {
    height: 50,
    width: 50,
    borderRadius: 33,
    borderWidth: 5,
    padding: 5,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    height: 37,
    width: 37,
    borderRadius: 22,
    backgroundColor: 'white',
  },
  imageView: {
    backgroundColor: STYLES.PRIMARY_BLUE,
    position: 'absolute',
    width,
    height,
    zIndex: -5
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
    borderWidth: 5,
    borderColor: "#4a5eaa",
    alignSelf: 'center'
  },
});

export default CameraStyle;
