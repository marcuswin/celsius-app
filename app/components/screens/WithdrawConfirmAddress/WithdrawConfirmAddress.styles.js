// import STYLES from '../../../constants/STYLES';
import { getThemedStyle, heightPercentageToDP } from '../../../utils/styles-util';
import { COLORS } from '../../../config/constants/style';

const base = {
    coinAmountContainer: {
        marginTop: heightPercentageToDP("5.56%"),
        marginBottom: heightPercentageToDP("5.56%"),
        alignItems: "center"
    },
    containerWithMargin: {
        alignSelf: "flex-start",
        marginBottom: 10
    },
    tagText: {
        color: COLORS.blue,
        textAlign: "left"
    },
    button: {
        marginBottom: heightPercentageToDP("7%"),
        marginTop: heightPercentageToDP("3.26%")
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

const WithdrawalAddressStyle = () => getThemedStyle(base, themed);

export default WithdrawalAddressStyle