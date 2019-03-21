// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
    container: {
        flex: 1
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
    },
    title: {
        marginTop: 10,
        marginBottom: 10,
    },
    subtitle: {
        marginRight: 25,
        marginLeft: 25,
    },
    button: {
        marginTop: 20,
        marginBottom: 20,
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

const WelcomeScreenStyle = () => getThemedStyle(base, themed);

export default WelcomeScreenStyle