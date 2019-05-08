// import STYLES from '../../../constants/STYLES';
import { Dimensions } from "react-native";
import { getThemedStyle } from "../../../utils/styles-util";

const { width } = Dimensions.get("window");

const base = {
  container: {
    flex: 1,
    width
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  selectWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  amounts: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center'
  }
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const CelPayEnterAmountStyle = () => getThemedStyle(base, themed);

export default CelPayEnterAmountStyle;
