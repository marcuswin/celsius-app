// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20
  },

  copyShareWrapper: {
    width: '100%',
    marginTop: 15
  },

  copyShareButtonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 15
  },
  infoBubble: {
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '2%',
  }
};

const themed = {
  light: {
  },

  dark: {
  },

  celsius: {
  }
};

const DepositStyle = () => getThemedStyle(base, themed);

export default DepositStyle
