import { StyleSheet } from 'react-native';
import {FONT_SCALE, STYLES} from "../../../config/constants/style";

const CelSelectStyle = StyleSheet.create({
// label
  selectLabel: {
    color: STYLES.INPUT_LABEL_COLOR_WHITE,
    fontFamily: 'agile-light',
    fontSize: FONT_SCALE * 20,
    opacity: 0.8,
  },
// labelActive
  selectLabelActive: {
    color: 'white',
    fontSize: FONT_SCALE * 12,
    opacity: 0.8,
    fontFamily: 'agile-light',
    position: 'absolute',
    top: 5,
    left: 18,
  },

});

export default CelSelectStyle;
