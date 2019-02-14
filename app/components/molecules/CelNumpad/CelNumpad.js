import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Constants } from 'expo';
import { View, TouchableOpacity, TextInput } from 'react-native';

import testUtil from "../../../utils/test-util";
import CelNumpadStyle from "./CelNumpad.styles";
import CelText from "../../atoms/CelText/CelText";
import UI, { KEYPAD_PURPOSES, PHONES_WITH_CUSTOM_KEYPAD } from "../../../constants/UI";

const { KEYBOARD_TYPE } = UI

const BUTTONS = {
  [KEYPAD_PURPOSES.WITHDRAW]: [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', '<'],
  ],
}

const deviceModel = Constants.platform.ios ? Constants.platform.ios.model : Constants.platform.android.model;
const shouldShowCustomKeypad = PHONES_WITH_CUSTOM_KEYPAD.includes(deviceModel)

const KEYBOARDS = {
  [KEYPAD_PURPOSES.WITHDRAW]: KEYBOARD_TYPE.NUMERIC
}

class CelNumpad extends Component {
  changeInputText = (text) => {
    const { value, onPress, updateFormField, field } = this.props;

    let newValue;
    if (text.includes('.') && text.includes(',')) {
      newValue = value
    } else {
      newValue = text.replace(',', '.')
    }

    if (onPress) {
      onPress(newValue)
    } else {
      updateFormField(field, newValue)
    }
  }

  pressButton(button) {
    const { updateFormField, onPress, field, value } = this.props;

    let newValue = value;

    if (button === '<') {
      newValue = value.toString().slice(0, -1);

    } else if (button === '.') {
      if (!value.toString().includes('.')) {
        newValue = `${value}${button}`
      } else {
        newValue = value
      }

    } else if (!isNaN(button)) {
      // Number pressed
      if (value) {
        newValue = `${value}${button}`
      } else {
        newValue = button
      }
    }

    if (onPress) {
      onPress(newValue)
    } else {
      updateFormField(field, newValue)
    }
  }

  render() {
    const { purpose, setKeypadInput, value } = this.props
    const style = CelNumpadStyle()
    const buttons = BUTTONS[purpose]

    if (shouldShowCustomKeypad) {
      return (
        <View style={style.container}>

          <View style={style.buttonsWrapper}>
            { buttons.map(btns => (
              <View key={btns[0]} style={style.buttonsRow}>
                { btns.map(btn => (
                  <TouchableOpacity
                    key={btn}
                    style={style.button}
                    onPress={() => this.pressButton(btn)}
                  >
                    <CelText type="H1">{ btn }</CelText>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </View>
      )
    }

    return (
      <TextInput
        value={value || ''}
        onChangeText={this.changeInputText}
        keyboardType={KEYBOARDS[purpose]}
        ref={(input) => setKeypadInput(input)}
      />
    );
  }
}

CelNumpad.propTypes = {
  field: PropTypes.string,
  value: PropTypes.string,
  onPress: PropTypes.func,
  updateFormField: PropTypes.func.isRequired,
  setKeypadInput: PropTypes.func.isRequired,
  purpose: PropTypes.string.isRequired,
}

export default testUtil.hookComponent(CelNumpad);
