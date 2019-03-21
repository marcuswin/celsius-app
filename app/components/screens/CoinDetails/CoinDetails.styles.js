// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    paddingHorizontal: 20
  },
  buttonWrapper: {
    flexDirection: "row",
    paddingHorizontal: 12
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
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  interestRateWrapper: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  }
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const CoinDetailsStyle = () => getThemedStyle(base, themed);

export default CoinDetailsStyle;
