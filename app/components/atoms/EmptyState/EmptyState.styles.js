import { Dimensions } from "react-native";

// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const { height } = Dimensions.get('window')

const base = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 0.8 * height
  }
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const EmptyStateStyle = (theme) => getThemedStyle(theme, base, themed);

export default EmptyStateStyle;
