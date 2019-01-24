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
    theme: state.ui.theme,
    fabMenuOpen: state.ui.fabMenuOpen
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class Fab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getIconName = () => {
    const { fabMenuOpen, type } = this.props;
    if (fabMenuOpen) return 'Close';
    return {
      'MAIN': 'Celsius',
      'SUPPORT': 'Support'
    }[type]
  }

  render() {
    const { style, onPress } = this.props
    const iconName = this.getIconName();
    return (
      <View style={style.container}>
        <CircleButton style={style.fabButtonStyle} type="Menu" theme={'celsius'} onPress={onPress} icon={iconName} />
      </View>
    );
  }
}

export default testUtil.hookComponent(Fab);
