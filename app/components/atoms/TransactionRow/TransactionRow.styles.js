import { StyleSheet } from 'react-native';
import {FONT_SCALE, COLORS} from "../../../config/constants/style";

const lightText = {
  fontFamily: 'agile-light',
  fontSize: FONT_SCALE * 14,
}

const TransactionRowStyle = StyleSheet.create({
  title: {
    fontSize: FONT_SCALE * 14,
    fontFamily: 'agile-light',
    color: COLORS.GRAY_2,
    marginTop: 10,
    marginBottom: 10,
  },
  listItem: {
    marginLeft: 0,
    marginRight: 0,
    paddingRight: 0,
    paddingLeft: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#C8C8C8',
  },
  usdAmount: {
    fontFamily: 'agile-medium',
    fontSize: FONT_SCALE * 21,
    color: '#3D4853',
  },
  coinAmount: {
    ...lightText,
  },
  time: {
    ...lightText,
  },
  status: {
    fontFamily: 'agile-medium',
    marginTop: 6,
    fontSize: FONT_SCALE * 15,
    alignSelf: 'flex-end',
  },
  iconWrapper: {
    backgroundColor: COLORS.blue,
    width: 32,
    height: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    // paddingLeft: 3,
    borderColor: 'white',
  }
});

export default TransactionRowStyle;
