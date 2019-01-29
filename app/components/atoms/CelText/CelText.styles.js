import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
}

const themed = {
    light: {
        textColor: {
            color: STYLES.COLORS.MEDIUM_GRAY
        }
    },

    dark: {
        textColor: {
            color: STYLES.COLORS.WHITE_OPACITY5
        }
    },

    celsius: {
        textColor: {
            color: STYLES.COLORS.MEDIUM_GRAY
        }
    }
}

const CelTextStyle = (theme) => getThemedStyle(theme, base, themed);

export default CelTextStyle