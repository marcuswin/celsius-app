
import { getThemedStyle, heightPercentageToDP, widthPercentageToDP } from "../../../utils/styles-util";
import { COLORS, FONT_SCALE, STYLES } from "../../../config/constants/style";

const currencyImageSize = widthPercentageToDP("10.67%");

const base = {
  container: {
    flex: 1
  },
  mainWrapper: {
    borderColor: "rgba(200,200,200,0.3)",
    borderBottomWidth: 1,
    paddingVertical: 11,
    marginVertical: 15
  },
  mainWrapperCompact: {
    borderTopWidth: 0,
    marginVertical: 0
  },
  mainInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  imageWrapper: {
    width: currencyImageSize,
    height: currencyImageSize,
    marginRight: 11,
  },
  currencyImage: {
    width: currencyImageSize,
    height: currencyImageSize
  },
  infoWrapper: {
  },
  currencyName: {
    fontFamily: "barlow-medium",
    fontSize: FONT_SCALE * 15,
    marginBottom: 2
  },
  currencyShort: {
    fontFamily: "barlow-medium",
    fontSize: FONT_SCALE * 18,
    color: COLORS.gray
  },
  imageInfoWrapper: {
    flexDirection: "row",
    paddingVertical: heightPercentageToDP("3.5%"),
    marginLeft: 10
  },
  celRateWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.green,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    width: widthPercentageToDP("36%"),
    height: heightPercentageToDP("5%")
  },
  regularRateWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F3F3F3",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    width: widthPercentageToDP("36%"),
    height: heightPercentageToDP("5%")
  },
  usdInfoWrapper: {
    marginTop: 10,
    backgroundColor: STYLES.GRAY_3,
    borderRadius: 5,
    padding: 10
  },
  regularRateText: {
    color: "#000",
    fontFamily: "barlow-regular",
    fontSize: FONT_SCALE * 12,
  },
  celRateText: {
    color: "#fff",
    fontFamily: "barlow-semi-bold",
    fontSize: FONT_SCALE * 16,
  },
  regRateText: {
    color: "#000",
    fontFamily: "barlow-semi-bold",
    fontSize: FONT_SCALE * 16,
  },
  celsiusRateText: {
    color: "#fff",
    fontFamily: "barlow-regular",
    fontSize: FONT_SCALE * 12,
  }
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const InterestRateInfoStyle = () => getThemedStyle(base, themed);

export default InterestRateInfoStyle;
