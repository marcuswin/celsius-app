import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

import testUtil from "../../../utils/test-util";
import CircleButtonStyle from "./CircleButton.styles";
import Icon from '../Icon/Icon';
import CelText from '../CelText/CelText';

class CircleButton extends Component {

  static propTypes = {
    theme: PropTypes.string,
    style: PropTypes.oneOfType([
      PropTypes.number, // StyleSheet.create() returns number
      PropTypes.instanceOf(Object)
    ]),
    onPress: PropTypes.func,
    text: PropTypes.string,
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    disabled: PropTypes.bool,
    isSelected: PropTypes.bool,
    selectable: PropTypes.bool,
    type: PropTypes.oneOf(['menu', 'theme', 'coin']).isRequired,
  };

  static defaultProps = {
    isSelected: false,
    selectable: false,
    disabled: false,
  };

  shouldComponentUpdate(nextProps) {
    const { isSelected, theme, icon } = this.props;
    return isSelected !== nextProps.isSelected || theme !== nextProps.theme || icon !== nextProps.icon;
  }

  getFillColor = (style) => StyleSheet.flatten(style.fillColor).color; // get color from raw json depending on style theme

  render() {
    const { disabled, theme, style, onPress, text, icon, type, isSelected, selectable } = this.props;
    let fillColor = "";
    const styleCmp = CircleButtonStyle(theme);
    if (icon) {
      fillColor = this.getFillColor(styleCmp);
    }
    const textStyle = [styleCmp.text, styleCmp[`text${type}`]];

    return (
      <TouchableOpacity disabled={disabled} style={[styleCmp.container, style]} onPress={!onPress ? () => {} : onPress}>
        <View style={{opacity: isSelected || !selectable ? 1 : 0.5 }}>
          <View style={[styleCmp.view, styleCmp[`view${type}`]]}>
            {icon &&
              <Icon name={icon} fill={fillColor} />
            }
          </View>
          <View>
            {text &&
              <CelText align="center" style={textStyle}>{text}</CelText>
            }
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default testUtil.hookComponent(CircleButton);
