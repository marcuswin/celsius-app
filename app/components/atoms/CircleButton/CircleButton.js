import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';

import testUtil from "../../../utils/test-util";
import CircleButtonStyle from "./CircleButton.styles";

class CircleButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };

    // binders
  }

  getIcon = (iconName) => {
    const { theme } = this.props
    const styleCmp = CircleButtonStyle(theme);

    switch (iconName) {
      case 'Celsius':
        return <Image
          source={require('../../../../assets/images/icons/celsius_symbol_white.png')}
          style={styleCmp.logo}
        />

      case 'Close':
        return <Text style={{ color: "#fff", fontSize: 25, alignSelf: 'center' }}>X</Text>

      case 'Wallet':
        return <Image
          source={require('../../../../assets/images/icons/celsius_symbol_white.png')}
          style={styleCmp.logo}
        />

      default:
        break;
    }
  }

  // lifecycle methods
  // event hanlders
  // rendering methods
  render() {
    const { theme, style, onPress, text, icon } = this.props
    const styleCmp = CircleButtonStyle(theme)
    return (
      <TouchableOpacity style={[styleCmp.container, style]} onPress={onPress}>
        <View>
          <View style={styleCmp.view}>
            {this.getIcon(icon)}
          </View>
          <View>
            {text &&
              <Text style={styleCmp.text}>{text}</Text>
            }
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default testUtil.hookComponent(CircleButton);
