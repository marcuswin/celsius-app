import { Platform } from 'react-native';
import { getThemedStyle } from '../../../utils/styles-util';
import STYLES from '../../../constants/STYLES';

const base = {
    container: {
        flex: 1
    },
    estimatedCollateral: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: STYLES.COLORS.WHITE,
        borderRadius: 8,
        marginBottom: 15,
        ...Platform.select({
            android: {
                borderColor: '#E9E9E9',
                borderTopWidth: 0.2,
                borderLeftWidth: 0.2,
                borderRightWidth: 0.5,
                borderBottomWidth: 2,
            },
            ios: {
                ...STYLES.SHADOW_STYLES,
            }
        })
    },
    collateralInnerBox: {
        backgroundColor: STYLES.COLORS.LIGHT_GRAY,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 8
    },
    termLenght: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: STYLES.COLORS.WHITE,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 8,
        marginBottom: 15,
        ...Platform.select({
            android: {
                borderColor: '#E9E9E9',
                borderTopWidth: 0.2,
                borderLeftWidth: 0.2,
                borderRightWidth: 0.5,
                borderBottomWidth: 2,
            },
            ios: {
                ...STYLES.SHADOW_STYLES,
            }
        })
    },
    reduceInterest: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: STYLES.COLORS.CELSIUS_BLUE,
        borderRadius: 8,
        marginBottom: 15,
        ...Platform.select({
            android: {
                borderColor: '#E9E9E9',
                borderTopWidth: 0.2,
                borderLeftWidth: 0.2,
                borderRightWidth: 0.5,
                borderBottomWidth: 2,
            },
            ios: {
                ...STYLES.SHADOW_STYLES,
            }
        })
    },
    reduceInterestInnerBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: STYLES.COLORS.WHITE_OPACITY1,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    totalOfPayments: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: STYLES.COLORS.WHITE,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 15,
        ...Platform.select({
            android: {
                borderColor: '#E9E9E9',
                borderTopWidth: 0.2,
                borderLeftWidth: 0.2,
                borderRightWidth: 0.5,
                borderBottomWidth: 2,
            },
            ios: {
                ...STYLES.SHADOW_STYLES,
            }
        })

    }
}

const themed = {
    light: {
        container: {
            backgroundColor: STYLES.COLORS.CELSIUS_BLUE,
            borderColor: STYLES.COLORS.CELSIUS_BLUE
        },
    },
    dark: {
        estimatedCollateral: {
            backgroundColor: STYLES.COLORS.DARK_HEADER
        },
        collateralInnerBox: {
            backgroundColor: STYLES.COLORS.DARK_BACKGROUND
        },
        termLenght: {
            backgroundColor: STYLES.COLORS.DARK_HEADER
        },
        totalOfPayments: {
            backgroundColor: STYLES.COLORS.DARK_HEADER
        }
    },

    celsius: {
    }
}

const BorrowConfirmStyle = () => getThemedStyle(base, themed);

export default BorrowConfirmStyle