// import STYLES from '../../../constants/STYLES';
import { Dimensions } from "react-native";
import { getThemedStyle } from "../../../utils/styles-util";

const { width, height } = Dimensions.get('window')

// TODO: make responsive
const base = {
  container: {
    width: width + 10,
    height: 400,

    position: 'absolute',
    zIndex: 200,
    top: height - 500,
    left: -5,
  }
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const CelNumpadStyle = () => getThemedStyle(base, themed);

export default CelNumpadStyle;
