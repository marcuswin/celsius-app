import { getThemedStyle } from '../../../utils/styles-util';

const base = {
    container: {
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

const CircleButtonStyle = (theme) => getThemedStyle(theme, base, themed);

export default CircleButtonStyle