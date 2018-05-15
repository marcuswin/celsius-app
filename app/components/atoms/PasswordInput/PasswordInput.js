import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import PasswordInputStyle from "./PasswordInput.styles";
import Icon from "../Icon/Icon";
import PrimaryInput from "../../atoms/Inputs/PrimaryInput";

class PasswordInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };

    // binders
  }

  // lifecycle methods
  // Event Handlers
  // rendering methods
  render() {
    const { visible } = this.state;
    return (
      <View>
        <PrimaryInput
          { ...this.props }
          secureTextEntry={ !visible }
        />
        <TouchableOpacity onPress={ () => this.setState({ visible: !visible })} style={visible ? PasswordInputStyle.eyeHide : PasswordInputStyle.eyeShow}>
          <Icon
            name={ visible ? 'EyeHide' : 'EyeShow' }
            height='30'
            width='30'
            viewBox={ visible ? "0 0 35 24" : '0 0 35 24' }
            fill={'#000'}
            stroke={'#000'}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default PasswordInput;
