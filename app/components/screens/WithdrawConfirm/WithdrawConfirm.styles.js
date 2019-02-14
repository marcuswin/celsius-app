// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
    container: {
        flex: 1
    },
    address: {
        flexDirection: "column",
        justifyContent: "center",
        // alignItems: "center",
        flexWrap: "wrap",
        paddingVertical: 15,
    },
    bottom: {
        flex: 1,
        alignItems: 'flex-end',
        marginBottom: 36
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

const WithdrawConfirmStyle = () => getThemedStyle(base, themed);

export default WithdrawConfirmStyle