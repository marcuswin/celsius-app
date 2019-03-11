import { createStackNavigator } from 'react-navigation'
import CelPayChooseFriend from '../../components/screens/CelPayChooseFriend/CelPayChooseFriend'
import CelPayMessage from '../../components/screens/CelPayMessage/CelPayMessage'
import CelPayEnterAmount from '../../components/screens/CelPayEnterAmount/CelPayEnterAmount'
import { defaultNavigationOptions, transitionConfig } from '../navigationConfig'
import VerifyProfile from '../../components/screens/VerifyProfile/VerifyProfile'
import Profile from '../../components/screens/Profile/Profile'

export const celPayFlow = {
  screens: {
    CelPayChooseFriend,
    CelPayEnterAmount,
    CelPayMessage,
    VerifyProfile,
    Profile
  },
  props: {
    initialRouteName: 'CelPayChooseFriend',
    defaultNavigationOptions,
    transitionConfig
  }
}

export const celPayNavigator = createStackNavigator(celPayFlow.screens, celPayFlow.props);
