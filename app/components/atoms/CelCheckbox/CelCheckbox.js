import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import CheckBox from "react-native-check-box";

import CelText from "../CelText/CelText";

const CelCheckbox = (props) => {
  const onPress = props.onChange || props.updateFormField
  return (
    <TouchableOpacity
      style={{ flexDirection: 'row' }}
      onPress={() => onPress(props.field, !props.value)}
    >
      <CheckBox
        onClick={() => {}}
        isChecked={props.value}
      />
      <CelText>{ props.rightText }</CelText>
    </TouchableOpacity>

  )
}

CelCheckbox.propTypes = {
  field: PropTypes.string.isRequired,
  updateFormField: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.bool,
  rightText: PropTypes.string,
}

export default CelCheckbox
