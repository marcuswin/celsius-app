import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
}

const themed = {
    dark: {
        content: {
            backgroundColor: '#000'
        },
        description: {
            color: STYLES.WHITE_TEXT_COLOR
        }
    },

    light: {
        content: {
            backgroundColor: '#fff'
        },
        description: {
            color: STYLES.WHITE_TEXT_COLOR
        }
    }
}

const HomeStyle = (theme) => getThemedStyle(theme, base, themed);

export default HomeStyle