// import STYLES from '../../../constants/STYLES';
import { Dimensions } from "react-native";
import { getThemedStyle, heightPercentageToDP, widthPercentageToDP } from '../../../utils/styles-util';


const { width, height } = Dimensions.get('window');

const base = {
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        width,
        height,
    },
    modal: {
        position: 'absolute',
        backgroundColor: 'white',
        width: width * 0.8,
        // height: height * 0.6,
        top: heightPercentageToDP("25"),
        // maxHeight: heightPercentageToDP("80"),
        // marginBottom: heightPercentageToDP("9.85%"),
        marginLeft: widthPercentageToDP("5.6%"),
        marginRight: widthPercentageToDP("5.6%"),
        borderRadius: 8,
    },
    closeBtn: {
        position: 'absolute',
        top: 16,
        right: 16,
        width: 20,
        height: 20,
        backgroundColor: 'white',
        zIndex: 10,
    },
    btn: {
        width: 100,
        height: 70,
        marginLeft: 120,
        marginRight: 120,
    },
    imageWrapper: {
        position: 'absolute',
        zIndex: 10,

        top: heightPercentageToDP("14%"),

        width: heightPercentageToDP("20%"),
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalImage: {
        width: heightPercentageToDP("16%"),
        height: heightPercentageToDP("16%"),
    },
    contentWrapper: {
        marginTop: 40,
        paddingRight: 20,
        paddingLeft: 20,
        marginBottom: 20,
        // height
        // alignItems: 'center',
        // justifyContent: 'center',
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

const CelModalStyle = () => getThemedStyle(base, themed);

export default CelModalStyle
