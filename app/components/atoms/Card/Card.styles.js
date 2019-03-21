import STYLES from '../../../constants/STYLES';

import { getThemedStyle, widthPercentageToDP } from "../../../utils/styles-util";

const base = {
  card: {
    marginLeft: 2,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    ...STYLES.SHADOW_STYLES
  },
  full: {
    width: widthPercentageToDP("89.07%")
  },
  half: {
    width: widthPercentageToDP("41%")
  },
  third: {
    width: widthPercentageToDP("26.93%")
  }
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const CardStyle = () => getThemedStyle(base, themed);

export default CardStyle;
