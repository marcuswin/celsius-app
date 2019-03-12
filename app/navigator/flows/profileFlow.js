import { createStackNavigator } from 'react-navigation';
import Profile from '../../components/screens/Profile/Profile';
import Settings from "../../components/screens/Settings/Settings";
import Appearance from "../../components/screens/Appearance/Appearance";
import Api from "../../components/screens/Api/Api";
import WalletSettings from "../../components/screens/WalletSettings/WalletSettings";
import SecuritySettings from "../../components/screens/SecuritySettings/SecuritySettings";
import NotificationsSettings from "../../components/screens/NotificationsSettings/NotificationsSettings";
import VerifyProfile from "../../components/screens/VerifyProfile/VerifyProfile";
import ChangePassword from "../../components/screens/ChangePassword/ChangePassword";
import ChangePin from "../../components/screens/ChangePin/ChangePin";
import TwoFactorSettings from "../../components/screens/TwoFactorSettings/TwoFactorSettings";
import { defaultNavigationOptions, transitionConfig } from '../navigationConfig';


export const profileFlow = {
  screens: {
    Profile,
    Settings,
    NotificationsSettings,
    SecuritySettings,
    WalletSettings,
    Api,
    Appearance,
    VerifyProfile,
    ChangePassword,
    ChangePin,
    TwoFactorSettings
  },
  props: {
    initialRouteName: 'Profile',
    defaultNavigationOptions,
    transitionConfig
  }
}

export const profileNavigator = createStackNavigator(profileFlow.screens, profileFlow.props);
