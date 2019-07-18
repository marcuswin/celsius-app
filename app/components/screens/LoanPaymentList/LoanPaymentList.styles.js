import { getThemedStyle } from '../../../utils/styles-util';
import STYLES from '../../../constants/STYLES';

const base = {
    container: {
        flex: 1
    },
    upcomintPayment: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    nextPayment: {
        top: 10,
        zIndex: 1,
        alignSelf: 'center',
        backgroundColor: STYLES.COLORS.LIGHT_GRAY,
        width: 120,
        height: 20,
        borderRadius: 4
    },
    principalPayment: {
        top: 20,
        zIndex: 1,
        alignSelf: 'center',
        backgroundColor: STYLES.COLORS.LIGHT_GRAY,
        width: 120,
        height: 20,
        borderRadius: 4
    },
    lastPayment: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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

const LoanPaymentListStyle = () => getThemedStyle(base, themed);

export default LoanPaymentListStyle