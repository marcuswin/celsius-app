import {Animated, Easing} from "react-native";
import {createStackNavigator} from 'react-navigation';

// screens
import WelcomeScreen from '../components/screens/Welcome/Welcome';
import LoginScreen from "../components/screens/Login/Login";
import ForgottenPasswordScreen from "../components/screens/ForgottenPassword/ForgottenPassword";
import HomeScreen from "../components/screens/Home/Home";
import CalculatorScreen from "../components/screens/Calculator/Calculator";
import ManagePortfolioScreen from "../components/screens/ManagePortfolio/ManagePortfolio";
import SignupOneScreen from "../components/screens/Signup/SignupOne";
import SignupTwoScreen from "../components/screens/Signup/SignupTwo";
import EstimatedLoanScreen from "../components/screens/EstimatedLoan/EstimatedLoan";
import TermsOfUseScreen from "../components/screens/TermsOfUse/TermsOfUse";
import ProfileScreen from '../components/screens/Profile/Profile';
import ChangePasswordScreen from "../components/screens/ChangePassword/ChangePassword";
import DepositCoinsScreen from "../components/screens/DepositCoins/DepositCoins";
import ProfileImageScreen from "../components/screens/ProfileImage/ProfileImage";
import ProfileDetailsScreen from "../components/screens/ProfileDetails/ProfileDetails";
import VerifyProfileScreen from "../components/screens/VerifyProfile/VerifyProfile";
import CameraScreen from "../components/screens/Camera/Camera";
import VerifyPhoneNumberScreen from "../components/screens/VerifyPhoneNumber/VerifyPhoneNumber";
import AddCoinsScreen from "../components/screens/AddCoins/AddCoins";
import NoKycScreen from "../components/screens/NoKyc/NoKyc";
import AddFundsScreen from "../components/screens/AddFunds/AddFunds";
import WalletLandingScreen from "../components/screens/WalletLanding/WalletLanding";
import WalletDetailsScreen from "../components/screens/WalletDetails/WalletDetails";
import PortfolioScreen from "../components/screens/Portfolio/Portfolio";
import CryptoForPeopleScreen from "../components/screens/CryptoForPeople/CryptoForPeople";
import AmountInputScreen from "../components/screens/AmountInput/AmountInput";
import TransactionConfirmationScreen from "../components/screens/TransactionConfirmation/TransactionConfirmation";
import CreatePasscodeScreen from "../components/screens/Passcode/CreatePasscode";
import RepeatPasscodeScreen from "../components/screens/Passcode/RepeatPasscode";
import EnterPasscodeScreen from "../components/screens/Passcode/EnterPasscode";
import TransactionDetailsScreen from "../components/screens/TransactionDetails/TransactionDetails";
import WalletTotalsScreen from "../components/screens/WalletTotals/WalletTotals";
import SecureTransactionsScreen from "../components/screens/SecureTransactions/SecureTransactions";
import WithdrawalInfoScreen from "../components/screens/WithdrawalInfo/WithdrawalInfo";
import QRScannerScreen from "../components/screens/QRScanner/QRScanner";
import WalletBalanceScreen from "../components/screens/WalletBalance/WalletBalance";
import WalletTransactionsScreen from "../components/screens/WalletTransactions/WalletTransactions";
import InterestCalculatorScreen from "../components/screens/InterestCalculator/InterestCalculator";
import HowToEarnInterestScreen from "../components/screens/HowToEarnInterest/HowToEarnInterest";
import WalletInterestScreen from "../components/screens/WalletInterest/WalletInterest";
// NOTE(fj): plop screenGen importing new Screen here

const Navigator = createStackNavigator({
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
  Home: {
    screen: HomeScreen,
    title: 'Home',
  },
  ManagePortfolio: {
    screen: ManagePortfolioScreen,
    title: 'ManagePortfolio',
  },
  Calculator: {
    screen: CalculatorScreen,
    title: 'Calculator',
  },
  SignupOne: {
    screen: SignupOneScreen,
    title: 'SignupOne',
  },
  SignupTwo: {
    screen: SignupTwoScreen,
    title: 'SignupTwo',
  },
  EstimatedLoan: {
    screen: EstimatedLoanScreen,
    title: 'EstimatedLoan',
  },
  TermsOfUse: {
    screen: TermsOfUseScreen,
    title: 'TermsOfUse',
  },
  Profile: {
    screen: ProfileScreen,
    title: 'Profile',
  },
  ChangePassword: {
    screen: ChangePasswordScreen,
    title: 'ChangePassword',
  },
  DepositCoins: {
    screen: DepositCoinsScreen,
    title: 'DepositCoins',
  },
  InterestCalculator: {
    screen: InterestCalculatorScreen,
    title: 'InterestCalculator',
  },
  ProfileImage: {
    screen: ProfileImageScreen,
    title: 'ProfileImage',
  },
  AddCoins: {
    screen: AddCoinsScreen,
    title: 'AddCoins',
  },
  ProfileDetails: {
    screen: ProfileDetailsScreen,
    title: 'ProfileDetails',
  },
  VerifyProfile: {
    screen: VerifyProfileScreen,
    title: 'VerifyProfile',
  },
  Camera: {
    screen: CameraScreen,
    title: 'Camera',
  },
  QRScanner: {
    screen: QRScannerScreen,
    title: 'QRScanner',
  },
  VerifyPhoneNumber: {
    screen: VerifyPhoneNumberScreen,
    title: 'VerifyPhoneNumber',
  },
  NoKyc: {
    screen: NoKycScreen,
    title: 'NoKyc',
  },
  AddFunds: {
    screen: AddFundsScreen,
    title: 'AddFunds',
  },
  WalletLanding: {
    screen: WalletLandingScreen,
    title: 'WalletLanding',
  },
  WalletDetails: {
    screen: WalletDetailsScreen,
    title: 'WalletDetails',
  },
  Portfolio: {
    screen: PortfolioScreen,
    title: 'Portfolio',
  },
  CryptoForPeople: {
    screen: CryptoForPeopleScreen,
    title: 'CryptoForPeople',
  },
  AmountInput: {
    screen: AmountInputScreen,
    title: 'AmountInput',
  },
  TransactionConfirmation: {
    screen: TransactionConfirmationScreen,
    title: 'TransactionConfirmation',
  },
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
  TransactionDetails: {
    screen: TransactionDetailsScreen,
    title: 'TransactionDetails',
  },
  WalletTotals: {
    screen: WalletTotalsScreen,
    title: 'WalletTotals',
  },
  SecureTransactions: {
    screen: SecureTransactionsScreen,
    title: 'SecureTransactions',
  },
  WithdrawalInfo: {
    screen: WithdrawalInfoScreen,
    title: 'WithdrawalInfo',
  },
  WalletBalance: {
    screen: WalletBalanceScreen,
    title: 'WalletBalance',
  },
  WalletTransactions: {
    screen: WalletTransactionsScreen,
    title: 'WalletTransactions',
  },
  HowToEarnInterest: {
    screen: HowToEarnInterestScreen,
    title: 'HowToEarnInterest',
  },
  WalletInterest: {
    screen: WalletInterestScreen,
    title: 'WalletInterest',
  },
  // NOTE(fj): plop screenGen inserting new Screen here
}, {
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
