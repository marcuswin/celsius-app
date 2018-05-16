import { StyleSheet } from 'react-native';
import {FONT_SCALE} from "../../../config/constants/style";

const SeparatorStyle = StyleSheet.create({
  centeredColumn: {
    justifyContent: 'center',
    alignItems: 'center',
    // height: 120,
  },
  dummyBorder: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  middleBorderText: {
    fontFamily: 'agile-medium',
    fontSize: FONT_SCALE * 14,
    opacity: 0.5,
    color: '#88A2C7',
    lineHeight: FONT_SCALE * 17,
    textAlign: 'center',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(200,200,200,0.3)'
  },
});

export default SeparatorStyle;
