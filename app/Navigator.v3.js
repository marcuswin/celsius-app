import { Animated, Easing } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Home from "./components/screens/Home/Home";
import Wallet from "./components/screens/Wallet/Wallet";
import Borrow from "./components/screens/Borrow/Borrow";
import CelPay from "./components/screens/CelPay/CelPay";
import Deposit from "./components/screens/Deposit/Deposit";
import Settings from "./components/screens/Settings/Settings";
import Support from "./components/screens/Support/Support";
import Community from "./components/screens/Community/Community";
import UI from "./constants/UI";


export const screens = {
  Home,
  Wallet,
  Borrow,
  CelPay,
  Deposit,
  Settings,
  Support,
  Community
};

const navigatorProps = {
  headerMode: "none",
  initialRouteName: UI.INITIAL_ROUTE,
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
