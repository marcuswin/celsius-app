// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
  amountWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    }
}

const themed = {
    light: {
    },

    dark: {
    },

    celsius: {
    }
}

const WalletInterestStyle = () => getThemedStyle(base, themed);

export default WalletInterestStyle
