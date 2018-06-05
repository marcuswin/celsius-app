import {createStackNavigator} from 'react-navigation';

// screens
import WelcomeScreen from '../components/screens/Welcome/Welcome';
import LoginScreen from "../components/screens/Login/Login";
import ForgottenPasswordScreen from "../components/screens/ForgottenPassword/ForgottenPassword";
import HomeScreen from "../components/screens/Home/Home";
import CalculatorScreen from "../components/screens/Calculator/Calculator";
import ManagePortfolioScreen from "../components/screens/ManagePortfolio";
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
  VerifyPhoneNumber: {
    screen: VerifyPhoneNumberScreen,
    title: 'VerifyPhoneNumber',
  },
  NoKyc: {
    screen: NoKycScreen,
    title: 'NoKyc',
  },
  // NOTE(fj): plop screenGen inserting new Screen here
}, {
  headerMode: 'none'
});

export default Navigator;
