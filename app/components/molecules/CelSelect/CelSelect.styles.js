import { StyleSheet } from 'react-native';

import STYLES from '../../../constants/STYLES';
import { getPadding, getThemedStyle } from '../../../utils/styles-util';

const base = {
    container: {
        height: 50,
        ...StyleSheet.flatten(getPadding("12 16 15 16")),
        backgroundColor: STYLES.COLORS.WHITE,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 0.5,
        borderRadius: 8,
    },
    disabledInput: {
        opacity: 0.6
    },
    iconRight: {
        position: 'absolute',
        right: 15,
        top: 0,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.4,
    },
    flagImage: {
        width: 30,
        height: 30,
        borderRadius: 15
    }
}

const themed = {
    light: {
        container: {
            backgroundColor: STYLES.COLORS.WHITE
        },
        iconColor: {
            color: STYLES.COLORS.DARK_GRAY_OPACITY
        },
        textColor: {
            color: STYLES.COLORS.DARK_GRAY
        }
    },

    dark: {
        container: {
            backgroundColor: STYLES.COLORS.DARK_HEADER
        },
        iconColor: {
            color: STYLES.COLORS.WHITE_OPACITY3
        },
        textColor: {
            color: STYLES.COLORS.WHITE
        }
    },

    celsius: {
        container: {
            backgroundColor: STYLES.COLORS.WHITE
        },
        iconColor: {
            color: STYLES.COLORS.DARK_GRAY_OPACITY
        },
        textColor: {
            color: STYLES.COLORS.DARK_GRAY
        }
    }
}

const CelSelectStyle = () => getThemedStyle(base, themed);

export default CelSelectStyle
