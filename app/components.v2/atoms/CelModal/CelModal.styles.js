import { Dimensions, StyleSheet } from "react-native";

const {width, height} = Dimensions.get('window');

const CelModalStyle = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width,
    height,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: 'rgba(61,72,83,0.85)',
  },
  modal: {
    width: 0.8 * width,
    maxHeight: 0.8 * height,
    backgroundColor: 'white',
    paddingTop: 50,
    paddingBottom: 30,
    borderRadius: 8,
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 20,
    height: 20,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  scrollView: {
    paddingLeft: 30,
    paddingRight: 30,
  }
});

export default CelModalStyle;
