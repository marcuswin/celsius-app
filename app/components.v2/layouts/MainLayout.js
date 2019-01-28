// TODO(fj): probably going to get removed, but check what it does
// TODO(fj): move offline and maintenance somewhere else
// TODO(fj): create component for all modals
// TODO(fj): maybe add scrolling logic here
// TODO(fj): maybe add app initializing logic here
// TODO(fj): probably going to get removed, but check what it does
// TODO(fj): move offline and maintenance somewhere else
// TODO(fj): create component for all modals
// TODO(fj): maybe add scrolling logic here
// TODO(fj): maybe add app initializing logic here
// TODO(fj): move general modals into a separate component
// TODO(fj): move To App.v2.js

// TODO(fj): basically moved to App.v2.js but check


import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { BackHandler, View, ScrollView } from "react-native";
import { connect } from 'react-redux';
// import { createReduxBoundAddListener, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

import Navigator from '../../config/Navigator';
import * as appActions from "../../redux/actions";
import BottomNavigation from "../organisms/BottomNavigation/BottomNavigation";
import TodayRatesModal from "../organisms/TodayRatesModal/TodayRatesModal";
import TransferReceivedModal from "../organisms/TransferReceivedModal/TransferReceivedModal";
import NycBlackoutModal from "../organisms/NycBlackoutModal/NycBlackoutModal";

// createReactNavigationReduxMiddleware("root", state => state.nav);

@connect(
  state => ({
    nav: state.nav,
    user: state.user.profile,
    activeScreen: state.nav.routes[state.nav.index].routeName,
    hasBottomNavigation: state.ui.hasBottomNavigation,
    connected: state.ui.internetConnected,
    maintenance: state.ui.maintenanceMode,
  }),
  dispatch => ({ dispatch, actions: bindActionCreators(appActions, dispatch) }),
)

class MainLayout extends Component {
  componentDidMount() {
    // Moved to app.js
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
  }

  componentWillUnmount() {
    // Moved to app.js
    this.backHandler.remove();
  }

  // Not used. blocked bc of android?
  handleBackButton = () => {
    this.props.actions.navigateBack();
    return true;
  };

  render() {
    const { hasBottomNavigation } = this.props;
    const navigation = {
      dispatch: this.props.dispatch,
      state: this.props.nav,
      // addListener: createReduxBoundAddListener("root"),
    };

    // const displayBottomNavigation = this.shouldRenderBottomNavigation();
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} scrollEnabled={false}>
        <View style={{ flex: 1 }}>
          <Navigator navigation={navigation} />
          {hasBottomNavigation && <BottomNavigation />}
          <TodayRatesModal />
          <NycBlackoutModal/>
          <TransferReceivedModal />
        </View>
      </ScrollView>
    );
  }
}

export default MainLayout;
