import { StyleSheet } from 'react-native';
import { COLORS, FONT_SCALE } from "../../../config/constants/style";

const pillText = {
  fontSize: FONT_SCALE * 14,
  color: 'white',
  textAlign: 'center',
  fontFamily: 'agile-light',
}

const baseWrapper = {
  alignItems: 'center',
  justifyContent: 'center',
}

const InterestExplanationStyle = StyleSheet.create({
  pillWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  balancesTO: { width: '50%' },
  balancesWrapper: {
    ...baseWrapper,
    backgroundColor: COLORS.blue,
    height: 30,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15
  },
  balancesWrapperActive: {
    ...baseWrapper,
    backgroundColor: COLORS.blue,
    height: 40,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20
  },
  timeTO: { width: '25%' },
  timeWrapper: {
    ...baseWrapper,
    backgroundColor: COLORS.green,
    height: 30,
    marginLeft: 1,
    marginRight: 1,
  },
  timeWrapperActive: {
    ...baseWrapper,
    backgroundColor: COLORS.green,
    height: 40,
    marginLeft: 1,
    marginRight: 1,
  },
  hodlTO: { width: '25%' },
  hodlWrapper: {
    ...baseWrapper,
    backgroundColor: COLORS.yellow,
    height: 30,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15
  },
  hodlWrapperActive: {
    ...baseWrapper,
    backgroundColor: COLORS.yellow,
    height: 40,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20
  },
  pillText,
  explanationWrapper: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  explanationHeading: {
    fontSize: FONT_SCALE * 15,
    fontFamily: 'agile-bold',
    marginBottom: 5,
  },
  explanationText: {
    fontSize: FONT_SCALE * 15,
    fontFamily: 'agile-light',
  },
  closeIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 11,
    height: 11,
  },
  italicText: {
    fontFamily: 'agile-light-italic',
    fontSize: FONT_SCALE * 15,

  }
});

export default InterestExplanationStyle;
