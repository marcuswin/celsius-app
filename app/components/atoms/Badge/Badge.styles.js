// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    borderRadius: 5,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start"
  }
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const BadgeStyle = () => getThemedStyle(base, themed);

export default BadgeStyle;
