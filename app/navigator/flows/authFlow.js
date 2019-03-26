import { createStackNavigator } from 'react-navigation'

import { defaultNavigationOptions, transitionConfig } from '../navigationConfig'
import Login from '../../components/screens/Login/Login'
import ForgotPassword from '../../components/screens/ForgotPassword/ForgotPassword'
import RegisterInitial from '../../components/screens/RegisterInitial/RegisterInitial'
import RegisterSetPin from '../../components/screens/RegisterSetPin/RegisterSetPin'
import TermsOfUse from '../../components/screens/TermsOfUse/TermsOfUse'


const authFlow = {
  screens: {
    Login,
    ForgotPassword,
    RegisterInitial,
    RegisterSetPin,
    TermsOfUse,
  },
  props: {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      ...defaultNavigationOptions,
      headerSameColor: true,
    },
    transitionConfig
  }
}

export const authNavigator = createStackNavigator(authFlow.screens, authFlow.props);
