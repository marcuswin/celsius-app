import { Asset, Constants, Font, Segment } from "expo";
import { Image, NetInfo } from "react-native";
import twitter from "react-native-simple-twitter";

import { deleteSecureStoreKey, getSecureStoreKey, setSecureStoreKey } from "./expo-storage";
import baseUrl from "../services/api-url";
import store from "../redux/store";
import * as actions from "../redux/actions";
import Sentry from "./sentry-util";
import apiUtil from "./api-util";

const { SECURITY_STORAGE_AUTH_KEY, TWITTER_CUSTOMER_KEY, TWITTER_SECRET_KEY, SEGMENT_ANDROID_KEY, SEGMENT_IOS_KEY } = Constants.manifest.extra;

export default {
  initializeThirdPartyServices,
  logoutOnEnvChange,
  initInternetConnectivityListener,
  pollBackendStatus,
  cacheImages,
  cacheFonts,
}

async function initializeThirdPartyServices() {
  Sentry.init();
  apiUtil.initInterceptors();
  twitter.setConsumerKey(TWITTER_CUSTOMER_KEY, TWITTER_SECRET_KEY);
  await Segment.initialize({ androidWriteKey: SEGMENT_ANDROID_KEY, iosWriteKey: SEGMENT_IOS_KEY });
}

// For development use: Logout user when backend environment changes
async function logoutOnEnvChange() {
  const previousBaseUrl = await getSecureStoreKey("BASE_URL");
  if (previousBaseUrl !== baseUrl) {
    await deleteSecureStoreKey(SECURITY_STORAGE_AUTH_KEY);
    await setSecureStoreKey("BASE_URL", baseUrl);
  }
}

// Listen for Breaks in Internet Connection
function initInternetConnectivityListener() {
  NetInfo.isConnected.addEventListener("connectionChange", (isConnected) => store.dispatch(actions.setInternetConnection(isConnected)));
}


// Polls Status of Backend services every 30s
const POLL_INTERVAL = 30 * 1000;
let backendPollInterval;

async function pollBackendStatus() {
  if (backendPollInterval) clearInterval(backendPollInterval);
  await store.dispatch(actions.getBackendStatus());

  backendPollInterval = setInterval(async () => await store.dispatch(actions.getBackendStatus()), POLL_INTERVAL);
}

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
