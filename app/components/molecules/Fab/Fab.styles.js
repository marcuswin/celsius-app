import { getThemedStyle } from '../../../utils/styles-util';

const base = {
    container: {
        position: 'absolute',
        bottom: 30,
        right: 20
    },
    fabButtonStyle: {
        width: 60,
        height: 60,
        backgroundColor: "rgba(65,86,166,1)",
        borderRadius: 60,
        justifyContent: 'center'
    },
    logo: {
        width: 50,
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center'
    },
}

const themed = {
    light: {
    },

    dark: {
    },

    celsius: {
    }
}

const FabStyle = (theme) => getThemedStyle(theme, base, themed);

export default FabStyle