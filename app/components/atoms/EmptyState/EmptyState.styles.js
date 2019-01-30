// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth:1,
    borderColor: 'black',
  }
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const EmptyStateStyle = (theme) => getThemedStyle(theme, base, themed);

export default EmptyStateStyle;
