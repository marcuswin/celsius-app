import { StyleSheet } from 'react-native';
import {FONT_SCALE} from "../../../config/constants/style";

const SignupOneStyle = StyleSheet.create({
  centeredColumn: {
    justifyContent: 'center',
    alignItems: 'center',
    // height: 120,
  },
  socialNetworkTextWrapper: {
    paddingTop: 14,
    alignItems: 'center'
  },
  socialNetworkDescription: {
    fontSize: FONT_SCALE * 14,
    fontFamily: 'agile-light',
    color: '#ffffff',
    opacity: 0.7
  },
  socialNetworkName: {
    fontSize: FONT_SCALE * 18,
    fontFamily: 'agile-medium',
    color: '#ffffff'
  },
  fakeTwitterButton: {
    display: 'none',
  },
  formButtonWrapper: {
    paddingTop: 18
  },
  formWrapper: {
    paddingTop: 46,
    paddingBottom: 60,
    flex: 1,
    justifyContent: 'space-between',
  }
});

export default SignupOneStyle;
