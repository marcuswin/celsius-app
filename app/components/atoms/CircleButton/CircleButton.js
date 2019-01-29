import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';

import testUtil from "../../../utils/test-util";
import CircleButtonStyle from "./CircleButton.styles";
import Icon from '../Icon/Icon';
import CelText from '../CelText/CelText';
import STYLES from '../../../constants/STYLES';

class CircleButton extends Component {

  static propTypes = {
    theme: PropTypes.string.isRequired,
    style: PropTypes.oneOfType([
      PropTypes.number, // StyleSheet.create() returns number
      PropTypes.instanceOf(Object)
    ]),
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string,
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    type: PropTypes.oneOf(['menu', 'theme', 'coin']).isRequired,
  };
  static defaultProps = {
  }

  getFillColor = () => {
    const { theme, type } = this.props;
    return {
      'light': {
        'menu': STYLES.COLORS.DARK_GRAY,
        'theme': STYLES.COLORS.DARK_GRAY,
        'coin': STYLES.COLORS.DARK_GRAY
      }[type],
      'dark': {
        'menu': STYLES.COLORS.WHITE_OPACITY5,
        'theme': STYLES.COLORS.WHITE_OPACITY5,
        'coin': STYLES.COLORS.WHITE_OPACITY5
      }[type],
      'celsius': {
        'menu': STYLES.COLORS.WHITE,
        'theme': STYLES.COLORS.WHITE,
        'coin': STYLES.COLORS.WHITE
      }[type],
    }[theme]
  }

  render() {
    const { theme, style, onPress, text, icon, type } = this.props
    let fillColor = "";
    const styleCmp = CircleButtonStyle(theme);
    if (icon) {
      fillColor = this.getFillColor();
    }
    const textStyle = [styleCmp.text, styleCmp[`text${type}`]];
    return (
      <TouchableOpacity style={[styleCmp.container, style]} onPress={onPress}>
        <View>
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