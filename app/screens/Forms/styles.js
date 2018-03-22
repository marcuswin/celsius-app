import { StyleSheet } from 'react-native';

import {STYLES} from "../../config/constants/style";

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
    fontSize: 16,
    fontWeight: '300',
    fontFamily: 'agile-light'
  }
});

export default Styles;
