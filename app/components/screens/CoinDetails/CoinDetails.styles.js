// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    paddingHorizontal: 20
  },
  buttons: {
    position: "absolute",
    right: 0,
    bottom: 0,
    top: 0,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  coinAmountWrapper: {
    flexDirection: "row",
    // justifyContent: "space-around",
  },
  amountFlexBox: {
    width: '75%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageWrapper: {
    padding: 10
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
    backgroundColor: 'black',
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
