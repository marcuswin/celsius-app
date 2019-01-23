import React, { Component } from 'react';
import { Segment, Asset, AppLoading, Font, Constants } from 'expo';
import Branch from 'react-native-branch';
import { Provider } from 'react-redux';
import { Image, NetInfo, AppState, Platform, Text, TextInput } from 'react-native';
import twitter from 'react-native-simple-twitter';
import Sentry from 'sentry-expo';
import uuid from 'uuid';

import store from './redux/store';
import apiUtil from './utils/api-util';
import * as actions from './redux/actions';
import MainLayout from './components/layouts/MainLayout';
import { CACHE_IMAGES, FONTS } from "./config/constants/style";
import { getSecureStoreKey, deleteSecureStoreKey, setSecureStoreKey } from "./utils/expo-storage";
import baseUrl from "./services/api-url";
import { mixpanelAnalytics } from "./services/mixpanel";
import { KYC_STATUSES, TRANSFER_STATUSES } from "./config/constants/common";
import { analyticsEvents } from "./utils/analytics-util";

const { SENTRY_DSN, TWITTER_CUSTOMER_KEY, TWITTER_SECRET_KEY, SECURITY_STORAGE_AUTH_KEY, SEGMENT_ANDROID_KEY, SEGMENT_IOS_KEY } = Constants.manifest.extra;

if (SENTRY_DSN) {
  Sentry.enableInExpoDevelopment = true;
  Sentry.config(SENTRY_DSN).install();
}

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

function handleConnectivityChange(isConnected) {
  store.dispatch(actions.setInternetConnectivity(isConnected));
}

function handleDeepLink(deepLink) {
  if (!deepLink || !deepLink['+clicked_branch_link']) {
    return;
  }

  store.dispatch(actions.registerBranchLink(deepLink));
}

function pollBackendStatus() {
  setInterval(async () => {
    await store.dispatch(actions.getBackendStatus());
  }, 30000);
}

export default class App extends Component {
  // Init Application
  static async initApp() {
    await App.loadAssetsAsync();

    if (!SECURITY_STORAGE_AUTH_KEY) {
      console.error('NO SECURITY_STORAGE_AUTH_KEY')
    }

    // disables letter sizing in phone's Accessibility menu
    if (Text.defaultProps == null) Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;

    // same same as with Text, but different
    if (TextInput.defaultProps == null) TextInput.defaultProps = {};
    TextInput.defaultProps.allowFontScaling = false;

    // logout user if backend environment has changed
    const previousBaseUrl = await getSecureStoreKey('BASE_URL');
    if (previousBaseUrl !== baseUrl) {
      await deleteSecureStoreKey(SECURITY_STORAGE_AUTH_KEY);
      await setSecureStoreKey('BASE_URL', baseUrl);
    }

    await Segment.initialize({
      androidWriteKey: SEGMENT_ANDROID_KEY,
      iosWriteKey: SEGMENT_IOS_KEY,
    });

    // get user token
    const token = await getSecureStoreKey(SECURITY_STORAGE_AUTH_KEY);
    // get user from db
    if (token) {
      await store.dispatch(actions.getProfileInfo());
      await store.dispatch(actions.getWalletDetails());
      await store.dispatch(actions.getAllTransfers(TRANSFER_STATUSES.claimed));

      const { user } = store.getState().users;
      if (!user.kyc || (user.kyc && user.kyc.status !== KYC_STATUSES.passed)) {
        await store.dispatch(actions.getKYCDocTypes());
      }
    } else {
      mixpanelAnalytics.identify(uuid())
      store.dispatch(actions.fireUserAction("enteredInitialPin"))
    }

    // get user app settings
    const appSettings = await getSecureStoreKey('APP_SETTINGS');
    if (appSettings) {
      store.dispatch(actions.updateUserAppSettings(JSON.parse(appSettings)));
    }

    // get general data for te app
    await store.dispatch(actions.getSupportedCurrencies())
    await store.dispatch(actions.getBackendStatus())

    pollBackendStatus();

    // init twitter login service
    twitter.setConsumerKey(TWITTER_CUSTOMER_KEY, TWITTER_SECRET_KEY);

    const initialConnection = await NetInfo.isConnected.fetch();

    handleConnectivityChange(initialConnection);

    try {
      Branch.subscribe((deepLink) => {
        if (deepLink.error || !deepLink.params) {
          return;
        }

        handleDeepLink(deepLink.params);
      });
    } catch (error) {
      Sentry.captureException(error);
    }


    NetInfo.isConnected.addEventListener(
      "connectionChange",
      handleConnectivityChange
    );

    analyticsEvents.openApp();

    const { user } = store.getState().users;
    if (user) {
      analyticsEvents.sessionStart();
    }
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
