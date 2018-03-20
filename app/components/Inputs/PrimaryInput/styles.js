import { StyleSheet } from 'react-native';
import {FONT_SCALE, STYLES} from "../../../config/constants/style";

const PrimaryInputStyles = StyleSheet.create({
  wrapper: {
    paddingLeft: 18,
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
    borderColor: 'rgba(255,255,255,0)'
  },
  label: {
    color: STYLES.INPUT_LABEL_COLOR_WHITE,
    fontFamily: 'agile-light',
    opacity: 0.5,
    top: 0
  }
});

export default PrimaryInputStyles;
