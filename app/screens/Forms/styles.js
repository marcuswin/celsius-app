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
  checkboxStyle: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    resizeMode: 'center',
    height: 36,
    width: 36,
    borderRadius: 5
  },
  checkboxLabel: {
    color: '#ffffff',
    fontSize: FONT_SCALE * 16,
    fontWeight: '300',
    fontFamily: 'agile-light'
  },
  disabledForm: {
    opacity: 0.5
  },
  fakeInputWrapper: {
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
  fakeInputText: {
    color: STYLES.INPUT_LABEL_COLOR_WHITE,
    fontFamily: 'agile-light',
    opacity: 0.7,
    fontSize: FONT_SCALE * 18
  },
  description: {
    fontSize: FONT_SCALE * 18,
    fontFamily: 'agile-light',
    color: '#fff'
  }
});

export default Styles;
