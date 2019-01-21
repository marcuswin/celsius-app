import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';

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

  // lifecycle methods
  // event hanlders
  // rendering methods
  render() {
    const { theme, style, children, onPress } = this.props
    const styleCmp = CircleButtonStyle(theme)
    return (
      <TouchableOpacity style={[styleCmp.container, style]} onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }
}

export default testUtil.hookComponent(CircleButton);
