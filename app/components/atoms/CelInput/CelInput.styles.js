// import { StyleSheet } from 'react-native';
import {FONT_SCALE, STYLES} from "../../../config/constants/style";

const CelInputStyle = {
// wrapper
  wrapper: {
    paddingLeft: 10,
    paddingRight: 18,
    paddingBottom: 5,
    paddingTop: 5,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: STYLES.INPUT_BACKGROUND_COLOR_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
// item
  item: {
    borderBottomColor: 'transparent',
    borderColor: 'white',
  },
// input
  input: {
    color: STYLES.INPUT_COLOR_WHITE,
    fontFamily: 'agile-bold',
    fontSize: FONT_SCALE * 20,
    borderColor: 'rgba(255,255,255,0)',
    // minHeight: 50,
    marginLeft: -5,
  },
// label
  label: {
    color: STYLES.INPUT_LABEL_COLOR_WHITE,
    fontFamily: 'agile-light',
    fontSize: 18,
    opacity: 0.5,
    top: -20,
    position: 'absolute',
  },
// labelActive
  labelActive: {
    color: 'white',
    // opacity: 1,
    opacity: 0.5,
    fontSize: 12,
    top: 0,
    fontFamily: 'agile-light',
    position: 'absolute',
  },
};

export default CelInputStyle;
