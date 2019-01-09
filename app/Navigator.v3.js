import { Animated, Easing } from "react-native";
import { createStackNavigator } from "react-navigation";
import Home from "./components/screens/Home/Home";

export const screens = {
  Home: { screen: Home }
};

const navigatorProps = {
  headerMode: "none",
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

export default createStackNavigator(screens, navigatorProps);
