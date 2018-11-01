import { StyleSheet, Dimensions } from 'react-native';
import {COLORS} from "../../../config/constants/style";
import { heightPercentageToDP, widthPercentageToDP } from "../../../utils/scale";
import {normalize} from "../../../utils/styles-util";

const { width } = Dimensions.get('window')

const LoanApplicationStyle = StyleSheet.create({
  loanAmountCard: {
    paddingHorizontal: widthPercentageToDP("7.5%"),
    paddingVertical: heightPercentageToDP("1.8%"),
    width: widthPercentageToDP("34%"),
    marginHorizontal: widthPercentageToDP("4.53%"),
    marginVertical: heightPercentageToDP("1.29%"),
    alignItems: 'center',
    justifyContent: 'center',
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
    fontFamily: 'agile-light',
    fontSize: normalize(14),
  },
  bottomCard: { paddingVertical: heightPercentageToDP("2%"), flexDirection: 'row' },
  leftBox: {paddingLeft: widthPercentageToDP("10%"), width: width/2, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#3D4853' },
  rightBox: {  paddingRight: widthPercentageToDP("10%"),width: width/2, alignItems: 'center', justifyContent: 'center' }
});

export default LoanApplicationStyle;
