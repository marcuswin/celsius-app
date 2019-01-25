import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from "../../../config/constants/style";
import { heightPercentageToDP, widthPercentageToDP, normalize } from "../../../utils/styles-util";

const { width } = Dimensions.get('window')

const LoanApplicationStyle = StyleSheet.create({
  loanAmountCard: {
    paddingVertical: heightPercentageToDP("1.8%"),
    width: widthPercentageToDP("76%"),
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  loanAmountCardActive: {
    backgroundColor: COLORS.green,
  },
  choose: {
    fontSize: normalize(18),
    marginBottom: heightPercentageToDP("0.8%")
  },
  cardWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    color: '#3D4853',
    fontFamily: 'agile-medium',
    fontSize: normalize(18),
  },
  subText: {
    color: '#3D4853',
    fontFamily: 'inconsolata-regular',
    fontSize: normalize(14),
    marginRight: 5
  },
  bottomCard: { paddingVertical: heightPercentageToDP("2%"), flexDirection: 'row' },
  leftBox: { paddingLeft: widthPercentageToDP("10%"), width: width / 2, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#3D4853' },
  rightBox: { paddingRight: widthPercentageToDP("10%"), width: width / 2, alignItems: 'center', justifyContent: 'center' }
});

export default LoanApplicationStyle;
