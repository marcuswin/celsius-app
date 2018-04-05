import {StackNavigator} from 'react-navigation';

// screens
import WelcomeScreen from '../screens/Welcome/Welcome';
import LoginScreen from "../screens/Login/Login";
import RegisterScreen from "../screens/Register/Register";
import HomeScreen from "../screens/Home/Home";
import CalculatorScreen from "../screens/Calculator/Calculator";
import EarnInterestScreen from '../screens/EarnInterest/EarnInterest';
import ComingSoonScreen from "../screens/ComingSoon/ComingSoon";
import LoanPreviewScreen from "../screens/LoanPreview/LoanPreview";
import ThankYouScreen from "../screens/ThankYou/ThankYou";
import ThankYouLenderScreen from '../screens/EarnInterest/ThankYouLender'
import PersonalInfoScreen from "../screens/Forms/PersonalInfo";
import AddressInfoScreen from "../screens/Forms/AddressInfo";
import DocumentInfoScreen from "../screens/Forms/DocumentInfo";
import LoanDetailsScreen from "../screens/Forms/LoanDetails";

const Navigator = StackNavigator({
  Welcome: {
    screen: WelcomeScreen,
    title: 'Welcome',
  },
  Login: {
    screen: LoginScreen,
    title: 'Login',
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
  }
}, {
  headerMode: 'none'
});

export default Navigator;
