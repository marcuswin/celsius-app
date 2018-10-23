import { hook } from 'cavy';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {AUTO_CAPITALIZE, KEYBOARD_TYPE} from "../../../config/constants/common";
import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";
import SixDigitInput from "./SixDigitInput";
import * as appActions from "../../../redux/actions";
import InputErrorWrapper from "../InputErrorWrapper/InputErrorWrapper";
import PinInput from "./PinInput";

const INPUT_TYPES = {
  TEXT: 'TEXT',
  NUMBER: 'NUMBER',
  PHONE: 'PHONE',
  PASSWORD: 'PASSWORD',
  SIX_DIGIT: 'SIX_DIGIT',
  PIN: 'PIN',
}

const inputTypes = [
  INPUT_TYPES.TEXT, INPUT_TYPES.TEXT.toLowerCase(),
  INPUT_TYPES.NUMBER, INPUT_TYPES.NUMBER.toLowerCase(),
  INPUT_TYPES.PHONE, INPUT_TYPES.PHONE.toLowerCase(),
  INPUT_TYPES.PASSWORD, INPUT_TYPES.PASSWORD.toLowerCase(),
  // SIX_DIXIT, six-digit
  INPUT_TYPES.SIX_DIGIT, INPUT_TYPES.SIX_DIGIT.toLowerCase().replace('_', '-'),
  INPUT_TYPES.PIN, INPUT_TYPES.PIN.toLowerCase(),
]

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class CelInput extends Component {
  static propTypes = {
    type: PropTypes.oneOf(inputTypes),
    theme: PropTypes.oneOf(['blue', 'white']),
    field: PropTypes.string.isRequired,
    error: PropTypes.string,

    // inherited from CelInput
    labelText: PropTypes.string,
    floatingLabel: PropTypes.bool,
    // for Input
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onPress: PropTypes.func,
    editable: PropTypes.bool,
    maxLength: PropTypes.number,
    digits: PropTypes.number,
    testSelector: PropTypes.string,
    showDigits: PropTypes.bool,
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
    digits: 4,
    testSelector: null,
    showDigits: false,
    keyboardType: KEYBOARD_TYPE.DEFAULT,
    multiline: false,
    autoCapitalize: AUTO_CAPITALIZE.NONE,
    autoCorrect: false,
    spellCheck: false,
  }

  onFocus = () => {
    const { onPress, actions, field } = this.props;
    if (onPress) {
      onPress();
    }

    // keyboard fires after focus
    actions.scrollTo({ field });

    return false;
  };

  onChangeText = (text) => {
    const { field, onChange, actions } = this.props;
    if (onChange) {
      onChange(field, text);
    } else {
      actions.updateFormField(field, text);
    }
  }


  handleLayout = (layout) => {
    const { field, actions } = this.props;
    actions.setInputLayout(field, layout);
  }

  // rendering methods
  render() {    
    const { theme, error, type } = this.props;

    this.state = {
      active: false,
    };

    let inputField;

    switch (type) {
      case INPUT_TYPES.NUMBER:
      case INPUT_TYPES.NUMBER.toLowerCase():
        inputField = (
          <TextInput
            { ...this.props }
            onChange={this.onChangeText}
            onFocus={this.onFocus}
            keyboardType={KEYBOARD_TYPE.NUMERIC}
            onLayout={this.handleLayout}
          />
        );
        break;

      case INPUT_TYPES.PASSWORD:
      case INPUT_TYPES.PASSWORD.toLowerCase():
        inputField = (
          <PasswordInput
            { ...this.props }
            onChange={this.onChangeText}
            onFocus={this.onFocus}
            onLayout={this.handleLayout}
          />
        );
        break;

      case INPUT_TYPES.SIX_DIGIT:
      case "six-digit":
        inputField = (
          <SixDigitInput
            { ...this.props }
            onChange={this.onChangeText}
            onFocus={this.onFocus}
            onLayout={this.handleLayout}
          />
        );
        break;

      case INPUT_TYPES.PIN:
      case INPUT_TYPES.PIN.toLowerCase():
        inputField = (
          <PinInput
            { ...this.props } 
            onChange={this.onChangeText}
            onFocus={this.onFocus}
            onLayout={this.handleLayout}
          />
        )
        break;

      case INPUT_TYPES.TEXT:
      case INPUT_TYPES.TEXT.toLowerCase():
      default:
        inputField = (
          <TextInput
            { ...this.props }
            onChange={this.onChangeText}
            onFocus={this.onFocus}
            onLayout={this.handleLayout}
          />
        )
    }

    return (
      <InputErrorWrapper
        theme={theme}
        error={error}
      >
        {inputField}
      </InputErrorWrapper>
    );
  }
}

const testable = hook(CelInput)
export default testable;
// export default CelInput;
