import STYLES from '../../../constants/STYLES';
import { getThemedStyle, heightPercentageToDP, widthPercentageToDP } from '../../../utils/styles-util';
import { Dimensions, StyleSheet } from "react-native";
import stylesUtil from "../../../utils/styles-util";
// import { BlurView, VibrancyView } from 'react-native-blur';


const { width, height } = Dimensions.get('window');

const base = {
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        width,
        height,
    },

    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        backgroundColor: 'rgba(61,72,83,0.85)',

    },
    modal: {
        backgroundColor: 'white',
        width: width * 0.8,
        height: height * 0.6,
        marginTop: heightPercentageToDP("24.88%"),
        marginBottom: heightPercentageToDP("9.85%"),
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
        backgroundColor: 'transparent',
        zIndex: 10,
    },
    btn: {
        width: 100,
        height: 70,
        marginLeft: 120,
        marginRight: 120,


    },
    modalImage: {
        width: 150,
        height: 150,
        marginTop: heightPercentageToDP("17%"),
        position: 'absolute',
        left: 110,
        right:0,
        // alignItems: 'center',   
        // alignSelf: 'center',
        zIndex: 10,
        justifyContent: 'center',

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

const CelModalStyle = (theme) => getThemedStyle(theme, base, themed);

export default CelModalStyle