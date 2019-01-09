// TODO(fj): init segment in app actions
// TODO(fj): move handle app state change to app action
// TODO(fj): move AppLoading to custom loader in Home?
// TODO(fj): merge App and MainLayout?

import React, { Component } from 'react';
import { Asset, AppLoading, Font, Constants, Segment } from 'expo';
import { Provider } from 'react-redux';
import { Image, AppState, Platform } from 'react-native';

import store from './redux/store';
import apiUtil from './utils/api-util';
import * as actions from './redux/actions';
import MainLayout from './components.v2/layouts/MainLayout';
import { CACHE_IMAGES, FONTS } from "./config/constants/style";
import { analyticsEvents } from "./utils/analytics-util";
import Sentry from './utils/sentry-util';

const { SEGMENT_ANDROID_KEY, SEGMENT_IOS_KEY } = Constants.manifest.extra;

Sentry.init();
Sentry.captureException("asddsaasdadssdads")

let startOfBackgroundTimer;

// Initialize axios interceptors
apiUtil.initInterceptors();

// For images that saved to the local file system,
// use Expo.Asset.fromModule(image).downloadAsync()
// to download and cache the image.
// There is also a loadAsync() helper method to cache a batch of assets.
// For web images, use Image.prefetch(image).
// Continue referencing the image normally,
// e.g. with <Image source={require('path/to/image.png')} />
function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    }

    return Asset.fromModule(image).downloadAsync();
  });
}

// Fonts are preloaded using Expo.Font.loadAsync(font).
// The font argument in this case is an object such as the following:
// {agile-medium: require('../assets/fonts/Agile-Medium.otf')}.
function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default class App extends Component {
  // Init Application
  static async initApp() {
    await App.loadAssetsAsync();

    await Segment.initialize({
      androidWriteKey: SEGMENT_ANDROID_KEY,
      iosWriteKey: SEGMENT_IOS_KEY,
    });
  }

  // Assets are cached differently depending on where
  // they’re stored and how they’re used.
  static async loadAssetsAsync() {
    const imageAssets = cacheImages(CACHE_IMAGES);
    const fontAssets = cacheFonts(FONTS);

    await Promise.all([...imageAssets, ...fontAssets]);
  }

  constructor() {
    super();

    this.state = {
      isReady: false,
      appState: AppState.currentState
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);

  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  // fire mixpanel when app is activated from background
  handleAppStateChange = (nextAppState) => {

    const { user } = store.getState().users;
    const askForPinAfter = 25000
    if (nextAppState === 'active') {
      analyticsEvents.openApp();
      if (user) {
        analyticsEvents.sessionStart();
      }
      if (Platform.OS === "ios") {
        clearTimeout(this.timeout)
      } else if (new Date().getTime() - startOfBackgroundTimer > askForPinAfter) {
        startOfBackgroundTimer = null;
        store.dispatch(actions.navigateTo("LoginPasscode"));
      }
    }

    if (user && user.has_pin && this.state.appState === 'active' && nextAppState.match(/inactive|background/)) {
      analyticsEvents.sessionEnd();
      if (Platform.OS === "ios") {
        this.timeout = setTimeout(() => {
          store.dispatch(actions.navigateTo("LoginPasscode"));
          clearTimeout(this.timeout)
        }, askForPinAfter)
      } else {
        startOfBackgroundTimer = new Date().getTime();
      }
    }
    this.setState({ appState: nextAppState });
  };

  render() {
    if (!this.state.isReady) {

      // A React component that tells Expo to keep the app loading screen open
      // if it is the first and only component rendered in your app. When it
      // is removed, the loading screen will disappear
      // and your app will be visible.
      //
      // This is incredibly useful to let you download and cache fonts,
      // logo and icon images and other assets that you want to be sure the
      // user has on their device for an optimal experience
      // before rendering they start using the app.
      return (
        <AppLoading
          startAsync={App.initApp}
          onFinish={() => this.setState({ isReady: true })}
          onError={error => { Sentry.captureException(error) }}
        />
      );
    }

    return (
      <Provider store={store}>
        <MainLayout />
      </Provider>
    );
  }
}
