import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
    container: {
        flex: 1
    },
    copyShareWrapper: {
        width: '100%',
        marginTop: 15,
        borderColor: STYLES.COLORS.LIGHT_GRAY,
        borderWidth: 2,
        borderRadius: 8,
        padding: 10,
        marginVertical: 10,

    },

    copyShareButtonsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 15
    },
    explanation: {
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: '7%',
        marginRight: '7%',
        alignItems: 'stretch',
        alignContent: 'stretch',
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

const ReferralSendModalStyle = () => getThemedStyle(base, themed);

export default ReferralSendModalStyle