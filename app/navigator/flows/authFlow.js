import { createStackNavigator } from 'react-navigation'

import { defaultNavigationOptions, transitionConfig } from '../navigationConfig'
import Login from '../../components/screens/Login/Login'
import VerifyPhone from '../../components/screens/VerifyPhone/VerifyPhone'
import RepeatPin from '../../components/screens/RepeatPin/RepeatPin'
import EnterPhone from '../../components/screens/EnterPhone/EnterPhone'
import Register from '../../components/screens/Register/Register'
import CreatePin from '../../components/screens/CreatePin/CreatePin'
import SelectCountry from '../../components/screens/SelectCountry/SelectCountry'

const authFlow = {
  screens: {
    Login,
    Register,
    EnterPhone,
    VerifyPhone,
    CreatePin,
    RepeatPin,
    SelectCountry
  },
  props: {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      ...defaultNavigationOptions,
      transparent: true,
    },
    transitionConfig
  }
}

export const authNavigator = createStackNavigator(authFlow.screens, authFlow.props);
