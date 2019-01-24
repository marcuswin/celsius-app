import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Text } from 'react-native';

import testUtil from "../../../utils/test-util";
import CircleButtonStyle from "./CircleButton.styles";
import Icon from '../Icon/Icon';
// import Icon from '../../../components.v2/atoms/Icon/Icon';

class CircleButton extends Component {

  static propTypes = {
    text: PropTypes.string,
    type: PropTypes.oneOf(['Menu', 'Theme', 'Coin']),
    theme: PropTypes.string.isRequired,
    icon: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };

    // binders
  }

  render() {
    const { theme, style, onPress, text, icon, type } = this.props
    let fillColor = "";
    const styleCmp = CircleButtonStyle(theme);
    if (icon) {
      fillColor = styleCmp[`icon${type}`].fill
    }
    const textStyle = [styleCmp.text, styleCmp[`text${type}`]];
    return (
      <TouchableOpacity style={[styleCmp.container, style]} onPress={onPress}>
        <View>
          <View style={[styleCmp.view, styleCmp[`view${type}`]]}>
            {icon &&
              <Icon theme={theme} name={icon} width="50" height="50" fill={fillColor} />
            }
          </View>
          <View>
            {text &&
              <Text style={textStyle}>{text}</Text>
            }
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default testUtil.hookComponent(CircleButton);
