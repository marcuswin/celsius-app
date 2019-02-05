// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
}

const themed = {
    light: {
    },

    dark: {
    },

    celsius: {
    }
}

const InfoBoxStyle = (theme) => getThemedStyle(theme, base, themed);

export default InfoBoxStyle