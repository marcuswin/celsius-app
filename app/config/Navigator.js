import {Animated, Easing} from "react-native";
import {createStackNavigator} from 'react-navigation';

// screens
import WelcomeScreen from '../components/screens/Welcome/Welcome';
import LoginScreen from "../components/screens/Login/Login";
import ForgottenPasswordScreen from "../components/screens/ForgottenPassword/ForgottenPassword";
import HomeScreen from "../components/screens/Home/Home";
import SignupOneScreen from "../components/screens/Signup/SignupOne";
import SignupTwoScreen from "../components/screens/Signup/SignupTwo";
import TermsOfUseScreen from "../components/screens/TermsOfUse/TermsOfUse";
import ProfileScreen from '../components/screens/Profile/Profile';
import ChangePasswordScreen from "../components/screens/ChangePassword/ChangePassword";
import ProfileImageScreen from "../components/screens/ProfileImage/ProfileImage";
import ProfileDetailsScreen from "../components/screens/ProfileDetails/ProfileDetails";
import VerifyProfileScreen from "../components/screens/VerifyProfile/VerifyProfile";
import AddressInformationScreen from "../components/screens/AddressInformation/AddressInformation";
import TaxpayerIDScreen from "../components/screens/TaxpayerID/TaxpayerID";
import CameraScreen from "../components/screens/Camera/Camera";
import VerifyPhoneNumberScreen from "../components/screens/VerifyPhoneNumber/VerifyPhoneNumber";
import NoKycScreen from "../components/screens/NoKyc/NoKyc";
import AddFundsScreen from "../components/screens/AddFunds/AddFunds";
import WalletDetailsScreen from "../components/screens/WalletDetails/WalletDetails";
import CryptoForPeopleScreen from "../components/screens/CryptoForPeople/CryptoForPeople";
import AmountInputScreen from "../components/screens/AmountInput/AmountInput";
import TransactionConfirmationScreen from "../components/screens/TransactionConfirmation/TransactionConfirmation";
import CreatePasscodeScreen from "../components/screens/Passcode/CreatePasscode";
import RepeatPasscodeScreen from "../components/screens/Passcode/RepeatPasscode";
import EnterPasscodeScreen from "../components/screens/Passcode/EnterPasscode";
import TransactionDetailsScreen from "../components/screens/TransactionDetails/TransactionDetails";
import SecureTransactionsScreen from "../components/screens/SecureTransactions/SecureTransactions";
import WithdrawalInfoScreen from "../components/screens/WithdrawalInfo/WithdrawalInfo";
import QRScannerScreen from "../components/screens/QRScanner/QRScanner";
import WalletBalanceScreen from "../components/screens/WalletBalance/WalletBalance";
import WalletTransactionsScreen from "../components/screens/WalletTransactions/WalletTransactions";
import InterestCalculatorScreen from "../components/screens/InterestCalculator/InterestCalculator";
import HowToEarnInterestScreen from "../components/screens/HowToEarnInterest/HowToEarnInterest";
import WalletInterestScreen from "../components/screens/WalletInterest/WalletInterest";
import TransactionsOnHoldScreen from "../components/screens/TransactionsOnHold/TransactionsOnHold";
import DestinationTagExplanationModalScreen from "../components/organisms/DestinationTagExplanationModal/DestinationTagExplanationModal";
import MemoIdExplanationModalScreen from "../components/organisms/MemoIdExplanationModal/MemoIdExplanationModal";
import LoginPasscodeScreen from "../components/screens/Passcode/LoginPasscode";
import CameraRollScreen from "../components/screens/CameraRoll/CameraRoll";
import SelectCoinScreen from "../components/screens/SelectCoin/SelectCoin";
import SettingsScreen from "../components/screens/Settings/Settings";
import TwoFAInfoScreen from "../components/screens/TwiFAInfo/TwoFAInfo";
import TwoFaWelcomeScreen from "../components/screens/TwoFaWelcome/TwoFaWelcome";
import TwoFaAuthAppConfirmationScreen from "../components/screens/TwoFaAuthAppConfirmation/TwoFaAuthAppConfirmation";
import TwoFaAuthAppConfirmationCodeScreen from "../components/screens/TwoFaAuthAppConfirmationCode/TwoFaAuthAppConfirmationCode";
import TwoFaAuthSuccessScreen from "../components/screens/TwoFaAuthSuccess/TwoFaAuthSuccess";
import VerifyIdentityScreen from "../components/screens/VerifyIdentity/VerifyIdentityScreen";
import ApiAuthorizationScreen from "../components/screens/ApiAuthorization/ApiAuthorization";
import ApiKeyGenerateScreen from "../components/screens/ApiKeyGenerate/ApiKeyGenerate";
import BRWEnterAmountScreen from "../components/screens/BrwEnterAmount/BrwEnterAmount";
import BRWChooseCollateralScreen from "../components/screens/BrwChooseCollateral/BrwChooseCollateral";
import BRWLoanOptionScreen from "../components/screens/BrwLoanOption/BrwLoanOption";
import BRWTermOfLoanScreen from "../components/screens/BrwTermOfLoan/BrwTermOfLoan";
import BRWConfirmLoanScreen from "../components/screens/BrwConfirmLoan/BrwConfirmLoan";
import BRWAllLoansScreen from "../components/screens/BrwAllLoans/BrwAllLoans";
import BRWLoanDetailsScreen from "../components/screens/BrwLoanDetails/BrwLoanDetails";
import OfflineScreen from "../components/screens/Offline/Offline";
import LockedAccountScreen from "../components/screens/LockedAccount/LockedAccount";
import ComplianceScreen from "../components/screens/Compliance/Compliance";
// NOTE(fj): plop screenGen importing new Screen here

export const screens = {
  // Welcom Screens
  Welcome: {
    screen: WelcomeScreen,
    title: 'Welcome',
  },
  Login: {
    screen: LoginScreen,
    title: 'Login',
  },
  ForgottenPassword: {
    screen: ForgottenPasswordScreen,
    title: 'ForgottenPassword',
  },
  SignupOne: {
    screen: SignupOneScreen,
    title: 'SignupOne',
  },
  SignupTwo: {
    screen: SignupTwoScreen,
    title: 'SignupTwo',
  },
  TermsOfUse: {
    screen: TermsOfUseScreen,
    title: 'TermsOfUse',
  },

  Home: {
    screen: HomeScreen,
    title: 'Home',
  },

  // Borrow and Lend/Interest screens
  InterestCalculator: {
    screen: InterestCalculatorScreen,
    title: 'InterestCalculator',
    bottomNavigation: true,
  },
  HowToEarnInterest: {
    screen: HowToEarnInterestScreen,
    title: 'HowToEarnInterest',
    bottomNavigation: true,
  },

  // Profile screens
  ProfileSettings: {
    screen: SettingsScreen,
    title: 'Settings',
    bottomNavigation: true,
  },
  ApiAuthorization: {
    screen: ApiAuthorizationScreen,
    title: 'API Auth',
    bottomNavigation: true,
  },
  ApiKeyGenerate: {
    screen: ApiKeyGenerateScreen,
    title: 'API Auth',
    bottomNavigation: true,
  },
  TwoFAInfo: {
    screen: TwoFAInfoScreen,
    title: 'TwoFAInfo',
    bottomNavigation: true,
  },
  TwoFaAuthAppConfirmation: {
  screen: TwoFaAuthAppConfirmationScreen,
    title: 'TwoFaAuthAppConfirmation',
    bottomNavigation: true,
  },
  TwoFaAuthAppConfirmationCode: {
    screen: TwoFaAuthAppConfirmationCodeScreen,
    title: 'TwoFaAuthAppConfirmationCode',
    bottomNavigation: true,
  },
  TwoFaWelcome: {
    screen: TwoFaWelcomeScreen,
    title: 'TwoFaWelcome',
    bottomNavigation: true,
  },
  TwoFaAuthSuccess: {
    screen: TwoFaAuthSuccessScreen,
    title: 'TwoFaAuthSuccess',
    bottomNavigation: true,
  },
  Profile: {
    screen: ProfileScreen,
    title: 'Profile',
    bottomNavigation: true,
  },
  ChangePassword: {
    screen: ChangePasswordScreen,
    title: 'ChangePassword',
    bottomNavigation: true,
  },
  ProfileImage: {
    screen: ProfileImageScreen,
    title: 'ProfileImage',
    bottomNavigation: true,
  },

  // KYC screens
  ProfileDetails: {
    screen: ProfileDetailsScreen,
    title: 'ProfileDetails',
  },
  VerifyProfile: {
    screen: VerifyProfileScreen,
    title: 'VerifyProfile',
  },
  AddressInformation:{
    screen: AddressInformationScreen,
    title: 'AddressInformation',
  },
  TaxpayerID:{
    screen: TaxpayerIDScreen,
    title: 'TaxprayerID',
  },
  VerifyPhoneNumber: {
    screen: VerifyPhoneNumberScreen,
    title: 'VerifyPhoneNumber',
  },
  NoKyc: {
    screen: NoKycScreen,
    title: 'NoKyc',
    bottomNavigation: true,
  },
  CryptoForPeople: {
    screen: CryptoForPeopleScreen,
    title: 'CryptoForPeople',
    bottomNavigation: true,
  },
  TransactionsOnHold: {
    screen: TransactionsOnHoldScreen,
    title: 'TransactionsOnHold',
    bottomNavigation: true,
  },

  // Borrow screens
  BRWEnterAmount: {
    screen: BRWEnterAmountScreen,
    title: 'BRWEnterAmount',
    bottomNavigation: true,
  },
  BRWChooseCollateral: {
    screen: BRWChooseCollateralScreen,
    title: 'BRWChooseCollateral',
    bottomNavigation: true,
  },
  BRWConfirmLoan: {
    screen: BRWConfirmLoanScreen,
    title: 'BRWConfirmLoan',
    bottomNavigation: true,
  },
  BRWLoanOption: {
    screen: BRWLoanOptionScreen,
    title: 'BRWLoanOption',
    bottomNavigation: true,
  },
  BRWTermOfLoan: {
    screen: BRWTermOfLoanScreen,
    title: 'BRWTermOfLoan',
    bottomNavigation: true,
  },
  BRWAllLoans: {
    screen: BRWAllLoansScreen,
    title: 'BRWAllLoans',
    bottomNavigation: true,
  },
  BRWLoanDetails: {
    screen: BRWLoanDetailsScreen,
    title: 'BRWLoanDetails',
    bottomNavigation: true,
  },

  // Other screens
  Camera: {
    screen: CameraScreen,
    title: 'Camera',
  },
  QRScanner: {
    screen: QRScannerScreen,
    title: 'QRScanner',
  },
  CameraRoll: {
    screen: CameraRollScreen,
    title: 'CameraRoll',
  },

  // Deposit/Withdrawla screens
  AddFunds: {
    screen: AddFundsScreen,
    title: 'AddFunds',
  },
  AmountInput: {
    screen: AmountInputScreen,
    title: 'AmountInput',
  },
  TransactionConfirmation: {
    screen: TransactionConfirmationScreen,
    title: 'TransactionConfirmation',
  },
  TransactionDetails: {
    screen: TransactionDetailsScreen,
    title: 'TransactionDetails',
    bottomNavigation: true,
  },
  SecureTransactions: {
    screen: SecureTransactionsScreen,
    title: 'SecureTransactions',
  },
  WithdrawalInfo: {
    screen: WithdrawalInfoScreen,
    title: 'WithdrawalInfo',
  },
  DestinationTagExplanationModal: {
    screen: DestinationTagExplanationModalScreen,
    title: 'DestinationTagExplanationModal',
  },
  MemoIdExplanationModal: {
    screen: MemoIdExplanationModalScreen,
    title: 'MemoIdExplanationModal',
  },
  SelectCoin: {
    screen: SelectCoinScreen,
    title: 'SelectCoin',
    bottomNavigation: true,
  },
  Offline: {
    screen: OfflineScreen,
    title: 'Offline',
    bottomNavigation: false,
  },
  LockedAccount: {
    screen: LockedAccountScreen,
    title: 'LockedAccount'
  },
  Compliance: {
    screen: ComplianceScreen,
    title: 'Compliance',
    bottomNavigation: false,
  },

  // Wallet screens
  WalletDetails: {
    screen: WalletDetailsScreen,
    title: 'WalletDetails',
    bottomNavigation: true,
  },
  WalletBalance: {
    screen: WalletBalanceScreen,
    title: 'WalletBalance',
    bottomNavigation: true,
  },
  WalletTransactions: {
    screen: WalletTransactionsScreen,
    title: 'WalletTransactions',
    bottomNavigation: true,
  },
  WalletInterest: {
    screen: WalletInterestScreen,
    title: 'WalletInterest',
    bottomNavigation: true,
  },

  // Passcode screens
  CreatePasscode: {
    screen: CreatePasscodeScreen,
    title: 'CreatePasscode',
  },
  RepeatPasscode: {
    screen: RepeatPasscodeScreen,
    title: 'RepeatPasscode',
  },
  EnterPasscode: {
    screen: EnterPasscodeScreen,
    title: 'EnterPasscode',
  },
  LoginPasscode: {
    screen: LoginPasscodeScreen,
    title: 'LoginPasscode',
  },
  VerifyIdentity: {
    screen: VerifyIdentityScreen,
    title: 'VerifyIdentity',
  },
}

const Navigator = createStackNavigator(
  screens,
  {
  headerMode: 'none',
  transitionConfig: () => ({
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
    },
    screenInterpolator: sceneProps => {
      const { scene, position } = sceneProps;
      const { index } = scene;

      const opacity = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: [0, 1],
      })

      return { opacity };
    },
  }),
});

export default Navigator;
