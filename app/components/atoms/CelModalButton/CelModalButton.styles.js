// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flexDirection: "row",
    height: 50,
  },
  buttonStyle: {
    flex: 1,
    borderWidth: 2,
    borderStyle: "solid",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const CelModalButtonStyle = () => getThemedStyle(base, themed);

export default CelModalButtonStyle;
