// TODO(fj): init segment in app actions (removed from App.v2.js)
// TODO(fj): move handle app state change to app action (removed logic from App.v2.js)
// TODO(fj): move app loading assets to app action (removed logic from App.v2.js)
// TODO(fj): merge App and MainLayout?

// TODO(fj): create offline and no internet screens or a static screen with type?

import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { Provider } from 'react-redux';
import { AppState, BackHandler } from "react-native";
import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener
} from "react-navigation-redux-helpers";

import store from './redux/store';
import * as actions from './redux/actions';
import appUtil from './utils/app-util';
import Sentry from './utils/sentry-util';
import Navigator from './Navigator.v3';

appUtil.initializeThirdPartyServices()

createReactNavigationReduxMiddleware("root", state => state.nav);

export default class App extends Component {
  constructor() {
    super();
    this.state = { isReady: false };
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    AppState.addEventListener('change', actions.handleAppStateChange);
  }
  componentWillUnmount() {
    this.backHandler.remove();
    AppState.removeEventListener('change');
  }

  initApp = async() => await store.dispatch(actions.loadCelsiusAssets());

  render() {
    const { isReady } = this.state;

    return !isReady ? (
      <AppLoading
        startAsync={this.initApp()}
        onFinish={() => this.setState({ isReady: true }) }
        onError={error => Sentry.captureException(error) }
      />
    ) : (
      <CelsiusApplication />
    )

    // return <CelsiusApplication />
  }
}

const navigation = {
  dispatch: store.dispatch,
  state: store.getState().nav,
  addListener: createReduxBoundAddListener("root"),
};

const CelsiusApplication = () => (
  <Provider store={store}>
    <Navigator navigation={navigation}/>
  </Provider>
)
// const CelsiusApplication = (
//   <Provider store={store}>
//     <ScrollView contentContainerStyle={{ flexGrow: 1 }} scrollEnabled={false}>
//       <View style={{ flex: 1 }}>
//         <Navigator navigation={navigation} />
//         <FAB/>
//         <GeneralModals />
//       </View>
//     </ScrollView>
//   </Provider>
// )
//
// const GeneralModals = (
//   <View>
//     <TodayRatesModal/>
//     <NycBlackoutModal/>
//     <TransferReceivedModal/>
//   </View>
// )
//
// const FAB = (
//   <View />
// )
