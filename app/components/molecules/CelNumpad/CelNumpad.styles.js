// import STYLES from '../../../constants/STYLES';
import { Dimensions } from "react-native";
import { getThemedStyle } from "../../../utils/styles-util";

const { width, height } = Dimensions.get("window");

// TODO: make responsive
const base = {
  container: {
    width: width + 10,
    height: 400,

    position: "absolute",
    zIndex: 200,
    top: height - 500,
    left: -5,

    alignItems: "center",
    justifyContent: "center"
  },
  buttonsWrapper: {
    width: 240,
    height: 240
  },
  buttonsRow: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 60,
    width: 60
  }
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const CelNumpadStyle = () => getThemedStyle(base, themed);

export default CelNumpadStyle;
