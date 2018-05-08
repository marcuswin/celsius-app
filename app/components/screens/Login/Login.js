import React, {Component} from 'react';
import {Text, StatusBar, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Button, Container, Content, View} from 'native-base';
import {bindActionCreators} from 'redux';
import {Col, Grid} from "react-native-easy-grid";
import {TWLoginButton} from 'react-native-simple-twitter';
import {Constants, Facebook, Google} from "expo";
import {SECURITY_STORAGE_AUTH_KEY} from 'react-native-dotenv'

import {MainHeader} from '../../molecules/MainHeader/MainHeader';
import {AnimatedHeading} from '../../molecules/AnimatedHeading/AnimatedHeading';
import {Message} from '../../atoms/Message/Message';
import LoginForm from "../../organisms/LoginForm/LoginForm";
import LoginStyle from "./Login.styles";
import * as actions from "../../../redux/actions";
import {getSecureStoreKey} from '../../../utils/expo-storage';
import StepStyles from "../Signup/Signup.styles";
import Icon from "../../atoms/Icon/Icon";
import {Separator} from "../../atoms/Separator/Separator";

const {
  GOOGLE_WEB_CLIENT_ID,
  GOOGLE_ANDROID_STANDALONE_APP_CLIENT_ID,
  GOOGLE_IOS_STANDALONE_APP_CLIENT_ID,
  GOOGLE_ANDROID_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
  GOOGLE_URL,
  FACEBOOK_APP_ID,
  FACEBOOK_URL
} = Constants.manifest.extra;

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

  onScroll = event => {
    this.heading.animateHeading(event);
  };

  onOpenTwitter = () => {
    this.fakeTwitterButton.onButtonPress();
    this.props.twitterOpen();
  };

  onTwitterSuccess = (twitterUser) => {
    const {loginTwitter, user} = this.props;

    const u = twitterUser;
    u.accessToken = user.twitter_oauth_token;
    u.secret_token = user.twitter_oauth_secret;

    loginTwitter(u);
  };

  setFakeTwitterButton = (component) => {
    this.fakeTwitterButton = component;
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

  googleAuth = async () => {
    const {loginGoogle} = this.props;

    try {
      const result = await Google.logInAsync({
        behavior: 'web',
        webClientId: GOOGLE_WEB_CLIENT_ID,
        androidStandaloneAppClientId: GOOGLE_ANDROID_STANDALONE_APP_CLIENT_ID,
        iosStandaloneAppClientId: GOOGLE_IOS_STANDALONE_APP_CLIENT_ID,
        androidClientId: GOOGLE_ANDROID_CLIENT_ID,
        iosClientId: GOOGLE_IOS_CLIENT_ID,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        const userInfoResponse = await fetch(GOOGLE_URL, {
          headers: {Authorization: `Bearer ${result.accessToken}`},
        });

        const user = await userInfoResponse.json();
        user.accessToken = result.accessToken;

        loginGoogle(user)
      } else {
        return {cancelled: true};
      }
    } catch (e) {
      return {error: true};
    }
  };

  facebookAuth = async () => {
    const {loginFacebook} = this.props;

    try {
      const {type, token} = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
        permissions: ['public_profile', 'email'],
      });

      if (type === 'success') {
        const response = await fetch(`${FACEBOOK_URL}${token}`);

        const user = await response.json();
        user.accessToken = token;

        loginFacebook(user);
      }
    } catch (e) {
      this.props.showMessage('error', e.message)
    }

  };

  handleLogin = async data => {
    const {loginBorrower} = this.props;
    await loginBorrower(data);
  };

  render() {
    const {navigateTo, twitterClose, twitterGetAccessToken} = this.props;

    const formHeight = this.getFormHeight();

    return (
      <Container>
        <StatusBar barStyle="dark-content"/>
        <MainHeader rightLink={{ screen: 'Register', text: 'Sign up' }}/>

        <View onLayout={(e) => this.setHeight('heading', e.nativeEvent.layout)}>
          <AnimatedHeading
            ref={(heading) => {
              this.heading = heading;
            }}
            text={'Welcome back!'}/>
        </View>

        <Message/>

        <Content
          bounces={false}
          style={LoginStyle.content}
          onScroll={this.onScroll}>

          <View onLayout={(e) => this.setHeight('text', e.nativeEvent.layout)}>
            <Text style={LoginStyle.description}>
              Looks like your session timed out! Please log in again.
            </Text>
          </View>

          <View style={{paddingTop: 30}}>
            <Grid>
              <Col style={StepStyles.centeredColumn}>
                <TouchableOpacity onPress={this.facebookAuth}>
                  <Icon name='Facebook' width='75' height='75' viewBox="0 0 80 80" fill='#FFFFFF'/>
                  <View style={StepStyles.socialNetworkTextWrapper}>
                    <Text style={StepStyles.socialNetworkDescription}>Login with</Text>
                    <Text style={StepStyles.socialNetworkName}>Facebook</Text>
                  </View>
                </TouchableOpacity>
              </Col>
              <Col style={StepStyles.centeredColumn}>
                <TouchableOpacity onPress={this.googleAuth}>
                  <Icon name='Google' width='75' height='75' viewBox="0 0 80 80" fill='#FFFFFF'/>
                  <View style={StepStyles.socialNetworkTextWrapper}>
                    <Text style={StepStyles.socialNetworkDescription}>Login with</Text>
                    <Text style={StepStyles.socialNetworkName}>Google</Text>
                  </View>


                </TouchableOpacity>
              </Col>
              <Col style={StepStyles.centeredColumn}>
                <TouchableOpacity onPress={this.onOpenTwitter}>
                  <Icon name='Twitter' width='75' height='75' viewBox="0 0 80 80" fill='#FFFFFF'/>
                  <View style={StepStyles.socialNetworkTextWrapper}>
                    <Text style={StepStyles.socialNetworkDescription}>Login with</Text>
                    <Text style={StepStyles.socialNetworkName}>Twitter</Text>
                  </View>
                </TouchableOpacity>
              </Col>
            </Grid>
          </View>

          <Separator>OR LOGIN WITH E-MAIL</Separator>

          <View style={[LoginStyle.formWrapper, {height: formHeight}]}>
            <LoginForm onSubmit={(data) => this.handleLogin(data)} buttonText={'Log in'}/>
          </View>

          <View onLayout={(e) => this.setHeight('button', e.nativeEvent.layout)} style={LoginStyle.buttonWrapper}>
            <Button
              style={LoginStyle.forgottenButton}
              block
              title={'Forgotten password?'}
              transparent
              onPress={() => navigateTo('ForgottenPassword')}
            >
              <Text style={LoginStyle.linkButtonText}>Forgot password?</Text>
            </Button>

            <TWLoginButton
              ref={this.setFakeTwitterButton}
              style={StepStyles.fakeTwitterButton}
              onGetAccessToken={twitterGetAccessToken}
              onSuccess={this.onTwitterSuccess}
              closeText="< Back to Celsius"
              onClose={twitterClose}
              onError={this.handleError}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

export default LoginScreen;
