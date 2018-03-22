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
import ContactInfoScreen from "../screens/Forms/ContactInfo";
import BankAccountInfoScreen from "../screens/Forms/BankAcountInfo";

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
  ContactInfo: {
    screen: ContactInfoScreen,
    title: 'ContactInfo',
  },
  BankAccountInfo: {
    screen: BankAccountInfoScreen,
    title: 'BankAccountInfo',
  }
}, {
  headerMode: 'none'
});

export default Navigator;
