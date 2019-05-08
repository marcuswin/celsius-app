// import STYLES from '../../../constants/STYLES';
import { getThemedStyle, heightPercentageToDP, widthPercentageToDP } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1
  },
  text: { marginTop: heightPercentageToDP("1.25%") },
  secondText: { marginTop: heightPercentageToDP("0.5%") },
  amountsView: { flexDirection: "row", justifyContent: "space-around" },
  amountsCard: { marginTop: heightPercentageToDP("0.8%") },
  image: { alignItems: "center" },
  communityImage: {
    position: "absolute",
    left: 10,
    bottom: -10,
    resizeMode: "cover",
    height: widthPercentageToDP("30%"),
    width: widthPercentageToDP("30%"),
    overflow: "visible"
  },
  imageView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: 12
  },
  coinImage: {
    width: 44,
    height: 44
  }
};


const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const CommunityStyle = () => getThemedStyle(base, themed);

export default CommunityStyle;
