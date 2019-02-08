import { StyleSheet } from 'react-native';
import { COLORS, FONT_SCALE } from "../../../config/constants/style";

const lightText = {
  fontFamily: 'agile-light',
  fontSize: FONT_SCALE * 14,
}

const BrwAllLoansStyle = StyleSheet.create({
  loanRowWrapper: {
    flexDirection: 'row',
    marginLeft: 0,
    marginRight: 0,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#C8C8C8',
  },
  lockIconWrapper: {
    paddingLeft: 1,
    backgroundColor: COLORS.blue,
    width: 32,
    height: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
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
});

export default BrwAllLoansStyle;
