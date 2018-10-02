import React, { Component } from 'react';
import {bindActionCreators} from "redux";
import { BackHandler, View } from "react-native";
import { connect } from 'react-redux';
import { createReduxBoundAddListener, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

import Navigator from '../../config/Navigator';
import * as appActions from "../../redux/actions";
import BottomNavigation from "../organisms/BottomNavigation/BottomNavigation";
import TodayRatesModal from "../organisms/TodayRatesModal/TodayRatesModal";
import TransferReceivedModal from "../organisms/TransferReceivedModal/TransferReceivedModal";

createReactNavigationReduxMiddleware("root", state => state.nav);

@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    activeScreen: state.nav.routes[state.nav.index].routeName,
    hasBottomNavigation: state.ui.hasBottomNavigation,
  }),
  dispatch => ({ dispatch, actions: bindActionCreators(appActions, dispatch) }),
)

class MainLayout extends Component {
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackButton = () => {
    this.props.actions.navigateBack();
    return true;
  };

  render() {
    const { hasBottomNavigation } = this.props
    const navigation = {
      dispatch: this.props.dispatch,
      state: this.props.nav,
      addListener: createReduxBoundAddListener("root"),
    };

    // const displayBottomNavigation = this.shouldRenderBottomNavigation();

    return (
      <View style={{flex: 1,}}>
        <Navigator navigation={navigation} />
        {hasBottomNavigation && <BottomNavigation/>}
        <TodayRatesModal/>
        <TransferReceivedModal/>
      </View>
    );
  }
}

export default MainLayout;
