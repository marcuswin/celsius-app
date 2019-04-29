import { StyleSheet } from 'react-native';

import { getPadding, getThemedStyle, getScaledFont } from '../../../utils/styles-util';
import STYLES from '../../../constants/STYLES';

const fontSize = getScaledFont(STYLES.FONTSIZE.H4);
const base = {
    container: {
        borderRadius: 8
    },
    fullScreen: {
        width: '100%',
    },
    trans: {
        backgroundColor: 'transparent'
    },
    inputWrapper: {
        ...StyleSheet.flatten(getPadding("12 16 15 16")),
        height: 50,
        backgroundColor: STYLES.COLORS.WHITE,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 0.5,
        borderRadius: 8,
    },
    input: {
        height: 23,
        fontSize,
        fontFamily: 'barlow-light',
    },
    disabledInput: {
        opacity: 0.6
    },
    activeInput: {
        borderWidth: 1,
        borderColor: STYLES.COLORS.DARK_GRAY_OPACITY,
        shadowOpacity: 0
    }
}

const themed = {
    light: {
        container: {
            backgroundColor: STYLES.COLORS.WHITE
        },
        input: {
            color: STYLES.COLORS.DARK_GRAY
        },
        textPlaceholderColor: {
            color: STYLES.COLORS.MEDIUM_GRAY
        }
    },

    dark: {
        container: {
            backgroundColor: STYLES.COLORS.DARK_HEADER
        },
        input: {
            color: STYLES.COLORS.WHITE
        },
        textPlaceholderColor: {
            color: STYLES.COLORS.WHITE_OPACITY3
        }
    },

    celsius: {
        container: {
            backgroundColor: STYLES.COLORS.WHITE
        },
        input: {
            color: STYLES.COLORS.DARK_GRAY
        },
        textPlaceholderColor: {
            color: STYLES.COLORS.MEDIUM_GRAY
        }
    }
}

const CelInputStyle = (theme) => (theme ? getThemedStyle(base, themed, theme) : getThemedStyle(base, themed));

export default CelInputStyle
