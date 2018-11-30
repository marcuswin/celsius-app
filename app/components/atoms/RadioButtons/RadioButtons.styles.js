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
    borderRadius: 100,
    width: 'auto',
    height: 40,
    alignSelf: 'flex-start',
  },
  firstButton: {
    ...baseButton,
    borderRightWidth: 1,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
  button: {
    ...baseButton,
    borderRightWidth: 1,
  },
  lastButton: {
    ...baseButton,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
  },
  textActive: {
    ...baseText,
    color: 'white',
  },
  textInactive: {
    ...baseText,
  }
});

export default RadioButtonsStyle;
