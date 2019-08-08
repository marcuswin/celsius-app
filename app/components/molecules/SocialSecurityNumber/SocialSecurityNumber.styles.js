// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
    container: {
        flex: 1
    },
    ssnInput: {
        flex: 1,
        flexDirection: 'row',
        // flexGrow: 1,
        marginHorizontal: 40,
        // width: 'auto',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        paddingTop: 20,
    },
    inputCel: {
        borderRadius: 10,
        backgroundColor: 'white',
        flex: 1,
        flexGrow: 1,
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',

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

const SocialSecurityNumberStyle = () => getThemedStyle(base, themed);

export default SocialSecurityNumberStyle