import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Switch, Platform } from 'react-native';

import testUtil from "../../../utils/test-util";

import SwitchButtonStyle from "./SwitchButton.styles";
import CelText from '../../atoms/CelText/CelText';
import { getMargins } from '../../../utils/styles-util';
import STYLES from '../../../constants/STYLES';

class SwitchButton extends Component {

  static propTypes = {
    value: PropTypes.bool,
    margin: PropTypes.string,
    onPress: PropTypes.func,
    field: PropTypes.string,
    updateFormField: PropTypes.func,
  };
  static defaultProps = {
    margin: '20 0 0 0',
    value: false
  }

  changeValue = (value) => {
    const { updateFormField, field } = this.props;
    updateFormField(field, value);
  }

  render() {
    const { children, margin, onPress, value } = this.props;
    const style = SwitchButtonStyle()
    const falseColor = Platform.OS === 'ios' ? "transparent" : STYLES.COLORS.DARK_GRAY3;
    return (
      <TouchableOpacity style={[style.container, { ...getMargins(margin) }]} onPress={onPress}>
        <CelText type="H4">{children}</CelText>
        <Switch thumbColor={STYLES.COLORS.WHITE} ios_backgroundColor={STYLES.COLORS.DARK_GRAY3} trackColor={{ false: falseColor, true: STYLES.COLORS.GREEN }} value={value} onValueChange={this.changeValue} />
      </TouchableOpacity>
    );
  }
}

export default testUtil.hookComponent(SwitchButton);
