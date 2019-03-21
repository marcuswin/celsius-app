// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
    container: {
        flexDirection: "row",
    },
    balance: {
        flex: 1,

    },
    interest: {
        flex: 1,
        marginLeft: 10
    },
}

const themed = {
    light: {
    },

    dark: {
    },

    celsius: {
    }
}

const WalletDetailsCardStyle = () => getThemedStyle(base, themed);

export default WalletDetailsCardStyle
