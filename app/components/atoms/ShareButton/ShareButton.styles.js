// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
    container: {
        flexGrow: 1,
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

const ShareButtonStyle = () => getThemedStyle(base, themed);

export default ShareButtonStyle