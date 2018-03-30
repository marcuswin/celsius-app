import React, {Component} from 'react';
import {Asset, AppLoading, Font} from 'expo';
import {Provider} from 'react-redux';
import {Image} from 'react-native';
import wc from 'which-country';
import twitter from 'react-native-simple-twitter';
import Sentry from 'sentry-expo';
import {TWITTER_CUSTOMER_KEY, TWITTER_SECRET_KEY, SENTRY, SECURITY_STORAGE_AUTH_KEY} from 'react-native-dotenv'

import configureStore from './config/configureStore';
import apiUtil from './utils/api-util';
import * as actions from './redux/actions';
import MainLayout from './layout/MainLayout';
import {CACHE_IMAGES, FONTS} from "./config/constants/style";
import {getSecureStoreKey} from "./utils/expo-storage";

Sentry.config(SENTRY).install();

const store = configureStore();

// Initialize axios interceptors
apiUtil.initInterceptors();

// For images that saved to the local filesytem,
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

    if (!SECURITY_STORAGE_AUTH_KEY) {
      console.error('NO SECURITY_STORAGE_AUTH_KEY')
    }

    // get user token
    const token = await getSecureStoreKey(SECURITY_STORAGE_AUTH_KEY);
    // get user from db
    if (token) await store.dispatch(actions.getLoggedInBorrower());

    // init twitter login service
    twitter.setConsumerKey(TWITTER_CUSTOMER_KEY, TWITTER_SECRET_KEY);

    navigator.geolocation.getCurrentPosition(
      pos => pos ? store.dispatch(actions.setUserLocation(wc([pos.coords.longitude, pos.coords.latitude]))) : null
    );
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
    };
  }

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
          onFinish={() => this.setState({isReady: true})}
          /* eslint-disable no-console */
          onError={console.warn}
          /* eslint-disable no-console */
        />
      );
    }

    return (
      <Provider store={store}>
        <MainLayout/>
      </Provider>
    );
  }
}
