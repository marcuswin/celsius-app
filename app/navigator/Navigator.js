import { createAppContainer, createStackNavigator, createSwitchNavigator } from "react-navigation";

import Home from "../components/screens/Home/Home";
import Support from "../components/screens/Support/Support";
import Community from "../components/screens/Community/Community";

import { INITIAL_ROUTE } from "../constants/UI";
import { borrowNavigator } from './flows/borrowFlow';
import { defaultNavigationOptions, transitionConfig } from './navigationConfig';
import { celPayNavigator } from './flows/celPayFlow';
import { walletNavigator } from './flows/walletFlow';
import { profileNavigator } from './flows/profileFlow';
import { authNavigator } from './flows/authFlow'
import { depositNavigator } from './flows/depositFlow'



export const supportNavigator = createStackNavigator({Support}, {
  defaultNavigationOptions,
  transitionConfig
});

export const communityNavigator = createStackNavigator({Community}, {
  defaultNavigationOptions,
  transitionConfig
});

export const screens = {
  Home,
  WalletFab: walletNavigator,
  CelPayFab: celPayNavigator,
  ProfileFab: profileNavigator,
  Auth: authNavigator,
  BorrowFab: borrowNavigator,
  DepositFab: depositNavigator,
  SupportFab: supportNavigator,
  CommunityFab: communityNavigator
};

const navigatorProps = {
  initialRouteName: INITIAL_ROUTE,
  transitionConfig,
  defaultNavigationOptions
};

const AppNavigator = createSwitchNavigator(screens, navigatorProps);

export default createAppContainer(AppNavigator);
