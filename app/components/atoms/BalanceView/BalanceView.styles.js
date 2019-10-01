import { Dimensions } from 'react-native'
import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const { width } = Dimensions.get('window')

const base = {
    container: {
        flex: 1
    },
    view: {
        width,
        alignContent: 'flex-start',
        alignSelf: 'center',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
        marginBottom: 20,
        backgroundColor: STYLES.COLORS.MEDIUM_GRAY
    },
    text:{
        color: STYLES.COLORS.WHITE
    }
}

const themed = {
    light: {
        view: {
            backgroundColor: STYLES.COLORS.GRAY
        },
        text: {
            color: STYLES.COLORS.WHITE
        }

    },

    dark: {
        view: {
            backgroundColor: STYLES.COLORS.MEDIUM_GRAY
        },
        text: {
            color: STYLES.COLORS.DARK_HEADER
        }
    },

    celsius: {
    }
}

const BalanceViewStyle = () => getThemedStyle(base, themed);

export default BalanceViewStyle