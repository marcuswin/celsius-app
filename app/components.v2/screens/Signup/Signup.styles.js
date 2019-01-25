import { StyleSheet } from 'react-native';
import { heightPercentageToDP, normalize } from '../../../utils/styles-util';
// import {FONT_SCALE} from "../../../config/constants/style";

const SignupOneStyle = StyleSheet.create({
  centeredColumn: {
    justifyContent: 'center',
    alignItems: 'center',
    // height: 120,
  },
  formButtonWrapper: {
    paddingTop: 18
  },
  formWrapper: {
    paddingTop: 46,
    flex: 1,
    justifyContent: 'space-between',
  },
  disclaimer: {
    fontSize: normalize(12),
    fontFamily: 'agile-light-italic',
    color: "rgba(136,162,199,1)",
    textAlign: "left",
    marginBottom: heightPercentageToDP("2.22%")
  },
});

export default SignupOneStyle;
