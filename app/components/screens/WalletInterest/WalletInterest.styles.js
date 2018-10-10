import { StyleSheet } from "react-native";
import { COLORS, FONT_SCALE} from "../../../config/constants/style";

const pillText = {
  fontSize: FONT_SCALE * 18,
  color: 'rgba(137,144,153,0.5)',
  textAlign: 'center',
  fontFamily: 'agile-light',
};

const baseWrapper = {
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  borderWidth: 0.5,
  borderColor: 'rgba(137,144,153,0.5)',
  height: 30,
};

const dot = {
  width: 12,
  height: 12,
  borderRadius: 6,
  marginRight: 5
};

const WalletInterestStyle = StyleSheet.create({
  graphAndInterestWrapper: {
    marginTop: 24,
    marginBottom: 30,
  },
  thisWeekInterestWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  interestIconWrapper: {
    backgroundColor: COLORS.blue,
    width: 36,
    height: 36,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
    borderWidth: 1,
    paddingLeft: 3,
    borderColor: "white",
    marginTop: 20
  },
  interestTextWrapper: {
    flexDirection: 'column',
    margin: 'auto',
    marginTop: 15
  },
  thisWeekText : {
    color: '#3D4853',
    fontSize: 15 * FONT_SCALE,
    textAlign: 'left',
    fontFamily: 'agile-light'
  },
  thisWeekInterest : {
    color: '#3D4853',
    fontSize: 30 * FONT_SCALE,
    textAlign: 'left',
    fontFamily: 'agile-medium'
  },
  title: {
    fontFamily: "agile-medium",
    textAlign: "left",
    fontSize: 21 * FONT_SCALE,
    color: "#3D4853",
    marginBottom: 11
  },
  explanation: {
    fontFamily: "agile-light",
    textAlign: "left",
    fontSize: 18 * FONT_SCALE,
    color: "#3D4853",
    marginBottom: 24
  },
  currencyInterest: {
    marginBottom: 34
  },
  dotWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: 40,
    marginLeft: 40,
    marginTop: 30,
    marginBottom: 20,
  },
  dotText: {
    fontFamily: 'agile-light',
    fontSize: 12 * FONT_SCALE,
    textAlign: 'left',
    color: 'rgba(137,144,153,1)',
    marginRight: 5
  },
  dot: {
    ...dot,
  },
  pillWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    marginLeft: 20
  },
  monthTO: { width: '33.3%' },
  monthWrapper: {
    ...baseWrapper,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15
  },
  monthWrapperActive: {
    ...baseWrapper,
    backgroundColor: 'rgba(137,144,153,0.5)',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15
  },
  threeMonthTO: { width: '33.3%' },
  threeMonthWrapper: {
    ...baseWrapper,
  },
  threeMonthWrapperActive: {
    ...baseWrapper,
    backgroundColor: 'rgba(137,144,153,0.5)',
  },
  yearTO: { width: '33.3%' },
  yearWrapper: {
    ...baseWrapper,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15
  },
  yearWrapperActive: {
    ...baseWrapper,
    backgroundColor: 'rgba(137,144,153,0.5)',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15
  },
  pillTextActive: {
    ...pillText,
    color: 'white'
  },
   pillText,
  dots: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10
  }
});

export default WalletInterestStyle;






