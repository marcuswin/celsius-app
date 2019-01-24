import { getThemedStyle } from '../../../utils/styles-util';
import STYLES from '../../../constants/STYLES';

const base = {
    container: {
        borderRadius: 60,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },
    view: {
        width: 60,
        height: 60,
        borderRadius: 60,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },
    text: {
        marginTop: 10,
        textAlign: 'center'
    }
}

const themed = {
    light: {
        viewMenu: {
            backgroundColor: STYLES.colors.WHITE
        },
        iconMenu: {
            fill: STYLES.colors.BLACK
        },
        textMenu: {
            color: STYLES.colors.BLACK
        }
    },

    dark: {
        viewMenu: {
            backgroundColor: STYLES.colors.DARK
        },
        iconMenu: {
            fill: STYLES.colors.WHITE
        },
        textMenu: {
            color: STYLES.colors.WHITE
        }
    },

    celsius: {
        viewMenu: {
            backgroundColor: STYLES.colors.CELSIUS,
        },
        iconMenu: {
            fill: STYLES.colors.WHITE
        },
    }
}

const CircleButtonStyle = (theme) => getThemedStyle(theme, base, themed);

export default CircleButtonStyle