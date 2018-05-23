import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Input, Item, Label } from "native-base";

// import {STYLES} from "../../config/constants/style";
import CelInputStyle from "./CelInput.styles";
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

  // rendering methods
  render() {
    const { editable, maxLength, secureTextEntry, keyboardType, multiline, floatingLabel, autoCapitalize, autoCorrect, spellCheck, placeholder, labelText, value } = this.props;

    return (
      <View style={CelInputStyle.wrapper}>
        <Item style={CelInputStyle.item} floatingLabel={floatingLabel}>
          <Label style={value ? CelInputStyle.labelActive : CelInputStyle.label}>{ labelText || placeholder }</Label>
          <Input
            style={CelInputStyle.input}
            underlineColorAndroid='rgba(0,0,0,0)'
            underline={false}
            maxLength={maxLength}
            autoCapitalize={autoCapitalize}
            editable={editable}
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
