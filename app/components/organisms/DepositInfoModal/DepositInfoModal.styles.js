// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1
  },
  progressBar: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10
  },
  title: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 20
  },
  description: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const DepositInfoModalStyle = () => getThemedStyle(base, themed);

export default DepositInfoModalStyle;
