import { getThemedStyle } from '../../../utils/styles-util';

const base = {
    container: {
    },
    view: {
        width: 60,
        height: 60,
        backgroundColor: "rgba(65,86,166,1)",
        borderRadius: 60,
        justifyContent: 'center',
    },
    text: {
        marginTop: 10
    },
    logo: {
        width: 50,
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center'
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