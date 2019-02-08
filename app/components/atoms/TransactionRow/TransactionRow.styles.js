// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16
    },
    leftSide: {
        flex: 1,
        flexDirection: 'row'
    },
    rightSide: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'flex-end'
    },
    iconStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    amounts: {
        flex: 2
    },
    statusText: {
        marginBottom: 5
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

const TransactionRowStyle = () => getThemedStyle(base, themed);

export default TransactionRowStyle