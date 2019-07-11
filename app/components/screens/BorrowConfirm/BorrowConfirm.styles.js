// import STYLES from '../../../constants/STYLES';
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
    },
    collateralInnerBox: {
        backgroundColor: STYLES.COLORS.LIGHT_GRAY,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 8
    },
    termLenght: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: STYLES.COLORS.WHITE,
        borderRadius: 8,
        marginBottom: 15,
        
    },
    reduceInterest: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: STYLES.COLORS.CELSIUS_BLUE,
        borderRadius: 8,
        marginBottom: 15,
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

const BorrowConfirmStyle = () => getThemedStyle(base, themed);

export default BorrowConfirmStyle