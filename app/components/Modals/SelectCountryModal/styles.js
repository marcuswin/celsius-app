import { StyleSheet, Platform } from 'react-native';
import {FONT_SCALE, STYLES} from "../../../config/constants/style";

const SelectCountryStyles = StyleSheet.create({
  header: {
    backgroundColor: STYLES.PRIMARY_BLUE,
    paddingRight: 40,
    paddingLeft: 20,
    borderBottomColor: 'transparent',
  },
  headerTitle: {
    color: 'white',
    fontSize: FONT_SCALE * 20,
    textAlign: 'left',
    marginLeft: Platform.OS === 'ios' ? -150 : 0
  },
  backArrow: {
    color: 'white',
    opacity: 0.8
  },
  backButtonText: {
    color: 'white',
    paddingLeft: 5,
    opacity: 0.8
  },
  modalText: {
    color: '#3f2949',
    marginTop: 10
  },
  coinTitle: {
    fontSize: FONT_SCALE * 18,
    fontFamily: 'agile-medium',
    textAlign: 'left'
  },
  shortTitle: {
    fontSize: FONT_SCALE * 14,
    fontFamily: 'agile-extra-light'
  },
});

export default SelectCountryStyles;
