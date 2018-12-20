import { StyleSheet } from 'react-native';
import { STYLES } from "../../../config/constants/style";
import { heightPercentageToDP, widthPercentageToDP } from "../../../utils/scale";
import { normalize } from "../../../utils/styles-util";

const dot = {
  width: widthPercentageToDP("3.2%"),
  height: widthPercentageToDP("3.2%"),
  borderRadius: widthPercentageToDP("1.6%"),
  marginRight: 5
};

const triangle = {
  width: 0,
  height: 0,
  backgroundColor: 'transparent',
  borderStyle: 'solid',
  borderLeftWidth: widthPercentageToDP("1.665%"),
  borderRightWidth: widthPercentageToDP("1.665%"),
  borderBottomWidth: widthPercentageToDP("2.33%"),
  borderLeftColor: 'transparent',
  borderRightColor: 'transparent',
  borderBottomColor: 'black'
};

const GenerateApiKeyModalStyle = StyleSheet.create({
  explanation: {
    color: STYLES.GRAY_2,
    fontSize: normalize(18),
    fontFamily: 'agile-extra-light',
  },
  yellowDot: {
    ...dot,
    backgroundColor: "rgba(248,192,25,1)"
  },
  grayDot: {
    ...dot,
    backgroundColor: "rgba(242,242,242,1)"
  },
  textAlignment: {
    textAlign: "left",
    marginTop: heightPercentageToDP("1%")
  },
  dotText: {
    color: STYLES.GRAY_2,
    fontSize: normalize(14),
    fontFamily: 'agile-extra-light',
  },
  triangleDown: {
    ...triangle,
    transform: [
      { rotate: '90deg' }
    ],
  },
  pie: {
    width: widthPercentageToDP("43.78%"),
    height: widthPercentageToDP("43.78%"),
    borderRadius: widthPercentageToDP("21.89%"),
    resizeMode: "contain",
    marginTop: heightPercentageToDP("1.27%")
  },
  shareCopyView: {
    marginTop: heightPercentageToDP("2.46%")
  }
});

export default GenerateApiKeyModalStyle;
