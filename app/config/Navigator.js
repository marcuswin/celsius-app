// // TODO: refactor navigator to use multiple stacks
//
// import {Animated, Easing} from "react-native";
// import {createStackNavigator} from 'react-navigation';
//
// // screens
// import WelcomeScreen from '../components.v2/screens/Welcome/Welcome';
// import LoginScreen from "../components.v2/screens/Login/Login";
// import ForgottenPasswordScreen from "../components.v2/screens/ForgottenPassword/ForgottenPassword";
// import HomeScreen from "../components.v2/screens/Home/Home";
// import SignupOneScreen from "../components.v2/screens/Signup/SignupOne";
// import SignupTwoScreen from "../components.v2/screens/Signup/SignupTwo";
// import TermsOfUseScreen from "../components.v2/screens/TermsOfUse/TermsOfUse";
// import ProfileScreen from '../components.v2/screens/Profile/Profile';
// import ChangePasswordScreen from "../components.v2/screens/ChangePassword/ChangePassword";
// import ProfileImageScreen from "../components.v2/screens/ProfileImage/ProfileImage";
// import ProfileDetailsScreen from "../components.v2/screens/ProfileDetails/ProfileDetails";
// import VerifyProfileScreen from "../components.v2/screens/VerifyProfile/VerifyProfile";
// import AddressInformationScreen from "../components.v2/screens/AddressInformation/AddressInformation";
// import TaxpayerIDScreen from "../components.v2/screens/TaxpayerID/TaxpayerID";
// import CameraScreen from "../components.v2/screens/Camera/Camera";
// import VerifyPhoneNumberScreen from "../components.v2/screens/VerifyPhoneNumber/VerifyPhoneNumber";
// import NoKycScreen from "../components.v2/screens/NoKyc/NoKyc";
// import AddFundsScreen from "../components.v2/screens/AddFunds/AddFunds";
// import WalletDetailsScreen from "../components.v2/screens/WalletDetails/WalletDetails";
// import CryptoForPeopleScreen from "../components.v2/screens/CryptoForPeople/CryptoForPeople";
// import AmountInputScreen from "../components.v2/screens/AmountInput/AmountInput";
// import TransactionConfirmationScreen from "../components.v2/screens/TransactionConfirmation/TransactionConfirmation";
// import CreatePasscodeScreen from "../components.v2/screens/Passcode/CreatePasscode";
// import RepeatPasscodeScreen from "../components.v2/screens/Passcode/RepeatPasscode";
// import EnterPasscodeScreen from "../components.v2/screens/Passcode/EnterPasscode";
// import TransactionDetailsScreen from "../components.v2/screens/TransactionDetails/TransactionDetails";
// import SecureTransactionsScreen from "../components.v2/screens/SecureTransactions/SecureTransactions";
// import WithdrawalInfoScreen from "../components.v2/screens/WithdrawalInfo/WithdrawalInfo";
// import QRScannerScreen from "../components.v2/screens/QRScanner/QRScanner";
// import WalletBalanceScreen from "../components.v2/screens/WalletBalance/WalletBalance";
// import WalletTransactionsScreen from "../components.v2/screens/WalletTransactions/WalletTransactions";
// import InterestCalculatorScreen from "../components.v2/screens/InterestCalculator/InterestCalculator";
// import HowToEarnInterestScreen from "../components.v2/screens/HowToEarnInterest/HowToEarnInterest";
// import WalletInterestScreen from "../components.v2/screens/WalletInterest/WalletInterest";
// import TransactionsOnHoldScreen from "../components.v2/screens/TransactionsOnHold/TransactionsOnHold";
// import DestinationTagExplanationModalScreen from "../components.v2/organisms/DestinationTagExplanationModal/DestinationTagExplanationModal";
// import MemoIdExplanationModalScreen from "../components.v2/organisms/MemoIdExplanationModal/MemoIdExplanationModal";
// import LoginPasscodeScreen from "../components.v2/screens/Passcode/LoginPasscode";
// import CameraRollScreen from "../components.v2/screens/CameraRoll/CameraRoll";
// import LoanApplicationScreen from "../components.v2/screens/LoanApplication/LoanApplication";
// import SelectCoinScreen from "../components.v2/screens/SelectCoin/SelectCoin";
// import SettingsScreen from "../components.v2/screens/Settings/Settings";
// import TwoFAInfoScreen from "../components.v2/screens/TwiFAInfo/TwoFAInfo";
// import TwoFaWelcomeScreen from "../components.v2/screens/TwoFaWelcome/TwoFaWelcome";
// import TwoFaAuthAppConfirmationScreen from "../components.v2/screens/TwoFaAuthAppConfirmation/TwoFaAuthAppConfirmation";
// import TwoFaAuthAppConfirmationCodeScreen from "../components.v2/screens/TwoFaAuthAppConfirmationCode/TwoFaAuthAppConfirmationCode";
// import TwoFaAuthSuccessScreen from "../components.v2/screens/TwoFaAuthSuccess/TwoFaAuthSuccess";
// import VerifyIdentityScreen from "../components.v2/screens/VerifyIdentity/VerifyIdentityScreen";
// import ApiAuthorizationScreen from "../components.v2/screens/ApiAuthorization/ApiAuthorization";
// import ApiKeyGenerateScreen from "../components.v2/screens/ApiKeyGenerate/ApiKeyGenerate";
// // NOTE(fj): plop screenGen importing new Screen here
//
// export const screens = {
//   // Welcom Screens
//   Welcome: {
//     screen: WelcomeScreen,
//     title: 'Welcome',
//   },
//   Login: {
//     screen: LoginScreen,
//     title: 'Login',
//   },
//   ForgottenPassword: {
//     screen: ForgottenPasswordScreen,
//     title: 'ForgottenPassword',
//   },
//   SignupOne: {
//     screen: SignupOneScreen,
//     title: 'SignupOne',
//   },
//   SignupTwo: {
//     screen: SignupTwoScreen,
//     title: 'SignupTwo',
//   },
//   TermsOfUse: {
//     screen: TermsOfUseScreen,
//     title: 'TermsOfUse',
//   },
//
//   Home: {
//     screen: HomeScreen,
//     title: 'Home',
//   },
//
//   // Borrow and Lend/Interest screens
//   InterestCalculator: {
//     screen: InterestCalculatorScreen,
//     title: 'InterestCalculator',
//     bottomNavigation: true,
//   },
//   HowToEarnInterest: {
//     screen: HowToEarnInterestScreen,
//     title: 'HowToEarnInterest',
//     bottomNavigation: true,
//   },
//   LoanApplication: {
//     screen: LoanApplicationScreen,
//     title: 'LoanApplication',
//     bottomNavigation: true,
//   },
//
//   // Profile screens
//   ProfileSettings: {
//     screen: SettingsScreen,
//     title: 'Settings',
//     bottomNavigation: true,
//   },
//   ApiAuthorization: {
//     screen: ApiAuthorizationScreen,
//     title: 'API Auth',
//     bottomNavigation: true,
//   },
//   ApiKeyGenerate: {
//     screen: ApiKeyGenerateScreen,
//     title: 'API Auth',
//     bottomNavigation: true,
//   },
//   TwoFAInfo: {
//     screen: TwoFAInfoScreen,
//     title: 'TwoFAInfo',
//     bottomNavigation: true,
//   },
//   TwoFaAuthAppConfirmation: {
//   screen: TwoFaAuthAppConfirmationScreen,
//     title: 'TwoFaAuthAppConfirmation',
//     bottomNavigation: true,
// },
//   TwoFaAuthAppConfirmationCode: {
//     screen: TwoFaAuthAppConfirmationCodeScreen,
//     title: 'TwoFaAuthAppConfirmationCode',
//     bottomNavigation: true,
//   },
//   TwoFaWelcome: {
//     screen: TwoFaWelcomeScreen,
//     title: 'TwoFaWelcome',
//     bottomNavigation: true,
//   },
//   TwoFaAuthSuccess: {
//     screen: TwoFaAuthSuccessScreen,
//     title: 'TwoFaAuthSuccess',
//     bottomNavigation: true,
//   },
//   Profile: {
//     screen: ProfileScreen,
//     title: 'Profile',
//     bottomNavigation: true,
//   },
//   ChangePassword: {
//     screen: ChangePasswordScreen,
//     title: 'ChangePassword',
//     bottomNavigation: true,
//   },
//   ProfileImage: {
//     screen: ProfileImageScreen,
//     title: 'ProfileImage',
//     bottomNavigation: true,
//   },
//
//   // KYC screens
//   ProfileDetails: {
//     screen: ProfileDetailsScreen,
//     title: 'ProfileDetails',
//   },
//   VerifyProfile: {
//     screen: VerifyProfileScreen,
//     title: 'VerifyProfile',
//   },
//   AddressInformation:{
//     screen: AddressInformationScreen,
//     title: 'AddressInformation',
//   },
//   TaxpayerID:{
//     screen: TaxpayerIDScreen,
//     title: 'TaxprayerID',
//   },
//   VerifyPhoneNumber: {
//     screen: VerifyPhoneNumberScreen,
//     title: 'VerifyPhoneNumber',
//   },
//   NoKyc: {
//     screen: NoKycScreen,
//     title: 'NoKyc',
//     bottomNavigation: true,
//   },
//   CryptoForPeople: {
//     screen: CryptoForPeopleScreen,
//     title: 'CryptoForPeople',
//     bottomNavigation: true,
//   },
//   TransactionsOnHold: {
//     screen: TransactionsOnHoldScreen,
//     title: 'TransactionsOnHold',
//     bottomNavigation: true,
//   },
//
//   // Other screens
//   Camera: {
//     screen: CameraScreen,
//     title: 'Camera',
//   },
//   QRScanner: {
//     screen: QRScannerScreen,
//     title: 'QRScanner',
//   },
//   CameraRoll: {
//     screen: CameraRollScreen,
//     title: 'CameraRoll',
//   },
//
//   // Deposit/Withdrawla screens
//   AddFunds: {
//     screen: AddFundsScreen,
//     title: 'AddFunds',
//   },
//   AmountInput: {
//     screen: AmountInputScreen,
//     title: 'AmountInput',
//   },
//   TransactionConfirmation: {
//     screen: TransactionConfirmationScreen,
//     title: 'TransactionConfirmation',
//   },
//   TransactionDetails: {
//     screen: TransactionDetailsScreen,
//     title: 'TransactionDetails',
//     bottomNavigation: true,
//   },
//   SecureTransactions: {
//     screen: SecureTransactionsScreen,
//     title: 'SecureTransactions',
//   },
//   WithdrawalInfo: {
//     screen: WithdrawalInfoScreen,
//     title: 'WithdrawalInfo',
//   },
//   DestinationTagExplanationModal: {
//     screen: DestinationTagExplanationModalScreen,
//     title: 'DestinationTagExplanationModal',
//   },
//   MemoIdExplanationModal: {
//     screen: MemoIdExplanationModalScreen,
//     title: 'MemoIdExplanationModal',
//   },
//   SelectCoin: {
//     screen: SelectCoinScreen,
//     title: 'SelectCoin',
//     bottomNavigation: true,
//   },
//
//   // Wallet screens
//   WalletDetails: {
//     screen: WalletDetailsScreen,
//     title: 'WalletDetails',
//     bottomNavigation: true,
//   },
//   WalletBalance: {
//     screen: WalletBalanceScreen,
//     title: 'WalletBalance',
//     bottomNavigation: true,
//   },
//   WalletTransactions: {
//     screen: WalletTransactionsScreen,
//     title: 'WalletTransactions',
//     bottomNavigation: true,
//   },
//   WalletInterest: {
//     screen: WalletInterestScreen,
//     title: 'WalletInterest',
//     bottomNavigation: true,
//   },
//
//   // Passcode screens
//   CreatePasscode: {
//     screen: CreatePasscodeScreen,
//     title: 'CreatePasscode',
//   },
//   RepeatPasscode: {
//     screen: RepeatPasscodeScreen,
//     title: 'RepeatPasscode',
//   },
//   EnterPasscode: {
//     screen: EnterPasscodeScreen,
//     title: 'EnterPasscode',
//   },
//   LoginPasscode: {
//     screen: LoginPasscodeScreen,
//     title: 'LoginPasscode',
//   },
//   VerifyIdentity: {
//     screen: VerifyIdentityScreen,
//     title: 'VerifyIdentity',
//   },
// }
//
// const Navigator = createStackNavigator(
//   screens,
//   {
//   headerMode: 'none',
//   transitionConfig: () => ({
//     transitionSpec: {
//       duration: 750,
//       easing: Easing.out(Easing.poly(4)),
//       timing: Animated.timing,
//     },
//     screenInterpolator: sceneProps => {
//       const { scene, position } = sceneProps;
//       const { index } = scene;
//
//       const opacity = position.interpolate({
//         inputRange: [index - 1, index],
//         outputRange: [0, 1],
//       })
//
//       return { opacity };
//     },
//   }),
// });
//
// export default Navigator;
