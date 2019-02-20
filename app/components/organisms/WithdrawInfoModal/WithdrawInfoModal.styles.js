import { getThemedStyle, heightPercentageToDP, widthPercentageToDP } from '../../../utils/styles-util';


const base = {
    container: {
        flex: 1,

    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        height: heightPercentageToDP('50%'),
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
    modal: {
        width: widthPercentageToDP("160%"),
        height: heightPercentageToDP("16%"),

    },
    progressBar: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,

    },
    text: {
        // paddingBottom: '15%',
    
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

const WithdrawInfoModalStyle = () => getThemedStyle(base, themed);

export default WithdrawInfoModalStyle