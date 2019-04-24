import { createStackNavigator } from 'react-navigation'

import { defaultNavigationOptions, transitionConfig } from '../navigationConfig'
import KYCLanding from '../../components/screens/KYCLanding/KYCLanding'
import TransactionsOnHold from '../../components/screens/TransactionsOnHold/TransactionsOnHold'
import TransactionDetails from '../../components/screens/TransactionDetails/TransactionDetails'
import KYCProfileDetails from '../../components/screens/KYCProfileDetails/KYCProfileDetails'
import KYCAddressInfo from '../../components/screens/KYCAddressInfo/KYCAddressInfo'
import KYCTaxpayer from '../../components/screens/KYCTaxpayer/KYCTaxpayer'
import KYCVerifyID from '../../components/screens/KYCVerifyID/KYCVerifyID'
import { profileFlow } from "./profileFlow";

const kycFlow = {
  screens: {
    KYCLanding,
    TransactionsOnHold,
    TransactionDetails,
    KYCProfileDetails,
    KYCAddressInfo,
    KYCTaxpayer,
    KYCVerifyID,
    ...profileFlow.screens
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
