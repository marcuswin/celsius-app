import { StyleSheet } from 'react-native';
// import {FONT_SCALE, STYLES} from "../../../config/constants/style";

const ProfileDetailsStyle = StyleSheet.create({
    dateOfBirthText: {
        color: 'white',
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

export default ProfileDetailsStyle;
