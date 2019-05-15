import { Dimensions } from "react-native";
import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const { width } = Dimensions.get("window");

const base = {
  container: {
    flex: 1,
    height: "100%",
    width,
  },
  wrapper: {
    paddingHorizontal: 20,
    flex: 1,
  },
  selectWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectedAmount: {
    borderBottomWidth: 1,
    paddingBottom: 2,
    borderColor: STYLES.COLORS.CELSIUS_BLUE
  }
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const WithdrawEnterAmountStyle = () => getThemedStyle(base, themed);

export default WithdrawEnterAmountStyle;
