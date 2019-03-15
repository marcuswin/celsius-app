import { createStackNavigator } from 'react-navigation'

import { defaultNavigationOptions, transitionConfig } from '../navigationConfig'
import Welcome from '../../components/screens/Welcome/Welcome'
import Login from '../../components/screens/Login/Login'
import RegisterInitial from '../../components/screens/RegisterInitial/RegisterInitial'
import RegisterEnterPhone from '../../components/screens/RegisterEnterPhone/RegisterEnterPhone'
import RegisterVerifyPhone from '../../components/screens/RegisterVerifyPhone/RegisterVerifyPhone'
import RegisterSetPin from '../../components/screens/RegisterSetPin/RegisterSetPin'
import SelectCountry from '../../components/screens/SelectCountry/SelectCountry'

const authFlow = {
  screens: {
    Welcome,
    Login,
    RegisterInitial,
    RegisterEnterPhone,
    RegisterVerifyPhone,
    RegisterSetPin,
    SelectCountry,
  },
  props: {
    initialRouteName: 'Welcome',
    defaultNavigationOptions: {
      ...defaultNavigationOptions,
      headerSameColor: true,
    },
    transitionConfig
  }
}

export const authNavigator = createStackNavigator(authFlow.screens, authFlow.props);
