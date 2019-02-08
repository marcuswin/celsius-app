import React, { Component } from 'react';
import { View, Text } from 'react-native';

import testUtil from "../../../utils/test-util";
import AppearanceStyle from "./Appearance.styles";

class Appearance extends Component {

  render() {
    const style = AppearanceStyle();
    return (
      <View style={style.container}>
        <Text>Hello Appearance</Text>
      </View>
    );
  }

}

export default testUtil.hookComponent(Appearance);
