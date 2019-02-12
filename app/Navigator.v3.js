import { Animated, Easing } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Home from "./components/screens/Home/Home";
import WalletLanding from "./components/screens/WalletLanding/WalletLanding";
import Borrow from "./components/screens/Borrow/Borrow";
import CelPay from "./components/screens/CelPay/CelPay";
import Deposit from "./components/screens/Deposit/Deposit";
import Settings from "./components/screens/Settings/Settings";
import Support from "./components/screens/Support/Support";
import Community from "./components/screens/Community/Community";
import Profile from "./components/screens/Profile/Profile";
import Login from "./components/screens/Login/Login";
import Register from "./components/screens/Register/Register";
import EnterPhone from "./components/screens/EnterPhone/EnterPhone";
import VerifyPhone from "./components/screens/VerifyPhone/VerifyPhone";
import CreatePin from "./components/screens/CreatePin/CreatePin";
import RepeatPin from "./components/screens/RepeatPin/RepeatPin";
import SelectCountry from "./components/screens/SelectCountry/SelectCountry";
import BalanceHistory from "./components/screens/BalanceHistory/BalanceHistory";
import AllTransactions from "./components/screens/AllTransactions/AllTransactions";
import WalletInterest from "./components/screens/WalletInterest/WalletInterest";
import CoinDetails from "./components/screens/CoinDetails/CoinDetails";
import TransactionDetails from "./components/screens/TransactionDetails/TransactionDetails";
import WithdrawEnterAmount from "./components/screens/WithdrawEnterAmount/WithdrawEnterAmount";
import { INITIAL_ROUTE } from "./constants/UI";

const settingsScreens = {
  Settings,
  Profile
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
  TransactionDetails
}

const walletProps = {
  headerMode: "none",
  initialRouteName: 'WalletLanding'
}
const walletNavigator = createStackNavigator(walletScreens, walletProps);

const withdrawScreens = {
  WithdrawEnterAmount,
}

const withdrawProps = {
  headerMode: "none",
  initialRouteName: 'WithdrawEnterAmount'
}
const withdrawNavigator = createStackNavigator(withdrawScreens, withdrawProps);

export const screens = {
  Home,
  Wallet: walletNavigator,
  Deposit,
  Withdraw: withdrawNavigator,
  Borrow,
  CelPay,
  SelectCountry,
  Settings: SettingsNavigator,
  Support,
  Community,
  Profile,
  Auth: authNavigator,
};



const navigatorProps = {
  headerMode: "none",
  initialRouteName: INITIAL_ROUTE,
  transitionConfig: () => ({
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing
    },
    screenInterpolator: sceneProps => {
      const { scene, position } = sceneProps;
      const { index } = scene;

      const opacity = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: [0, 1]
      });

      return { opacity };
    }
  })
};

const AppNavigator = createStackNavigator(screens, navigatorProps);

export default createAppContainer(AppNavigator);
