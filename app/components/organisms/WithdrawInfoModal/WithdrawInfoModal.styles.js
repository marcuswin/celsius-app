import { getThemedStyle } from '../../../utils/styles-util';


const base = {
    container: {
        flex: 1,
    },
    wrapper: {
        alignItems: 'center',
        paddingTop: '10%',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        // position: 'absolute',
        // bottom: 0,
        paddingBottom: 40,
        paddingTop: 10
    },
    title: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        paddingTop: 10

    },
    description: {
        alignItems: 'center',
        justifyContent: 'center',
        color: '#737A82',
        paddingBottom: 10,
    },
    progressBar: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,

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
