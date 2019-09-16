import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
    container: {
        flex: 1,
    },
    wrapper: {
        alignItems: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 400,
    },
    title: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        paddingTop: 10

    },
    description: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#737A82',
        paddingBottom: 10,
    },
    modalButton: {
        marginTop: 20,
        backgroundColor: STYLES.COLORS.CELSIUS_BLUE,
    },
    whiteButton: {
        marginTop: 20,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: STYLES.COLORS.CELSIUS_BLUE
    },
    screen: {
        width: 300,
        justifyContent: "flex-start",
        alignItems: "center",
        borderRadius: 25,
        backgroundColor: "white"
      },
};


const themed = {
    light: {
    },

    dark: {
    },

    celsius: {
    }
}

const WithdrawInfoModalStyle = () => getThemedStyle(base, themed);

export default WithdrawInfoModalStyle
