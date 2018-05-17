import React, {Component} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import {View} from 'native-base';
import {bindActionCreators} from 'redux';
import {Constants} from "expo";

import CelButton from '../../atoms/CelButton/CelButton';
import LoginForm from "../../organisms/LoginForm/LoginForm";
import LoginStyle from "./Login.styles";
import * as actions from "../../../redux/actions";
import {getSecureStoreKey} from '../../../utils/expo-storage';
import Separator from "../../atoms/Separator/Separator";
import ThirdPartyLoginSection from "../../organisms/ThirdPartyLoginSection/ThirdPartyLoginSection";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import {STYLES} from "../../../config/constants/style";

const {SECURITY_STORAGE_AUTH_KEY} = Constants.manifest.extra;

@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    dimensions: state.ui.dimensions,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class LoginScreen extends Component {
  constructor() {
    super();

    this.state = {
      // these are predefined values, actual values from component and device may differ
      textHeight: 70,
      buttonHeight: 125,
      headingHeight: 100,
      smIcon: 158,
      separator: 67
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.setHeight = this.setHeight.bind(this);
  }

  componentWillMount = async () => {
    const {navigateTo} = this.props;
    const token = await getSecureStoreKey(SECURITY_STORAGE_AUTH_KEY);
    if (token) navigateTo('Home', true);
  };

  getFormHeight = () => {
    const {textHeight, buttonHeight, headingHeight, smIcon, separator} = this.state;
    const {dimensions} = this.props;

    return Math.max(dimensions.screenHeight - dimensions.header - dimensions.statusBar - textHeight - buttonHeight - headingHeight - smIcon - separator, 250);
  };

  setHeight = (elName, dimensions) => {
    this.setState({
      [`${elName}Height`]: dimensions.height,
    })
  };

  handleLogin = async data => {
    const {loginBorrower} = this.props;
    await loginBorrower(data);
  };

  render() {
    const {navigateTo} = this.props;

    const formHeight = this.getFormHeight();

    return (
      <SimpleLayout
        mainHeader={{ back: false, rightLink: { screen: 'SignupOne', text: 'Sign Up' }}}
        animatedHeading={{ text: 'Welcome Back!' }}
        bottomNavigation={ false }
        background={STYLES.PRIMARY_BLUE}
      >

        <Text style={LoginStyle.description}>
          Looks like your session timed out! Please log in again.
        </Text>

        <View style={{paddingTop: 30}}>
          <ThirdPartyLoginSection type="login" />
        </View>

        <Separator margin='15 0 30 0'>OR LOGIN WITH E-MAIL</Separator>

        <View style={[LoginStyle.formWrapper, {height: formHeight}]}>
          <LoginForm onSubmit={(data) => this.handleLogin(data)} buttonText={'Log in'}/>
        </View>

        <CelButton
          size="small"
          transparent
          margin="25 0 60 0"
          onPress={() => navigateTo('ForgottenPassword')}
        >
          Forgot password?
        </CelButton>
      </SimpleLayout>
    );
  }
}

export default LoginScreen;
