import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import Test1Style from "./Test1.styles";

@connect(
  state => ({
    style: Test1Style(state.ui.theme),
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class Test1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { style } = this.props
    return (
      <View style={style.container}>
        <Text>Hello Test1</Text>
      </View>
    );
  }
}

export default testUtil.hookComponent(Test1);
