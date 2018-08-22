import { StyleSheet } from "react-native";
import { COLORS, FONT_SCALE } from "../../../config/constants/style";

const currencyImageSize = 44;

const CurrencyInterestRateInfoStyle = StyleSheet.create({
  mainWrapper: {
    flexDirection: 'row',
    borderColor: 'rgba(200,200,200,0.3)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 11,
    alignItems: 'center',
    marginVertical: 15,
  },
  imageWrapper: {
    width: currencyImageSize,
    height: currencyImageSize,
    marginRight: 11,
  },
  currencyImage: {
    width: currencyImageSize,
    height: currencyImageSize,
  },
  infoWrapper: {},
  currencyName: {
    fontFamily: 'agile-medium',
    fontSize: FONT_SCALE * 21,
    marginBottom: 2,
  },
  currencyShort: {
    fontSize: FONT_SCALE * 16,
    color: COLORS.gray,
  },
  rateWrapper: {
    marginLeft: 'auto',
    backgroundColor: COLORS.green,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  rateText: {
    color: '#fff',
  },
});

export default CurrencyInterestRateInfoStyle;
