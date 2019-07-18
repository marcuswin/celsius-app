import { AppLoading, Google, Notifications, registerRootComponent } from 'expo';

import * as SecureStore from 'expo-secure-store';
import * as Contacts from 'expo-contacts';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Camera } from 'expo-camera';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import * as GoogleSignIn from 'expo-google-sign-in';
import * as Facebook from 'expo-facebook';
import { BlurView } from 'expo-blur';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as Segment from 'expo-analytics-segment';
import Constants from 'expo-constants';
import * as Svg from 'react-native-svg';

export {
  Svg,
  Constants,
  Segment,
  Location,
  Permissions,
  BarCodeScanner,
  AppLoading,
  BlurView,
  Facebook,
  GoogleSignIn,
  Google,
  Asset,
  Font,
  Notifications,
  Camera,
  ImageManipulator,
  ImagePicker,
  Contacts,
  registerRootComponent,
  SecureStore,
}
