import { StyleSheet } from 'react-native';
import {FONT_SCALE} from "../../../config/constants/style";

const baseButton = {
  minWidth: 60,
  justifyContent: 'center',
  alignItems: 'center',
  paddingLeft: 25,
  paddingRight: 25,
}

const baseText = {
  fontSize: FONT_SCALE * 18,
  fontFamily: 'agile-medium',
}

const RadioButtonsStyle = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#7A89C0',
    borderRadius: 100,
    width: 'auto',
    height: 40,
    alignSelf: 'flex-start',
  },
  firsButton: {
    ...baseButton,
    borderRightColor: '#7A89C0',
    borderRightWidth: 1,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
  button: {
    ...baseButton,
    borderRightColor: '#7A89C0',
    borderRightWidth: 1,
  },
  lastButton: {
    ...baseButton,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
  },
  buttonActive: {
    backgroundColor: '#7A89C0',
  },
  textActive: {
    ...baseText,
    color: 'white',
  },
  textInactive: {
    ...baseText,
    color: '#7A89C0',
  }
});

export default RadioButtonsStyle;
