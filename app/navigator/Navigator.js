import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";

import Home from "../components/screens/Home/Home";
import WalletLanding from "../components/screens/WalletLanding/WalletLanding";
import Deposit from "../components/screens/Deposit/Deposit";
import Settings from "../components/screens/Settings/Settings";
import Support from "../components/screens/Support/Support";
import Community from "../components/screens/Community/Community";
import Profile from "../components/screens/Profile/Profile";
import Login from "../components/screens/Login/Login";
import Register from "../components/screens/Register/Register";
import EnterPhone from "../components/screens/EnterPhone/EnterPhone";
import VerifyPhone from "../components/screens/VerifyPhone/VerifyPhone";
import CreatePin from "../components/screens/CreatePin/CreatePin";
import RepeatPin from "../components/screens/RepeatPin/RepeatPin";
import SelectCountry from "../components/screens/SelectCountry/SelectCountry";
import BalanceHistory from "../components/screens/BalanceHistory/BalanceHistory";
import AllTransactions from "../components/screens/AllTransactions/AllTransactions";
import WalletInterest from "../components/screens/WalletInterest/WalletInterest";
import CoinDetails from "../components/screens/CoinDetails/CoinDetails";
import TransactionDetails from "../components/screens/TransactionDetails/TransactionDetails";
import WithdrawEnterAmount from "../components/screens/WithdrawEnterAmount/WithdrawEnterAmount";
import WithdrawConfirmAddress from "../components/screens/WithdrawConfirmAddress/WithdrawConfirmAddress";
import WithdrawCreateAddress from "../components/screens/WithdrawCreateAddress/WithdrawCreateAddress";
import QrScanner from "../components/screens/QrScanner/QrScanner";
import WithdrawConfirm from "../components/screens/WithdrawConfirm/WithdrawConfirm";
import VerifyProfile from "../components/screens/VerifyProfile/VerifyProfile";

import { INITIAL_ROUTE } from "../constants/UI";
import { borrowNavigator } from './flows/borrowFlow'
import { transitionConfig } from './navigationConfig'
import { celPayNavigator } from './flows/celPayFlow'



const settingsScreens = {
  Settings,
  Profile,
  VerifyProfile,
}
const settingsProps = {
  headerMode: "none",
  initialRouteName: 'Settings'
}
const SettingsNavigator = createStackNavigator(settingsScreens, settingsProps);

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

const walletScreens = {
  WalletLanding,
  WalletInterest,
  BalanceHistory,
  AllTransactions,
  CoinDetails,
  TransactionDetails,
  // Profile
}

const walletProps = {
  headerMode: "none",
  initialRouteName: 'WalletLanding'
}
const walletNavigator = createStackNavigator(walletScreens, walletProps);

const withdrawScreens = {
  WithdrawEnterAmount,
  WithdrawCreateAddress,
  WithdrawConfirmAddress,
  QrScanner,
  WithdrawConfirm,
}

const withdrawProps = {
  headerMode: "none",
  initialRouteName: 'WithdrawEnterAmount'
}
const withdrawNavigator = createStackNavigator(withdrawScreens, withdrawProps);

// const celPayScreens = {
//   CelPayChooseFriend,
//   CelPayEnterAmount,
//   CelPayMessage,
// }
//
// const celPayProps = {
//   headerMode: "none",
//   initialRouteName: 'CelPayChooseFriend'
// }
// const celPayNavigator = createStackNavigator(celPayScreens, celPayProps);


export const screens = {
  Home,
  Wallet: walletNavigator,
  Deposit,
  Withdraw: withdrawNavigator,
  CelPay: celPayNavigator,
  Settings: SettingsNavigator,
  Auth: authNavigator,
  Borrow: borrowNavigator,
  SelectCountry,
  Support,
  Community,
  WithdrawConfirm,
};



const navigatorProps = {
  initialRouteName: INITIAL_ROUTE,
  transitionConfig
};



const AppNavigator = createSwitchNavigator(screens, navigatorProps);

export default createAppContainer(AppNavigator);
