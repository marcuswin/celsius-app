// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";

const base = {
  container: {
    flex: 1,
  },
  allFiltersContainer: {
    justifyContent: "center",
    marginBottom: 10,
  },
  itemStyle: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 8,
    marginBottom: 8,
    alignItems: "center",
    paddingVertical: 5,
  },
  iconWrapper: {
    height: 26,
    width: 26,
    borderRadius: 13,
    marginRight: 20,
    justifyContent: "center",
  },
  optionPickerWrapper: {
    marginRight: 20,
    flexDirection: "row",
  },
  clearSelectWrapper: {
    height: 26,
    width: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: STYLES.COLORS.DARK_GRAY1,
    paddingVertical: 4,
    marginLeft: "auto",
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const TransactionFilterModalStyle = () => getThemedStyle(base, themed);

export default TransactionFilterModalStyle;
