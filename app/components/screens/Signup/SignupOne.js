import React, {Component} from 'react';
import {TouchableOpacity} from "react-native";
import { Text, View, Form } from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {Col, Grid} from "react-native-easy-grid";
import {Google, Facebook, Constants} from 'expo';
import {TWLoginButton} from 'react-native-simple-twitter';

import API from '../../../config/constants/API';
import apiUtil from '../../../utils/api-util';
import Icon from "../../atoms/Icon/Icon";
import Separator from '../../atoms/Separator/Separator';
import PrimaryInput from "../../atoms/Inputs/PrimaryInput";
import CelButton from "../../atoms/CelButton/CelButton";

import * as actions from "../../../redux/actions";
import {STYLES} from "../../../config/constants/style";
import SignupOneStyle from "./Signup.styles";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import PasswordInput from "../../atoms/PasswordInput/PasswordInput";

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
  (state) => ({
    user: state.users.user,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class SignupOne extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        email: '',
        password: '',
      },
    };

    // binders
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeField = this.onChangeField.bind(this);
  }

  // lifecycle methods
  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      this.props.navigateTo('SignupTwo');
    }
  }

  onSubmit() {
    const { formData } = this.state;
    const { registerUser } = this.props;

    registerUser(formData);
  };

  onChangeField = (fieldName, text) => {
    this.setState({ formData: { ...this.state.formData, [fieldName]: text }});
  }

  // Twitter methods
  onOpenTwitter = () => {
    this.fakeTwitterButton.onButtonPress();
    this.props.twitterOpen();
  };

  onTwitterSuccess = (twitterUser) => {
    const {twitterSuccess} = this.props;
    console.log(twitterUser);
    twitterSuccess(twitterUser);
  };

  setFakeTwitterButton = (component) => {
    this.fakeTwitterButton = component;
  };


  // Google methods
  googleAuth = async () => {
    const {googleSuccess} = this.props;

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
        googleSuccess(user);
      } else {
        return {cancelled: true};
      }
    } catch (e) {
      return {error: true};
    }
  };

  // Facebook methods
  facebookAuth = async () => {
    const {facebookSuccess} = this.props;

    try {
      const {type, token} = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
        permissions: ['public_profile', 'email'],
      });

      if (type === 'success') {
        const response = await fetch(`${FACEBOOK_URL}${token}`);

        const user = await response.json();
        user.accessToken = token;

        facebookSuccess(user);
      }
    } catch (e) {
      this.props.showMessage('error', e.message)
    }

  };

  // rendering methods
  render() {
    const {twitterClose, twitterGetAccessToken, callsInProgress } = this.props;
    const { email, password } = this.state.formData;

    const isLoading = apiUtil.areCallsInProgress([API.REGISTER_USER], callsInProgress);

    return (
      <SimpleLayout
        mainHeader={{ back: true, rightLink: { screen: 'Login', text: 'Log in' }}}
        animatedHeading={{ text: 'Sign up' }}
        bottomNavigation={ false }
        background={STYLES.PRIMARY_BLUE}
      >
        <View>
          <View>
            <Grid>
              <Col style={SignupOneStyle.centeredColumn}>
                <TouchableOpacity onPress={this.facebookAuth}>
                  <Icon name='Facebook' width='75' height='75' viewBox="0 0 80 80" fill='#FFFFFF'/>
                  <View style={SignupOneStyle.socialNetworkTextWrapper}>
                    <Text style={SignupOneStyle.socialNetworkDescription}>Sign up with</Text>
                    <Text style={SignupOneStyle.socialNetworkName}>Facebook</Text>
                  </View>
                </TouchableOpacity>
              </Col>

              <Col style={SignupOneStyle.centeredColumn}>
                <TouchableOpacity onPress={this.googleAuth}>
                  <Icon name='Google' width='75' height='75' viewBox="0 0 80 80" fill='#FFFFFF'/>
                  <View style={SignupOneStyle.socialNetworkTextWrapper}>
                    <Text style={SignupOneStyle.socialNetworkDescription}>Sign up with</Text>
                    <Text style={SignupOneStyle.socialNetworkName}>Google</Text>
                  </View>
                </TouchableOpacity>
              </Col>

              <Col style={SignupOneStyle.centeredColumn}>
                <TouchableOpacity onPress={this.onOpenTwitter}>
                  <Icon name='Twitter' width='75' height='75' viewBox="0 0 80 80" fill='#FFFFFF'/>
                  <View style={SignupOneStyle.socialNetworkTextWrapper}>
                    <Text style={SignupOneStyle.socialNetworkDescription}>Sign up with</Text>
                    <Text style={SignupOneStyle.socialNetworkName}>Twitter</Text>
                  </View>
                </TouchableOpacity>
              </Col>
            </Grid>
          </View>

          <Separator>OR SIGN UP WITH E-MAIL</Separator>

          <View style={SignupOneStyle.formWrapper}>
            <Form>
              <PrimaryInput labelText={'E-mail'} keyboardType='email-address' value={email} onChange={(text) => this.onChangeField('email', text)}/>
              <PasswordInput labelText={'Password'} secureTextEntry value={password} onChange={(text) => this.onChangeField('password', text)}/>
            </Form>
            <View style={SignupOneStyle.formButtonWrapper}>
              <CelButton
                disabled={!email || !password }
                loading={ isLoading }
                onPress={this.onSubmit}
                white
                iconRight="IconArrowRight"
              >
                Create account
              </CelButton>
            </View>
          </View>

          <TWLoginButton
            ref={this.setFakeTwitterButton}
            style={SignupOneStyle.fakeTwitterButton}
            onGetAccessToken={twitterGetAccessToken}
            onSuccess={this.onTwitterSuccess}
            closeText="< Back to Celsius"
            onClose={twitterClose}
            onError={console.log}
          />
        </View>
      </SimpleLayout>
    );
  }
}

export default SignupOne;
