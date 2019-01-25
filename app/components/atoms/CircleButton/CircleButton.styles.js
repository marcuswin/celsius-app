import { getThemedStyle } from '../../../utils/styles-util';
import STYLES from '../../../constants/STYLES';

const base = {
    container: {
        borderRadius: 60,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
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
        marginTop: 10
    }
}

const themed = {
    light: {
        viewMenu: {
            backgroundColor: STYLES.COLORS.WHITE
        },
        iconMenu: {
            fill: STYLES.COLORS.BLACK
        },
        textMenu: {
            color: STYLES.COLORS.BLACK
        },
        iconTheme: {
            fill: STYLES.COLORS.BLACK
        },
    },

    dark: {
        viewMenu: {
            backgroundColor: STYLES.COLORS.DARK
        },
        iconMenu: {
            fill: STYLES.COLORS.WHITE
        },
        textMenu: {
            color: STYLES.COLORS.WHITE
        },
        iconTheme: {
            fill: STYLES.COLORS.WHITE
        },
    },

    celsius: {
        viewMenu: {
            backgroundColor: STYLES.COLORS.CELSIUS,
        },
        iconMenu: {
            fill: STYLES.COLORS.WHITE
        },
    }
}

const CircleButtonStyle = (theme) => getThemedStyle(theme, base, themed);

export default CircleButtonStyle