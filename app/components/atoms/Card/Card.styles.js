// import STYLES from '../../../constants/STYLES';

import { getThemedStyle, widthPercentageToDP } from "../../../utils/styles-util";

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
    width: widthPercentageToDP("89.07%")
  },
  half: {
    width: widthPercentageToDP("41%")
  }
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const CardStyle = () => getThemedStyle(base, themed);

export default CardStyle;
