import { StyleSheet } from 'react-native';

import {FONT_SCALE, STYLES} from "../../config/constants/style";

const Styles = StyleSheet.create({
  content: {
    backgroundColor: STYLES.PRIMARY_BLUE,
    paddingLeft: 40,
    paddingRight: 40,
  },
  buttonWrapper: {
    paddingTop: 40,
    paddingBottom: 40
  },
  disabledForm: {
    opacity: 0.5
  },
  description: {
    paddingTop: 20,
    fontSize: FONT_SCALE * 18,
    fontFamily: 'agile-light',
    color: '#fff'
  },
});

export default Styles;
