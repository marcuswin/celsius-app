import { getThemedStyle } from '../../../utils/styles-util';
import STYLES from '../../../constants/STYLES';

const base = {
    container: {
        flex: 1
    },
    upcomintPayment: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    nextPayment: {
        flex: 1,
        top: 10,
        zIndex: 1,
        borderRadius: 4,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: STYLES.COLORS.LIGHT_GRAY,
        width: 160,
        height: 25,
    },
    principalPayment: {
        flex:1,
        top: 20,
        zIndex: 1,
        borderRadius: 4,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: STYLES.COLORS.LIGHT_GRAY,
        width: 160,
        height: 25,
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