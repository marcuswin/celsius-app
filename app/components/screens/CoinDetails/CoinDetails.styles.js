// import STYLES from '../../../constants/STYLES';
import { getThemedStyle, widthPercentageToDP } from "../../../utils/styles-util";

const base = {
  container: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  buttonWrapper: {
    flexDirection: "row",
    paddingHorizontal: 12,
    // justifyContent: "center"
  },
  buttons: {
    marginLeft: 10,
    justifyContent: 'center'
  },
  coinAmountWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amountFlexBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12
  },
  coinImage: {
    width: 30,
    height: 30,
  },
  separator: {
    right: 0,
    position: 'absolute'
  },
  interestCardWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: widthPercentageToDP("3%"),
    paddingHorizontal: widthPercentageToDP("3%"),

  },
  interestRateWrapper: {
    justifyContent: 'space-between',
    alignContent: 'center',
    
  }
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const CoinDetailsStyle = () => getThemedStyle(base, themed);

export default CoinDetailsStyle;
