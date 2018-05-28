import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
// import { View, Text } from 'react-native';
// import {} from 'native-base';

// import {STYLES} from "../../config/constants/style";
// import CelInputStyle from "./CelInput.styles";
import {AUTO_CAPITALIZE, KEYBOARD_TYPE} from "../../../config/constants/common";
import TextInput from "./TextInput";
import * as actions from "../../../redux/actions";
import PasswordInput from "./PasswordInput";
import SixDigitInput from "./SixDigitInput";

const INPUT_TYPES = {
  TEXT: 'TEXT',
  NUMBER: 'NUMBER',
  PHONE: 'PHONE',
  PASSWORD: 'PASSWORD',
  SIX_DIGIT: 'SIX_DIGIT',
}

const inputTypes = [
  INPUT_TYPES.TEXT, INPUT_TYPES.TEXT.toLowerCase(),
  INPUT_TYPES.NUMBER, INPUT_TYPES.NUMBER.toLowerCase(),
  INPUT_TYPES.PHONE, INPUT_TYPES.PHONE.toLowerCase(),
  INPUT_TYPES.PASSWORD, INPUT_TYPES.PASSWORD.toLowerCase(),
  // SIX_DIXIT, six-digit
  INPUT_TYPES.SIX_DIGIT, INPUT_TYPES.SIX_DIGIT.toLowerCase().replace('_', '-'),
]

@connect(
  () => ({}),
  dispatch => bindActionCreators(actions, dispatch),
)
class CelInput extends Component {
  static propTypes = {
    type: PropTypes.oneOf(inputTypes),
    theme: PropTypes.oneOf(['blue', 'white']),
    field: PropTypes.string.isRequired,

    // inherited from CelInput
    labelText: PropTypes.string,
    floatingLabel: PropTypes.bool,
    // for Input
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onPress: PropTypes.func,
    editable: PropTypes.bool,
    maxLength: PropTypes.number,
    secureTextEntry: PropTypes.bool,
    keyboardType: PropTypes.string,
    multiline: PropTypes.bool,
    autoCapitalize: PropTypes.string,
    autoCorrect: PropTypes.bool,
    spellCheck: PropTypes.bool,

  }

  static defaultProps = {
    type: 'text',
    theme: 'blue',
    // inherited from CelInput
    floatingLabel: true,
    // for Input
    value: '',
    placeholder: '',
    editable: true,
    maxLength: 100,
    keyboardType: KEYBOARD_TYPE.DEFAULT,
    multiline: false,
    autoCapitalize: AUTO_CAPITALIZE.NONE,
    autoCorrect: false,
    spellCheck: false,
  }

  onFocus = () => {
    const { onPress } = this.props;
    if (onPress) {
      onPress();
    }
  };


  // rendering methods
  render() {
    const { updateFormField, field } = this.props;

    switch (this.props.type) {
      case INPUT_TYPES.NUMBER:
      case INPUT_TYPES.NUMBER.toLowerCase():
        return (
          <TextInput
            { ...this.props }
            onChange={(text) => updateFormField(field, text)}
            keyboardType={KEYBOARD_TYPE.NUMERIC}
          />
        )

      case INPUT_TYPES.PASSWORD:
      case INPUT_TYPES.PASSWORD.toLowerCase():
        return (
          <PasswordInput
            { ...this.props }
            onChange={(text) => updateFormField(field, text)}
          />
        )

      case INPUT_TYPES.SIX_DIGIT:
      case 'six-digit':
        return (
          <SixDigitInput
            { ...this.props }
            onChange={(text) => updateFormField(field, text)}
            keyboardType={KEYBOARD_TYPE.NUMERIC}
          />
        )

      case INPUT_TYPES.TEXT:
      case INPUT_TYPES.TEXT.toLowerCase():
      default:
        return (
          <TextInput
            { ...this.props }
            onChange={(text) => updateFormField(field, text)}
            onFocus={this.onFocus}
          />
        )
    }
  }
}

export default CelInput;
