import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import BackButtonStyle from './styles';

class BackButton extends Component {
  render() {
    const { onPress, customStyles } = this.props;
    return (
      <TouchableOpacity
        style={ [BackButtonStyle.button, customStyles] }
        onPress={ onPress }
      >
        <Image
          source={ require('../../../../assets/images/icons/icon-back.png') }/>
      </TouchableOpacity>
    );
  }
}

export { BackButton };
