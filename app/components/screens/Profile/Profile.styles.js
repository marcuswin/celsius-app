import { StyleSheet } from 'react-native';
import { STYLES } from '../../../config/constants/style';
// import {FONT_SCALE, STYLES} from "../../../config/constants/style";

const ProfileStyle = StyleSheet.create({
    dateOfBirthText: {
        color: STYLES.GRAY_2,
        marginBottom: 10,
        marginTop: 5
    },
    dateOfBirthContainer: {
        marginBottom: 15
    },
    dateOfBirthInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default ProfileStyle;
