import { StyleSheet } from 'react-native';
// import {FONT_SCALE, STYLES} from "../../../config/constants/style";

const eye = {
    position: 'absolute',
    right: 15,
    opacity: 0.5,
}

const PasswordInputStyle = StyleSheet.create({
  eyeShow: {
    ...eye,
    top: 15,
  },
  eyeHide: {
    ...eye,
    top: 13,
  }

});

export default PasswordInputStyle;
