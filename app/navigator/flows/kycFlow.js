import {createStackNavigator} from 'react-navigation-stack';

import {defaultNavigationOptions, transitionConfig} from '../navigationConfig';
import TransactionsOnHold from '../../components/screens/TransactionsOnHold/TransactionsOnHold';
import TransactionDetails from '../../components/screens/TransactionDetails/TransactionDetails';
import KYCProfileDetails from '../../components/screens/KYCProfileDetails/KYCProfileDetails';
import KYCAddressInfo from '../../components/screens/KYCAddressInfo/KYCAddressInfo';
import KYCTaxpayer from '../../components/screens/KYCTaxpayer/KYCTaxpayer';
import KYCVerifyID from '../../components/screens/KYCVerifyID/KYCVerifyID';
import KYCFinalRejection from '../../components/screens/KYCFinalRejection/KYCFinalRejection';
import {profileFlow} from './profileFlow';
import {walletFlow} from './walletFlow';

const kycFlow = {
  screens: {
    TransactionsOnHold,
    TransactionDetails,
    KYCProfileDetails,
    KYCAddressInfo,
    KYCTaxpayer,
    KYCVerifyID,
    KYCFinalRejection,
    ...profileFlow.screens,
    ...walletFlow.screens,
  },
  props: {
    initialRouteName: 'KYCProfileDetails',
    defaultNavigationOptions: {
      ...defaultNavigationOptions,
      headerSameColor: false,
    },
    transitionConfig,
  },
};

export const kycNavigator = createStackNavigator(
  kycFlow.screens,
  kycFlow.props,
);
