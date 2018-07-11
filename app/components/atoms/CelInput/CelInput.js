import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {AUTO_CAPITALIZE, KEYBOARD_TYPE} from "../../../config/constants/common";
import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";
import SixDigitInput from "./SixDigitInput";
import * as actions from "../../../redux/actions";

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
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onPress: PropTypes.func,
    editable: PropTypes.bool,
    maxLength: PropTypes.number,
    secureTextEntry: PropTypes.bool,
    keyboardType: PropTypes.string,
    returnKeyType: PropTypes.string,
    multiline: PropTypes.bool,
    autoCapitalize: PropTypes.string,
    autoCorrect: PropTypes.bool,
    spellCheck: PropTypes.bool,
  };

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
    const { onPress, scrollTo, field } = this.props;
    if (onPress) {
      onPress();
    }

    // keyboard fires after focus
    scrollTo({ field });

    return false;
  };

  onChangeText = (text) => {
    const { updateFormField, field, onChange } = this.props;
    if (onChange) {
      onChange(field, text);
    } else {
      updateFormField(field, text);
    }
  }


  handleLayout = (layout) => {
    const { field, setInputLayout } = this.props;
    setInputLayout(field, layout);
  }

  // rendering methods
  render() {

    this.state = {
      active: false,
    };



    switch (this.props.type) {
      case INPUT_TYPES.NUMBER:
      case INPUT_TYPES.NUMBER.toLowerCase():
        return (
          <TextInput
            { ...this.props }
            onChange={this.onChangeText}
            onFocus={this.onFocus}
            keyboardType={KEYBOARD_TYPE.NUMERIC}
            onLayout={this.handleLayout}
          />
        )

      case INPUT_TYPES.PASSWORD:
      case INPUT_TYPES.PASSWORD.toLowerCase():
        return (
          <PasswordInput
            { ...this.props }
            onChange={this.onChangeText}
            onFocus={this.onFocus}
            onLayout={this.handleLayout}
          />
        )

      case INPUT_TYPES.SIX_DIGIT:
      case 'six-digit':
        return (
          <SixDigitInput
            { ...this.props }
            onChange={this.onChangeText}
            onFocus={this.onFocus}
            onLayout={this.handleLayout}
          />
        )

      case INPUT_TYPES.TEXT:
      case INPUT_TYPES.TEXT.toLowerCase():
      default:
        return (
          <TextInput
            { ...this.props }
            onChange={this.onChangeText}
            onFocus={this.onFocus}
            onLayout={this.handleLayout}
          />
        )
    }
  }
}

export default CelInput;
