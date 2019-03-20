import { createStackNavigator } from 'react-navigation'

import { defaultNavigationOptions, transitionConfig } from '../navigationConfig'
import KYCLanding from '../../components/screens/KYCLanding/KYCLanding'
import KYCProfileDetails from '../../components/screens/KYCProfileDetails/KYCProfileDetails'
import KYCAddressInfo from '../../components/screens/KYCAddressInfo/KYCAddressInfo'
import KYCTaxpayer from '../../components/screens/KYCTaxpayer/KYCTaxpayer'
import KYCVerifyID from '../../components/screens/KYCVerifyID/KYCVerifyID'
import CameraScreen from '../../components/screens/CameraScreen/CameraScreen'
import ConfirmCamera from '../../components/screens/ConfirmCamera/ConfirmCamera'
import SelectCountry from '../../components/screens/SelectCountry/SelectCountry'

const kycFlow = {
  screens: {
    KYCLanding,
    KYCProfileDetails,
    KYCAddressInfo,
    KYCTaxpayer,
    KYCVerifyID,
    SelectCountry,
    CameraScreen,
    ConfirmCamera
  },
  props: {
    initialRouteName: 'KYCLanding',
    defaultNavigationOptions: {
      ...defaultNavigationOptions,
      headerSameColor: true,
    },
    transitionConfig
  }
}

export const kycNavigator = createStackNavigator(kycFlow.screens, kycFlow.props);
