import {StackNavigator} from 'react-navigation';

// screens
import WelcomeScreen from '../components/screens/Welcome/Welcome';
import LoginScreen from "../components/screens/Login/Login";
import ForgottenPasswordScreen from "../components/screens/ForgottenPassword/ForgottenPassword";
import RegisterScreen from "../components/screens/Register/Register";
import HomeScreen from "../components/screens/Home/Home";
import CalculatorScreen from "../components/screens/Calculator/Calculator";
import EarnInterestScreen from '../components/screens/EarnInterest/EarnInterest';
import ComingSoonScreen from "../components/screens/ComingSoon/ComingSoon";
import LoanPreviewScreen from "../components/screens/LoanPreview/LoanPreview";
import ThankYouScreen from "../components/screens/ThankYou/ThankYou";
import CongratsScreen from "../components/screens/Congrats/Congrats";
import ThankYouLenderScreen from '../components/screens/EarnInterest/ThankYouLender'
import PersonalInfoScreen from "../components/screens/KYC/PersonalInfo";
import AddressInfoScreen from "../components/screens/KYC/AddressInfo";
import DocumentInfoScreen from "../components/screens/KYC/DocumentInfo";
import LoanDetailsScreen from "../components/screens/KYC/LoanDetails";
import ManagePortfolioScreen from "../components/screens/ManagePortfolio";
// NOTE(fj): plop screenGen importing new Screen here

const Navigator = StackNavigator({
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
  Register: {
    screen: RegisterScreen,
    title: 'Register',
  },
  Home: {
    screen: HomeScreen,
    title: 'Home',
  },
  EarnInterest: {
    screen: EarnInterestScreen,
    title: 'EarnInterest'
  },
  ManagePortfolio: {
    screen: ManagePortfolioScreen,
    title: 'ManagePortfolio',
  },
  ThankYouLender: {
    screen: ThankYouLenderScreen,
    title: 'ThankYouLender'
  },
  Calculator: {
    screen: CalculatorScreen,
    title: 'Calculator',
  },
  ComingSoon: {
    screen: ComingSoonScreen,
    title: 'ComingSoon',
  },
  LoanPreview: {
    screen: LoanPreviewScreen,
    title: 'LoanPreview',
  },
  ThankYou: {
    screen: ThankYouScreen,
    title: 'ThankYou',
  },
  Congrats: {
    screen: CongratsScreen,
    title: 'Congrats',
  },
  PersonalInfo: {
    screen: PersonalInfoScreen,
    title: 'PersonalInfo',
  },
  AddressInfo: {
    screen: AddressInfoScreen,
    title: 'AddressInfo',
  },
  LoanDetails: {
    screen: LoanDetailsScreen,
    title: 'LoanDetails',
  },
  DocumentInfo: {
    screen: DocumentInfoScreen,
    title: 'DocumentInfo',
  },
  // NOTE(fj): plop screenGen inserting new Screen here
}, {
  headerMode: 'none'
});

export default Navigator;
