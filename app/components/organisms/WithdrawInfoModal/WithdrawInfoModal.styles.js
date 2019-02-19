import { getThemedStyle, heightPercentageToDP, widthPercentageToDP } from '../../../utils/styles-util';


const base = {
    container: {
        flex: 1
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        height: heightPercentageToDP('50%'),
        paddingTop: '25%',
        // paddingBottom: '20%'

    },
    button: {
        position: 'absolute',
        bottom: 0
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

    },
    modal: {
        width: widthPercentageToDP("160%"),
        height: heightPercentageToDP("16%"),

    },
    progressBar: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 20,

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