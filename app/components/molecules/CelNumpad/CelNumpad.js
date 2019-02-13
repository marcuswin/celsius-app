import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';

import testUtil from "../../../utils/test-util";

import CelNumpadStyle from "./CelNumpad.styles";
import CelText from "../../atoms/CelText/CelText";
import { KEYPAD_PURPOSES } from "../../../constants/UI";

const BUTTONS = {
  [KEYPAD_PURPOSES.WITHDRAW]: [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', '<'],
  ],
}

function pressButton(props, button) {
  const { updateFormField, onPress, field, value } = props;

  let newValue;

  if (button === '<') {
    newValue = value.toString().slice(0, -1);

  } else if (button === '.') {
    if (!value.toString().includes('.')) {
      newValue = `${value}${button}`
    } else {
      newValue = value
    }
  } else if (value) {
      newValue = `${value}${button}`
  } else {
    newValue = button
  }

  updateFormField(field, newValue)
  if (onPress) onPress(newValue)
}

const CelNumpad = (props) => {
  const style = CelNumpadStyle()
  const buttons = BUTTONS[props.purpose]
  return (
    <View style={style.container}>
      <View style={style.buttonsWrapper}>
        { buttons.map(btns => (
          <View key={btns[0]} style={style.buttonsRow}>
            { btns.map(btn => (
              <TouchableOpacity
                key={btn}
                style={style.button}
                onPress={() => pressButton(props, btn)}
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

CelNumpad.propTypes = {
  field: PropTypes.string,
  value: PropTypes.string,
  onPress: PropTypes.func,
  updateFormField: PropTypes.func.isRequired,
  purpose: PropTypes.string.isRequired,
}

export default testUtil.hookComponent(CelNumpad);
