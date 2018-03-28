import {Dimensions, StyleSheet} from 'react-native';
import {FONT_SCALE, STYLES} from "../../config/constants/style";

const {width} = Dimensions.get('window');

const PrimaryInputStyles = StyleSheet.create({
  wrapper: {
    paddingLeft: 10,
    paddingRight: 18,
    paddingBottom: 5,
    paddingTop: 5,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: STYLES.INPUT_BACKGROUND_COLOR_WHITE,
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    borderBottomColor: 'transparent',
    borderColor: 'rgba(255,255,255,0)'
  },
  input: {
    color: STYLES.INPUT_COLOR_WHITE,
    fontFamily: 'agile-bold',
    fontSize: FONT_SCALE * 20,
    borderColor: 'rgba(255,255,255,0)',
    minHeight: 50,
    marginLeft: -5
  },
  label: {
    color: STYLES.INPUT_LABEL_COLOR_WHITE,
    fontFamily: 'agile-light',
    opacity: 0.5,
    top: 0
  },
  cameraImage: {
    marginTop: -20,
    width: 0.5 * width,
    height: 0.5 * width,
    borderRadius: 8,
  }
});

export default PrimaryInputStyles;
