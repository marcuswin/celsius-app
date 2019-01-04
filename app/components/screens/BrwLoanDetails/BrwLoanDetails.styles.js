import { Dimensions, StyleSheet } from "react-native";
import { COLORS, FONT_SCALE } from "../../../config/constants/style";

const { width } = Dimensions.get('window');

const BrwLoanDetailsStyle = StyleSheet.create({
  amountWrapper: {
    width,
    backgroundColor: 'white',
    paddingHorizontal: 40,
    paddingVertical: 10,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    shadowOpacity: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  usdAmount: {
    color: '#3D4853',
    fontFamily: 'agile-medium',
    fontSize: FONT_SCALE * 32,
  },
  cryptoAmount: {
    color: '#3D4853',
    fontFamily: 'agile-light',
    fontSize: FONT_SCALE * 14,
  },
  iconWrapper: {
    height: 32,
    width: 32,
    borderRadius: 16,
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoDetail: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between'
  },
  text: {
    fontFamily: 'agile-bold',
    fontSize: FONT_SCALE * 18,
    color: "rgba(61,72,83,1)",
  },
  info: {
    fontFamily: 'agile-light',
    fontSize: FONT_SCALE *  18,
    color: "rgba(61,72,83,1)",
  }
});

export default BrwLoanDetailsStyle;
