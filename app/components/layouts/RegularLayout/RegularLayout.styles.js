import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
    container: {
        flex: 1,
        alignItems: "center"
    }
}

const themed = {
    dark: {
        container: {
            backgroundColor: STYLES.COLORS.DARK_BACKGROUND
        },
        headerTitle: {
            color: 'rgba(255,255,255,0.5)'
        }
    },

    light: {
        container: {
            backgroundColor: STYLES.COLORS.LIGHT_GRAY
        },
        headerTitle: {
            color: STYLES.COLORS.DARK_GRAY
        }
    },

    celsius: {
        container: {
            backgroundColor: STYLES.COLORS.LIGHT_GRAY
        },
        headerTitle: {
            color: 'rgba(255,255,255,0.5)'
        }
    },
}

const RegularLayoutStyle = (theme) => getThemedStyle(theme, base, themed);

export default RegularLayoutStyle