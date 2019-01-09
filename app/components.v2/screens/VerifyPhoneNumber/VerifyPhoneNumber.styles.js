import { Dimensions, StyleSheet } from 'react-native';
import {FONT_SCALE} from "../../../config/constants/style";

const { width } = Dimensions.get('window');

const VerifyPhoneNumberStyle = StyleSheet.create({

  finishButton: {
    marginTop: 30,
    fontSize: FONT_SCALE * 21,
    fontFamily: 'agile-light',
  },
  resendButton: {
    fontSize: FONT_SCALE * 18,
    fontFamily: 'agile-light',
  },
  title: {
    marginBottom: 20,
    fontSize: FONT_SCALE * 42,
    fontFamily: 'agile-bold',
    textAlign: 'center',
    color: 'white',
  },
  image: {
    width: width / 2.5,
    height: width / 2.5,
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  text: {
    fontSize: FONT_SCALE * 18,
    fontFamily: 'agile-light',
    textAlign: 'left',
    color: 'white',
    marginBottom: 30,
  },
});

export default VerifyPhoneNumberStyle;
