// TODO(fj): init segment in app actions (removed from App.v2.js)
// TODO(fj): move handle app state change to app action (removed logic from App.v2.js)
// TODO(fj): move app loading assets to app action (removed logic from App.v2.js)
// TODO(fj): merge App and MainLayout?

// TODO(fj): create offline and no internet screens or a static screen with type?

import React, { Component } from 'react';
// import { AppLoading } from 'expo';
import { Provider } from 'react-redux';
import { AppState, BackHandler, View } from "react-native";
import {
  createReactNavigationReduxMiddleware,
  // createReduxBoundAddListener
} from "react-navigation-redux-helpers";

import store from './redux/store';
import apiUtil from './utils/api-util';
import * as actions from './redux/actions';
import Sentry from './utils/sentry-util';
// import TodayRatesModal from "./components.v2/organisms/TodayRatesModal/TodayRatesModal";
// import NycBlackoutModal from "./components.v2/organisms/NycBlackoutModal/NycBlackoutModal";
// import TransferReceivedModal from "./components.v2/organisms/TransferReceivedModal/TransferReceivedModal";
// import Navigator from './config/Navigator';
import FABMenu from "./components/organisms/FABMenu/FABMenu";

Sentry.init();

// Initialize axios interceptors
apiUtil.initInterceptors();

createReactNavigationReduxMiddleware("root", state => state.nav);

export default class App extends Component {
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    AppState.addEventListener('change', actions.handleAppStateChange);
  }
  componentWillUnmount() {
    this.backHandler.remove();
    AppState.addEventListener('change', actions.handleAppStateChange);
  }

  render() {
    // const areAssetsLoaded = store.getState().app.assetsLoaded;
    // return areAssetsLoaded ? (
    //   <AppLoading
    //     startAsync={actions.loadAssets}
    //     onFinish={actions.loadAssetsSuccess}
    //     onError={error => { Sentry.captureException(error) }}
    //   />
    // ) : (
    //   <CelsiusApplication />
    // )

    return <CelsiusApplication />
  }
}

// const navigation = {
//   dispatch: store.dispatch,
//   state: store.getState().nav,
//   addListener: createReduxBoundAddListener("root"),
// };

const CelsiusApplication = () => (
  <Provider store={store}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FABMenu/>
    </View>
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
