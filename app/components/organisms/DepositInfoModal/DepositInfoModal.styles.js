// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  container: {
    flex: 1
  },
  title: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 10

  },
  description: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#737A82',
    paddingBottom: 10,
  },
  screen: {
    width: 300,
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "white"
  },
};

const themed = {
  light: {},

  dark: {},

  celsius: {}
};

const DepositInfoModalStyle = () => getThemedStyle(base, themed);

export default DepositInfoModalStyle;
