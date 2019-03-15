import { createStackNavigator } from 'react-navigation'

import { defaultNavigationOptions, transitionConfig } from '../navigationConfig'
import KYCLanding from '../../components/screens/KYCLanding/KYCLanding'
import KYCProfileDetails from '../../components/screens/KYCProfileDetails/KYCProfileDetails'
import KYCAddressInfo from '../../components/screens/KYCAddressInfo/KYCAddressInfo'
import KYCTaxpayer from '../../components/screens/KYCTaxpayer/KYCTaxpayer'
import KYCVerifyID from '../../components/screens/KYCVerifyID/KYCVerifyID'

const kycFlow = {
  screens: {
    KYCLanding,
    KYCProfileDetails,
    KYCAddressInfo,
    KYCTaxpayer,
    KYCVerifyID,
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
