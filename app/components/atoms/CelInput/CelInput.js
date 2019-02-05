import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import CelInputStyle from "./CelInput.styles";
import CelInputPassword from './CelInputPassword';
import CelInputText from './CelInputText';
import stylesUtil from '../../../utils/styles-util';
import { THEMES } from '../../../constants/UI';

@connect(
  state => ({
    cmpStyle: CelInputStyle(state.ui.theme),
    lastSavedTheme: state.ui.theme
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class CelInput extends Component {

  static propTypes = {
    type: PropTypes.oneOf(['text', 'password', 'tel', 'checkbox', 'pin', 'tfa', 'number']),
    theme: PropTypes.oneOf(Object.values(THEMES)),
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
    margin: PropTypes.string
  };

  static defaultProps = {
    type: 'text',
    keyboardType: 'default',
    autoFocus: false,
    disabled: false,
    maxLenght: 100,
    autoCapitalize: 'none',
    value: "",
    margin: '0 0 20 0'
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
    const { disabled, margin, theme, lastSavedTheme } = this.props;
    const currentTheme = theme || lastSavedTheme;
    const cmpStyle = CelInputStyle(currentTheme)
    const { active } = this.state;
    const style = [cmpStyle.container, stylesUtil.getMargins(margin)];
    if (active) style.push(cmpStyle.activeInput)
    if (disabled) style.push(cmpStyle.disabledInput)
    return style;
  }

  render() {
    const { type } = this.props
    const inputStyle = this.getInputStyle();
    return {
      'text':
        <View style={inputStyle}>
          <CelInputText {...this.props} />
        </View>,
      'password':
        <View style={inputStyle}>
          <CelInputPassword {...this.props} />
        </View>,
      // 'tel': ,
      // 'checkbox': ,
      // 'pin': ,
      // 'tfa': ,
      // 'number':
    }[type]
  }
}

export default testUtil.hookComponent(CelInput);
