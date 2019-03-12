import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";

import Home from "../components/screens/Home/Home";
import Deposit from "../components/screens/Deposit/Deposit";
import Support from "../components/screens/Support/Support";
import Community from "../components/screens/Community/Community";
import Login from "../components/screens/Login/Login";
import Register from "../components/screens/Register/Register";
import EnterPhone from "../components/screens/EnterPhone/EnterPhone";
import VerifyPhone from "../components/screens/VerifyPhone/VerifyPhone";
import CreatePin from "../components/screens/CreatePin/CreatePin";
import RepeatPin from "../components/screens/RepeatPin/RepeatPin";
import SelectCountry from "../components/screens/SelectCountry/SelectCountry";

import { INITIAL_ROUTE } from "../constants/UI";
import { borrowNavigator } from './flows/borrowFlow';
import { defaultNavigationOptions, transitionConfig } from './navigationConfig';
import { celPayNavigator } from './flows/celPayFlow';
import { walletNavigator } from './flows/walletFlow';
import { profileNavigator } from './flows/profileFlow';

const authScreens = {
  // Auth,
  Login,
  Register,
  EnterPhone,
  VerifyPhone,
  CreatePin,
  RepeatPin
}
const authProps = {
  headerMode: "none",
  initialRouteName: 'Login'
}
const authNavigator = createStackNavigator(authScreens, authProps);

const depositNavigator = createStackNavigator({Deposit}, {
  transitionConfig,
  defaultNavigationOptions
})

export const screens = {
  Home,
  WalletFab: walletNavigator,
  CelPayFab: celPayNavigator,
  ProfileFab: profileNavigator,
  Auth: authNavigator,
  BorrowFab: borrowNavigator,
  DepositFab: depositNavigator,
  SelectCountry,
  Support,
  Community
};

const navigatorProps = {
  initialRouteName: INITIAL_ROUTE,
  transitionConfig,
  defaultNavigationOptions
};

const AppNavigator = createSwitchNavigator(screens, navigatorProps);

export default createAppContainer(AppNavigator);
