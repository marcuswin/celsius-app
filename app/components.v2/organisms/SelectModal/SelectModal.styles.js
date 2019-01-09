import { StyleSheet } from 'react-native';
import {FONT_SCALE, STYLES} from "../../../config/constants/style";

const SelectCoinStyles = StyleSheet.create({
  header: {
    backgroundColor: STYLES.PRIMARY_BLUE,
    paddingRight: 40,
    paddingLeft: 20,
    borderBottomColor: 'transparent',
    alignItems: 'center'
  },
  headerTitle: {
    color: 'white',
    fontSize: FONT_SCALE * 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'agile-medium'
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
  modal: {

  },
  modalText: {
    color: '#3f2949',
    marginTop: 10
  },
  coinTitle: {
    fontSize: FONT_SCALE * 18,
    fontFamily: 'agile-medium'
  },
  shortTitle: {
    fontSize: FONT_SCALE * 14,
    fontFamily: 'agile-extra-light'
  },
});

export default SelectCoinStyles;
