import STYLES from '../../../constants/STYLES';
import { getThemedStyle, heightPercentageToDP, widthPercentageToDP } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1
  },
  progressView: {
    height: heightPercentageToDP("25.5%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 40
  },
  bonusCard: {
    width: widthPercentageToDP("89%"),
    backgroundColor: "white",
    flexDirection: "column",
  },
  image: {
    resizeMode: "contain",
    width: widthPercentageToDP("9%"),
    height: widthPercentageToDP("9%"),
  },
  starIcon: {
    resizeMode: "contain",
    width: widthPercentageToDP("18.3%"),
    height: widthPercentageToDP("18.3%"),
    marginTop: heightPercentageToDP("3%"),
    marginBottom: heightPercentageToDP("0.5%"),
  },
  circle: {
    width: widthPercentageToDP("17%"),
    height: widthPercentageToDP("17%"),
    borderRadius: heightPercentageToDP("17%") / 2,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: heightPercentageToDP("3%"),
    // marginTop: heightPercentageToDP("1,53%"),
    marginBottom: heightPercentageToDP("0.8%"),
  },
  title: {
    marginBottom: heightPercentageToDP("0.4%")
  },
  explanation: {
    marginBottom: heightPercentageToDP("1.73%")
  },
  hodlImage: {
    resizeMode: "contain",
    height: heightPercentageToDP("30%"),
    width: widthPercentageToDP("90%"),
    marginTop: heightPercentageToDP("1.73%")
  },
  arcChart: {
    marginHorizontal: widthPercentageToDP("8%")
  },
  contentWrapper: {
    marginHorizontal: 20,
    marginTop: heightPercentageToDP("1.5%"),
    alignItems: "center",
    justifyContent: "center"
  },
  interestCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  tableWrapper: {
    flexDirection: 'column', marginTop: 10
  },
  tierWrapper: {
    flexDirection: 'row', width: '100%', justifyContent: 'space-evenly',

  },
  minPercetage: {
    flexDirection: 'row', backgroundColor: 'white', justifyContent: 'space-evenly'
  },
  bonus: {
    flexDirection: 'row', backgroundColor: 'white', justifyContent: 'space-evenly'
  },
  loan: {
    flexDirection: 'row', backgroundColor: 'white', justifyContent: 'space-evenly'
  },
  separator: {
    alignItems: 'center', backgroundColor: STYLES.COLORS.DARK_GRAY3, paddingVertical: 5
  },
  tierSilver: {
    borderRightColor: 'white', borderRightWidth: 3, backgroundColor: STYLES.COLORS.MEDIUM_GRAY, flex: 0.3, flexGrow: 1, alignItems: 'center', paddingVertical: 7, borderTopLeftRadius: 3,
  },
  tierGold: {
    borderRightColor: 'white', borderRightWidth: 3, backgroundColor: STYLES.COLORS.ORANGE, flex: 0.3, flexGrow: 1, alignItems: 'center', paddingVertical: 7
  },
  tierPlatinum: {
    backgroundColor: STYLES.COLORS.CELSIUS_BLUE, flex: 0.3, flexGrow: 1, alignItems: 'center', paddingVertical: 7, borderTopRightRadius: 3,
  },
  tierData: {
    paddingVertical: 10
  },
  tierDataLast: {
    paddingVertical: 10,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3

  }
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const LoyaltyProgramStyle = () => getThemedStyle(base, themed);

export default LoyaltyProgramStyle;
