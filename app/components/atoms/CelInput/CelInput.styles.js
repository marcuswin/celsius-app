// import { StyleSheet } from 'react-native';
import {FONT_SCALE, STYLES} from "../../../config/constants/style";

const CelInputStyle = {
// wrapper
  wrapper: {
    paddingLeft: 18,
    paddingRight: 18,
    paddingBottom: 14,
    paddingTop: 23,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: 'rgba(256, 256, 256, 0.15)',
    height: 60,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
// item
  item: {
    borderBottomColor: 'transparent',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
// input
  input: {
    color: STYLES.INPUT_COLOR_WHITE,
    fontFamily: 'agile-bold',
    fontSize: FONT_SCALE * 20,
    // borderColor: 'rgba(255,255,255,0)',
    // minHeight: 50,
    // marginLeft: -5,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    height: 23,
    top: 0,
    // position: 'absolute'
  },
// label
  label: {
    color: STYLES.INPUT_LABEL_COLOR_WHITE,
    fontFamily: 'agile-light',
    fontSize: FONT_SCALE * 20,
    // fontSize: 18,
    opacity: 0.8,
    top: -18,
    position: 'absolute',
  },
// labelActive
  labelActive: {
    color: 'white',
    fontSize: FONT_SCALE * 12,
    opacity: 0.8,
    top: -10,
    fontFamily: 'agile-light',
    position: 'absolute',
  },
};

export default CelInputStyle;
