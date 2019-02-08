// import STYLES from '../../../constants/STYLES';
import { Dimensions } from "react-native";

import { getThemedStyle } from "../../../utils/styles-util";

const { width } = Dimensions.get("window");

const base = {
  card: {
    marginLeft: 2,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2
  },
  full: {
    width: width - 40 - 5
  },
  half: {
    width: (width - 40) / 2 - 5
  }
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const CardStyle = () => getThemedStyle(base, themed);

export default CardStyle;
