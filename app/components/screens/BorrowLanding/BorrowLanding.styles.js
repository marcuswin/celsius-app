// import STYLES from '../../../constants/STYLES';
import {
  getThemedStyle,
  widthPercentageToDP,
} from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  buttonsWrapper: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },
  buttonsIconText: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
  },
  buttonIconText: {
    flex: 0.5,
    marginLeft: widthPercentageToDP("1.3%"),
    marginRight: widthPercentageToDP("1.3%"),
  },
  buttonItself: {
    justifyContent: "space-around",
    flex: 1,
  },
  buttonIconHand: {
    alignSelf: "center",
    width: 25,
    height: 29,
    marginBottom: 5,
    marginTop: 6,
  },
  buttonIconCalc: {
    alignSelf: "center",
    width: 25,
    height: 25,
    marginBottom: 5,
    marginTop: 6,
  },
  firstLoanWrapper: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    paddingTop: "20%",
  },
  firstLoanTitle: {
    marginTop: 10,
    marginBottom: 10,
  },
  firstLoanSubtitle: {
    marginRight: 25,
    marginLeft: 25,
  },
  firstLoanButton: {
    marginTop: 20,
    marginBottom: 20,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const BorrowLandingStyle = () => getThemedStyle(base, themed);

export default BorrowLandingStyle;
