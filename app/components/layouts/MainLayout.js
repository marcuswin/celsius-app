import React, { Component } from 'react';
import {bindActionCreators} from "redux";
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import moment from "moment";
import {Constants} from "expo";
import { createReduxBoundAddListener, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

import Navigator from '../../config/Navigator';
import * as actions from "../../redux/actions";

const {ENV, PUBLISH_TIME} = Constants.manifest.extra;

createReactNavigationReduxMiddleware("root", state => state.nav);

@connect(
  state => ({
    nav: state.nav,
  }),
  dispatch => ({ dispatch, ...bindActionCreators(actions, dispatch) }),
)

class MainLayout extends Component {

  componentDidMount() {
    const { showMessage } = this.props;
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));

    // flash date of deploy message
    if (ENV !== 'PRODUCTION' && PUBLISH_TIME) {
      showMessage('warning', `Dev Info: App published on ${ moment(PUBLISH_TIME).format('ddd, DD-MMM HH:mm Z') }GMT`)
    }
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackButton = () => {
    this.props.navigateBack();
    return true;
  };

  render() {
    const navigation = {
      dispatch: this.props.dispatch,
      state: this.props.nav,
      addListener: createReduxBoundAddListener("root"),
    };

    return <Navigator navigation={navigation} />;
  }
}

export default MainLayout;
