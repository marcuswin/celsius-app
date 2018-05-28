import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Input, Item, Label } from "native-base";

import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import {AUTO_CAPITALIZE, KEYBOARD_TYPE} from "../../../config/constants/common";

class TextInput extends Component {
  static propTypes = {
    theme: PropTypes.oneOf(['blue', 'white']),

    // inherited from CelInput
    labelText: PropTypes.string.isRequired,
    floatingLabel: PropTypes.bool,
    // for Input
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
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

  constructor(props) {
    super(props);

    this.state = {
      active: false,
    }
  }

  // rendering methods
  render() {
    const { editable, maxLength, secureTextEntry, keyboardType, multiline, floatingLabel, autoCapitalize, autoCorrect, spellCheck, placeholder, labelText, value, onFocus } = this.props;
    const { active } = this.state;

    let label = labelText || placeholder;
    label = (value || active) ? label.toUpperCase() : label;

    console.log(globalStyles)

    return (
      <View style={globalStyles.inputWrapper}>
        <Item style={globalStyles.inputItem} floatingLabel={floatingLabel}>
          <Label style={value || active ? globalStyles.inputLabelActive : globalStyles.inputLabelInactive}>{ label }</Label>
          <Input
            style={globalStyles.input}
            underlineColorAndroid='rgba(0,0,0,0)'
            underline={false}
            maxLength={maxLength}
            autoCapitalize={autoCapitalize}
            editable={editable}
            onFocus={() => {
              if (onFocus) onFocus()
              this.setState({ active: true })}
            }
            onBlur={() => this.setState({ active: false })}
            autoCorrect={autoCorrect}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            multiline={multiline}
            spellCheck={spellCheck}
            onChangeText={(text) => this.props.onChange(text) }
            value={value || ''}
          />
        </Item>
      </View>
    )
  }
}

export default TextInput;
