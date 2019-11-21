// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
    height: 50,
    transform: [
      {
        translateY: 0.5,
      },
    ],
  },
  buttonStyle: {
    flex: 1,
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
