import { Dimensions, StyleSheet } from "react-native";
import { FONT_SCALE, STYLES } from "../../../config/constants/style";

const { width } = Dimensions.get('window');

const NoKycStyle = StyleSheet.create({
  image: {
    width: width / 2.5,
    height: width / 2.5,
    marginTop: 15,
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  textOne: {
    fontFamily: 'agile-medium',
    fontSize: FONT_SCALE * 21,
    textAlign: 'center',
    color: 'rgba(61,72,83,1)',
    marginBottom: 10,
  },
  textTwo: {
    fontFamily: 'agile-light',
    fontSize: FONT_SCALE * 17,
    textAlign: 'center',
    color: 'rgba(61,72,83,1)',
    marginBottom: 30,
    marginTop: 35
  },
  textThree: {
    fontFamily: 'agile-light',
    fontSize: FONT_SCALE * 18,
    textAlign: 'center',
    color: 'rgba(61,72,83,1)',
  },
  circleYellow: {
    marginLeft: 8,
    marginRight: 8,
    width: FONT_SCALE * 14,
    height: FONT_SCALE * 14,
    borderRadius: FONT_SCALE * 14/2,
    backgroundColor: 'rgba(225,159,48,1)',
  },
  circleRed: {
    marginLeft: 8,
    marginRight: 8,
    width: FONT_SCALE * 14,
    height: FONT_SCALE * 14,
    borderRadius: FONT_SCALE * 14/2,
    backgroundColor: 'rgba(239,70,26,1)',
  },
  statusWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  yellowText: {
    fontFamily: 'agile-medium',
    fontSize: FONT_SCALE * 20,
    textAlign: 'center',
    color: 'rgba(225,159,48,1)',
  },
  redText: {
    fontFamily: 'agile-medium',
    fontSize: FONT_SCALE * 20,
    textAlign: 'center',
    color: 'rgba(239,70,26,1)',
  },
  textButton: {
    color: STYLES.PRIMARY_BLUE
  }
});

export default NoKycStyle;
