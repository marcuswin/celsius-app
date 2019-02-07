import { StatusBar, Platform } from 'react-native';

import { getThemedStyle } from '../../../utils/styles-util';
import STYLES from '../../../constants/STYLES';

const base = {
    content: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 60
    },
    center: {
        alignSelf: 'center',
        justifyContent: 'center'
    },
    left: {
        flex: 1,
        alignItems: 'flex-start'
    },
    right: {
        flex: 1,
        alignItems: 'flex-end'
    },
    headingBackground: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    transparentBackground: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    }
}

const themed = {

    light: {
        headingBackground: {
            backgroundColor: STYLES.COLORS.WHITE,
        },
        transparentBackground: {
            backgroundColor: STYLES.COLORS.LIGHT_GRAY
        }
    },

    dark: {
        headingBackground: {
            backgroundColor: STYLES.COLORS.DARK_HEADER
        },
        transparentBackground: {
            backgroundColor: STYLES.COLORS.DARK_BACKGROUND
        }
    },

    celsius: {
        headingBackground: {
            backgroundColor: STYLES.COLORS.CELSIUS
        },
        transparentBackground: {
            backgroundColor: STYLES.COLORS.LIGHT_GRAY
        }
    },
}

const CelHeadingStyle = (theme) => getThemedStyle(theme, base, themed);

export default CelHeadingStyle