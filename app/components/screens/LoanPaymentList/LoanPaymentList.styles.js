import { getThemedStyle } from '../../../utils/styles-util';
import STYLES from '../../../constants/STYLES';

const base = {
    container: {
        flex: 1
    },
    info: {
        alignSelf: 'center',
        borderWidth: 4,
        borderRadius: 5,
        width: 80,
        height: 20,
        backgroundColor: STYLES.COLORS.LIGHT_GRAY,
        borderColor: STYLES.COLORS.LIGHT_GRAY,
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