import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import FabStyle from "./Fab.styles";
import CircleButton from '../../atoms/CircleButton/CircleButton';

@connect(
  state => ({
    style: FabStyle(state.ui.theme),
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class Fab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { style, onPress, type, open } = this.props
    return (
      <View style={style.container}>
        <CircleButton style={style.fabButtonStyle} onPress={onPress} icon={open ? 'Close' : type} />
      </View>
    );
  }
}

export default testUtil.hookComponent(Fab);
