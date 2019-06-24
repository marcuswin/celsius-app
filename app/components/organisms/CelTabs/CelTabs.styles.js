// import STYLES from '../../../constants/STYLES';
import { getThemedStyle, heightPercentageToDP, widthPercentageToDP } from "../../../utils/styles-util";

const base = {
  tabs: {
    flexDirection: "row",
    height: heightPercentageToDP("5%"),
    justifyContent: "space-around",
    paddingHorizontal: widthPercentageToDP("5.33%"),
    marginTop: heightPercentageToDP("2.02%"),
  },
  activeTabContent : {
    height: heightPercentageToDP("65%"),
    flexDirection: 'column',
  },
  active: {
    marginTop: 5,
    width: widthPercentageToDP("3.5%"),
    borderTopColor: "rgba(65,86,166,1)",
    borderTopWidth: 1
  },
};

const themed = {
    light: {
    },

    dark: {
    },

    celsius: {
    }
}

const CelTabsStyle = () => getThemedStyle(base, themed);

export default CelTabsStyle
