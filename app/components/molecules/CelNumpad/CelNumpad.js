import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';

import testUtil from "../../../utils/test-util";

import CelNumpadStyle from "./CelNumpad.styles";
import CelText from "../../atoms/CelText/CelText";
import { KEYPAD_PURPOSES } from "../../../constants/UI";

// const { KEYPAD_PURPOSES } = UI;

const BUTTONS = {
  [KEYPAD_PURPOSES.WITHDRAW]: [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', '<'],
  ],
}

function pressButton(props, button) {
  const { updateFormField, field, value } = props;

  if (!value) return updateFormField(field, button)
  return updateFormField(field, `${value}${button}`)
}

const CelNumpad = (props) => {
  const style = CelNumpadStyle()
  const buttons = BUTTONS[props.purpose]
  return (
    <View style={[style.container, { alignItems: 'center', justifyContent: 'center' }]}>
      <View style={{ width: 240, height: 240 }}>
        { buttons.map(btns => (
          <View key={btns[0]} style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
            { btns.map(btn => (
              <TouchableOpacity
                key={btn}
                style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', height: 60, width: 60 }}
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
