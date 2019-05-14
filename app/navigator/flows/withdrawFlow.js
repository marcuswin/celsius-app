import { createStackNavigator } from 'react-navigation'
import { defaultNavigationOptions, transitionConfig } from '../navigationConfig'
import WithdrawEnterAmount from '../../components/screens/WithdrawEnterAmount/WithdrawEnterAmount'
import WithdrawConfirmAddress from '../../components/screens/WithdrawConfirmAddress/WithdrawConfirmAddress'
import WithdrawConfirm from '../../components/screens/WithdrawConfirm/WithdrawConfirm'
import WithdrawCreateAddress from '../../components/screens/WithdrawCreateAddress/WithdrawCreateAddress'
import QRScanner from '../../components/screens/QrScanner/QRScanner'
import VerifyProfile from '../../components/screens/VerifyProfile/VerifyProfile'
import TransactionDetails from '../../components/screens/TransactionDetails/TransactionDetails'

export const withdrawFlow = {
  screens: {
    WithdrawEnterAmount,
    WithdrawCreateAddress,
    WithdrawConfirmAddress,
    WithdrawConfirm,
    TransactionDetails,
    QRScanner,
    VerifyProfile
  },
  props: {
    initialRouteName: 'WithdrawEnterAmount',
    defaultNavigationOptions,
    transitionConfig
  }
}

export const withdrawNavigator = createStackNavigator(withdrawFlow.screens, withdrawFlow.props);
