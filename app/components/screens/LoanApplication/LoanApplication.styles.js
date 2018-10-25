import { StyleSheet, Dimensions } from 'react-native';
import {COLORS} from "../../../config/constants/style";

const { width } = Dimensions.get('window')

const LoanApplicationStyle = StyleSheet.create({
  loanAmountCard: {
    padding: 15,
    width: (width - 200) / 2,
    minWidth: 130,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loanAmountCardActive: {
    backgroundColor: COLORS.green,
  },
  cardWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loanAmountText: {
    color: '#3D4853',
    fontFamily: 'agile-medium',
    fontSize: 20,
    lineHeight: 25,
  },
  loanAmountPercentage: {
    color: '#3D4853',
    fontFamily: 'agile-light',
    fontSize: 14,
    lineHeight: 20,
  }
});

export default LoanApplicationStyle;
