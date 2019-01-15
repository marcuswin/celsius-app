import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { BackHandler, View, ScrollView } from "react-native";
import { connect } from 'react-redux';
import { createReduxBoundAddListener, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

import Navigator from '../../config/Navigator';
import * as appActions from "../../redux/actions";
import BottomNavigation from "../organisms/BottomNavigation/BottomNavigation";
import TodayRatesModal from "../organisms/TodayRatesModal/TodayRatesModal";
import TransferReceivedModal from "../organisms/TransferReceivedModal/TransferReceivedModal";
import OfflineMode from "../atoms/OfflineMode/OfflineMode";
import MaintenanceMode from "../atoms/OfflineMode/MaintenanceMode";
import NycBlackoutModal from "../organisms/NycBlackoutModal/NycBlackoutModal";

createReactNavigationReduxMiddleware("root", state => state.nav);

@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    activeScreen: state.nav.routes[state.nav.index].routeName,
    hasBottomNavigation: state.ui.hasBottomNavigation,
    connected: state.ui.internetConnected,
    maintenance: state.ui.maintenanceMode,
  }),
  dispatch => ({ dispatch, actions: bindActionCreators(appActions, dispatch) }),
)

class MainLayout extends Component {
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackButton = () => {
    this.props.actions.navigateBack();
    return true;
  };

  render() {
    const { hasBottomNavigation, connected, maintenance, } = this.props;

    const navigation = {
      dispatch: this.props.dispatch,
      state: this.props.nav,
      addListener: createReduxBoundAddListener("root"),
    };

    // const displayBottomNavigation = this.shouldRenderBottomNavigation();

    if (!connected) {
      return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} scrollEnabled={false}>
          <View style={{ flex: 1, }}>
            <OfflineMode purpose={"Connection"}/>
          </View>
        </ScrollView>
      )
    }

    if (maintenance) {
      return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} scrollEnabled={false}>
          <View style={{ flex: 1, }}>
            <MaintenanceMode />
          </View>
        </ScrollView>
      );
    }

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
