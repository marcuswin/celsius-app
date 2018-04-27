import { StyleSheet } from 'react-native';
import {FONT_SCALE} from "../../../../config/constants/style";

const StepStyle = StyleSheet.create({
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
  dummyBorder: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  middleBorderText: {
    color: 'rgba(136, 162, 199, 1)',
    opacity: 0.7,
    fontSize: FONT_SCALE * 14,
    fontFamily: 'agile-bold',
  },
  fakeTwitterButton: {
    display: 'none',
  }
});

export default StepStyle;
