// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flexDirection: "row",
    width: "auto"
  }
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const SimpleSelectStyle = () => getThemedStyle(base, themed);

export default SimpleSelectStyle;
