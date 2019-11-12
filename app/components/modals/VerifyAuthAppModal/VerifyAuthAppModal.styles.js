// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1,
  },
  wrapper: {
    alignItems: "center",
  },
  buttonBottom: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
    height: 50,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {},
};

const VerifyAuthAppModalStyle = () => getThemedStyle(base, themed);

export default VerifyAuthAppModalStyle;
