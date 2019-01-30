import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
}

const themed = {
    light: {
        textColor: {
            color: STYLES.COLORS.DARK_GRAY // medium_gray je bilo 30.01.
        }
    },

    dark: {
        textColor: {
            color: STYLES.COLORS.WHITE_OPACITY5
        }
    },

    celsius: {
        textColor: {
            color: STYLES.COLORS.DARK_GRAY
        }
    }
}

const CelTextStyle = (theme) => getThemedStyle(theme, base, themed);

export default CelTextStyle