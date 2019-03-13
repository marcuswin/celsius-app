import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Switch } from 'react-native';

import testUtil from "../../../utils/test-util";

import SwitchButtonStyle from "./SwitchButton.styles";
import CelText from '../../atoms/CelText/CelText';
import { getMargins } from '../../../utils/styles-util';

class SwitchButton extends Component {

  static propTypes = {
    value: PropTypes.bool,
    margin: PropTypes.string,
    onPress: PropTypes.func,
    field: PropTypes.string.required,
    updateFormField: PropTypes.func.required,
  };
  static defaultProps = {
    margin: '20 0 20 0',
    value: false
  }

  changeValue = (value) => {
    const { updateFormField, field } = this.props;
    updateFormField(field, value);
  }

  render() {
    const { children, margin, onPress, value } = this.props;
    const style = SwitchButtonStyle()
    return (
      <TouchableOpacity style={[style.container, { ...getMargins(margin) }]} onPress={onPress}>
        <CelText type="H4">{children}</CelText>
        <Switch value={value} onValueChange={this.changeValue} />
      </TouchableOpacity>
    );
  }
}

export default testUtil.hookComponent(SwitchButton);
