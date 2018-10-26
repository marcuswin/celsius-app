import { StyleSheet } from "react-native";
import { COLORS, FONT_SCALE, STYLES, GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import { heightPercentageToDP, widthPercentageToDP } from "../../../utils/scale";
import {normalize} from "../../../utils/styles-util";

const OnBoardingCurrencyInterestRateInfoStyle = StyleSheet.create({
  mainWrapper: {
    marginBottom: heightPercentageToDP("2.46%"),
    width: widthPercentageToDP("64%"),
    height: heightPercentageToDP("7.64%"),
    borderRadius: 8,
    ...globalStyles.shadow,
    backgroundColor: "rgba(92,110,180,1)",
    paddingLeft: widthPercentageToDP("4.53%"),
    paddingRight: widthPercentageToDP("4.53%"),
    paddingTop: heightPercentageToDP("1.2%"),

  },
  mainWrapperCompact: {
    borderTopWidth: 0,
    marginVertical: 0,
  },
  mainInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageWrapper: {
    marginRight: widthPercentageToDP("2.77%"),
  },
  currencyImage: {
    width: widthPercentageToDP("8.96%"),
    height: heightPercentageToDP("4.09%"),
  },
  infoWrapper: {},
  currencyName: {
    fontFamily: 'agile-medium',
    fontSize: normalize(17),
    color: '#fff',
  },
  currencyShort: {
    fontSize: normalize(12),
    color: "white",
  },
  rateWrapper: {
    width: widthPercentageToDP("14.93%"),
    height: heightPercentageToDP("3.94%"),
    marginLeft: 'auto',
    backgroundColor: COLORS.green,
    borderRadius: 8,
    paddingVertical: heightPercentageToDP("0.67%"),
    paddingLeft: widthPercentageToDP("2.2%")
  },
  usdInfoWrapper: {
    marginTop: 10,
    backgroundColor: STYLES.GRAY_3,
    borderRadius: 5,
    padding: 10,
  },
  rateText: {
    fontFamily: "inconsolata-regular",
    color: '#fff',
    fontSize: normalize(15)
  },
});

export default OnBoardingCurrencyInterestRateInfoStyle;
