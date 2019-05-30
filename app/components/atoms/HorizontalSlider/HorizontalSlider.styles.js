// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
    container: {
      flex: 1,
      flexDirection: 'row',
      height: 50
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

const HorizontalSliderStyle = () => getThemedStyle(base, themed);

export default HorizontalSliderStyle
