import { StyleSheet } from 'react-native';

import stylesUtil, { getThemedStyle, getScaledFont } from '../../../utils/styles-util';
import STYLES from '../../../constants/STYLES';

const fontSize = getScaledFont(STYLES.FONTSIZE.H4);
const base = {
    container: {
        width: '100%',
        flex: 1,
        height: 50,
        ...StyleSheet.flatten(stylesUtil.getPadding("12 16 15 16")),
        backgroundColor: STYLES.COLORS.WHITE,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 0.5,
        borderRadius: 8,
    },
    input: {
        height: 23,
        fontSize
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
            color: STYLES.COLORS.DARK_GRAY_OPACITY
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
            color: STYLES.COLORS.DARK_GRAY_OPACITY
        }
    }
}

const CelInputStyle = (theme) => (theme ? getThemedStyle(base, themed, theme) : getThemedStyle(base, themed));

export default CelInputStyle