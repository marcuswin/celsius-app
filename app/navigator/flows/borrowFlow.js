import { createStackNavigator } from 'react-navigation'
import BorrowLoanOption from '../../components/screens/BorrowLoanOption/BorrowLoanOption'
import BorrowCollateral from '../../components/screens/BorrowCollateral/BorrowCollateral'
import LoanPaymentList from '../../components/screens/LoanPaymentList/LoanPaymentList'
import BorrowBankAccount from '../../components/screens/BorrowBankAccount/BorrowBankAccount'
import VerifyProfile from '../../components/screens/VerifyProfile/VerifyProfile'
import Deposit from '../../components/screens/Deposit/Deposit'
import BorrowLoanTerm from '../../components/screens/BorrowLoanTerm/BorrowLoanTerm'
import BorrowLanding from '../../components/screens/BorrowLanding/BorrowLanding'
import BorrowConfirm from '../../components/screens/BorrowConfirm/BorrowConfirm'
import BorrowEnterAmount from '../../components/screens/BorrowEnterAmount/BorrowEnterAmount'
import TransactionDetails from '../../components/screens/TransactionDetails/TransactionDetails'
import ConfirmYourLoan from '../../components/screens/ConfirmYourLoan/ConfirmYourLoan'
import LoanRequestDetails from "../../components/screens/LoanRequestDetails/LoanRequestDetails";
import LoanPaymentHistory from "../../components/screens/LoanPaymentHistory/LoanPaymentHistory";
import { defaultNavigationOptions, transitionConfig } from '../navigationConfig'
import { profileFlow } from './profileFlow'

export const borrowFlow = {
  screens: {
    BorrowEnterAmount,
    BorrowCollateral,
    BorrowLoanOption,
    BorrowLoanTerm,
    BorrowBankAccount,
    ConfirmYourLoan,
    VerifyProfile,
    BorrowLanding,
    LoanPaymentList,
    BorrowConfirm,
    TransactionDetails,
    Deposit,
    LoanRequestDetails,
    LoanPaymentHistory,
    ...profileFlow.screens,
  },
  props: {
    initialRouteName: 'BorrowLanding',
    defaultNavigationOptions,
    transitionConfig
  }
}

export const borrowNavigator = createStackNavigator(borrowFlow.screens, borrowFlow.props);
