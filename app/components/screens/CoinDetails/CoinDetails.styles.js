// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    paddingHorizontal: 20
  },
  buttonWrapper: {
    flexDirection: "row",
    paddingHorizontal: 12,
    // position: "absolute",
    // right: 0,
    // bottom: 0,
    // top: 0,
    // justifyContent: 'space-between',
    // paddingHorizontal: 15,
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
    // width: '75%',
    // paddingVertical: 10,
    // paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12
    // justifyContent: 'flex-start',
  },
  imageWrapper: {
    // padding: 10
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
