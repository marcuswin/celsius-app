import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import testUtil from "../../../utils/test-util";
import CelInputStyle from "./CelInput.styles";
import CelInputPassword from './CelInputPassword';
import CelInputText from './CelInputText';
import stylesUtil from '../../../utils/styles-util';
import CelSelect from '../../molecules/CelSelect/CelSelect';
import Separator from '../../atoms/Separator/Separator';

class CelInput extends Component {

  static propTypes = {
    type: PropTypes.oneOf(['text', 'password', 'phone', 'checkbox', 'pin', 'tfa', 'number', 'text-area']),
    autoFocus: PropTypes.bool,
    // autoComplete: // android only
    disabled: PropTypes.bool,
    maxLenght: PropTypes.number,
    placeholder: PropTypes.string,
    keyboardType: PropTypes.oneOf(['default', 'number-pad', 'decimal-pad', 'numeric', 'email-address', 'phone-pad']),
    returnKeyType: PropTypes.oneOf(['done', 'go', 'next', 'search', 'send']),
    style: PropTypes.oneOfType([
      PropTypes.instanceOf(Object),
      PropTypes.number
    ]),
    autoCapitalize: PropTypes.oneOf(['none', 'sentences', 'words', 'characters']),
    onChange: PropTypes.func, //
    autoCorrect: PropTypes.bool, //
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]), //
    field: PropTypes.string.isRequired, //
    error: PropTypes.string, //
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    margin: PropTypes.string,
    basic: PropTypes.bool
  };

  static defaultProps = {
    type: 'text',
    keyboardType: 'default',
    autoFocus: false,
    disabled: false,
    maxLenght: 100,
    autoCapitalize: 'none',
    value: "",
    margin: '0 0 20 0',
    basic: false
  }

  constructor(props) {
    super(props);

    this.state = {
      active: false
    }
  }

  onChangeText = (text) => {
    const { field, onChange, actions } = this.props;
    if (onChange) {
      onChange(field, text);
    } else {
      actions.updateFormField(field, text);
    }
  }

  onInputFocus = () => {
    const { onFocus } = this.props;
    if (onFocus) onFocus();
    this.setState({ active: true })
  }

  onInputBlur = () => {
    const { onBlur } = this.props;
    if (onBlur) onBlur();
    this.setState({ active: false })
  }

  getInputStyle = () => {
    if (this.props.basic) return [];
    const { disabled, margin } = this.props;
    const cmpStyle = CelInputStyle()
    const { active } = this.state;
    const style = [cmpStyle.container, stylesUtil.getMargins(margin)];
    if (active) style.push(cmpStyle.activeInput)
    if (disabled) style.push(cmpStyle.disabledInput)
    return style;
  }

  render() {
    const { type, value } = this.props
    const inputStyle = this.getInputStyle();

    switch (type) {
      case 'password':
        return (
          <View style={inputStyle}>
            <CelInputPassword {...this.props} />
          </View>
        )
      case 'phone':
        return (
          <View style={[inputStyle, { flexDirection: 'row', alignItems: 'center' }]}>
            <CelSelect {...this.props} />
            <CelInputText style={{ flex: 1 }} {...this.props} field={`${this.props.field}.text`} value={value.text} />
          </View>
        )
      case 'text-area':
        return (
          <View style={[inputStyle, { height: "auto" }]}>
            <View>
              <CelInputText
                style={{ height: this.props.numberOfLines * 23 }}
                {...this.props}
                multiline
              />
            </View>
            {this.props.emojis && (
              <View>
                <Separator color='#737A82' />
                <View style={{ height: 50, paddingVertical: 30, paaddingHorizontal: 20 }}>
                  <Text> EMOJI </Text>
                </View>
              </View>
            )}
          </View>
        )
        // return (
        //   <View style={[inputStyle, { height: "auto" }]}>
        //     <CelTextArea {...this.props} />
        //   </View>
        // )
      case 'text':
      default:
        return (
          <View style={inputStyle}>
            <CelInputText {...this.props} />
          </View>
        )
    }
  }
}

export default testUtil.hookComponent(CelInput);
