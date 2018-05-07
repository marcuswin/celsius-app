import React, { Component } from 'react';
import {bindActionCreators} from "redux";
import { addNavigationHelpers } from 'react-navigation';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';

import Navigator from '../../config/Navigator';
import * as actions from "../../redux/actions";

@connect(
  state => ({
    nav: state.nav,
  }),
  dispatch => ({ dispatch, ...bindActionCreators(actions, dispatch) }),
)

class MainLayout extends Component {

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));

  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackButton = () => {
    this.props.navigateBack();
    return true;
  };

  render() {
    const { dispatch, nav } = this.props;

    return <Navigator
      navigation={ addNavigationHelpers({ dispatch, state: nav }) }/>;
  }
}

export default MainLayout;
