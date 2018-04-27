import React, {Component} from 'react';
import {Text, View} from 'native-base';
import PropTypes from "prop-types";
import {Col, Grid} from "react-native-easy-grid";
import {TouchableOpacity} from "react-native";
import {Google, Facebook} from 'expo';
import {TWLoginButton} from 'react-native-simple-twitter';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
  GOOGLE_WEB_CLIENT_ID,
  GOOGLE_ANDROID_STANDALONE_APP_CLIENT_ID,
  GOOGLE_IOS_STANDALONE_APP_CLIENT_ID,
  GOOGLE_ANDROID_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
  GOOGLE_URL,
  FACEBOOK_APP_ID,
  FACEBOOK_URL
} from 'react-native-dotenv'

import StepStyles from "./Steps.styles";
import Icon from "../../../atoms/Icon/Icon";
import {Separator} from '../../../atoms/Separator/Separator';
import * as actions from "../../../../redux/actions";
import LoginForm from "../../../organisms/LoginForm/LoginForm";

@connect(
  () => ({}),
  dispatch => bindActionCreators(actions, dispatch),
)

class Step1 extends Component {
  static propTypes = {
    onNextStep: PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    // this._setupGoogleSignin();
  }

  onSubmit = data => {
    const {onNextStep} = this.props;

    onNextStep(data) // should return server response
  };

  onOpenTwitter = () => {
    this.fakeTwitterButton.onButtonPress();
    this.props.twitterOpen();
  };

  onTwitterSuccess = (twitterUser) => {
    const {twitterSuccess, onNextStep} = this.props;
    twitterSuccess(twitterUser);
    onNextStep();
  };

  setFakeTwitterButton = (component) => {
    this.fakeTwitterButton = component;
  };


  googleAuth = async () => {
    const {onNextStep, googleSuccess} = this.props;

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
        onNextStep();
      } else {
        return {cancelled: true};
      }
    } catch (e) {
      return {error: true};
    }
  };

  faceBookAuth = async () => {
    const {onNextStep, faceBookSuccess} = this.props;

    try {
      const {type, token} = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
        permissions: ['public_profile', 'email'],
      });

      if (type === 'success') {
        const response = await fetch(`${FACEBOOK_URL}${token}`);

        const user = await response.json();
        user.accessToken = token;

        faceBookSuccess(user);
        onNextStep();
      }
    } catch (e) {
      this.props.showMessage('error', e.message)
    }

  };

  handleError = (err) => {
    console.log(err)
  };

  render() {
    const {twitterClose, twitterGetAccessToken} = this.props;
    return (
      <View>
        <View>
          <Grid>
            <Col style={StepStyles.centeredColumn}>
              <TouchableOpacity onPress={this.faceBookAuth}>
                <Icon name='FaceBook' width='75' height='75' viewBox="0 0 80 80" fill='#FFFFFF'/>
                <View style={StepStyles.socialNetworkTextWrapper}>
                  <Text style={StepStyles.socialNetworkDescription}>Sign up with</Text>
                  <Text style={StepStyles.socialNetworkName}>FaceBook</Text>
                </View>
              </TouchableOpacity>
            </Col>
            <Col style={StepStyles.centeredColumn}>
              <TouchableOpacity onPress={this.googleAuth}>
                <Icon name='Google' width='75' height='75' viewBox="0 0 80 80" fill='#FFFFFF'/>
                <View style={StepStyles.socialNetworkTextWrapper}>
                  <Text style={StepStyles.socialNetworkDescription}>Sign up with</Text>
                  <Text style={StepStyles.socialNetworkName}>Google</Text>
                </View>


              </TouchableOpacity>
            </Col>
            <Col style={StepStyles.centeredColumn}>
              <TouchableOpacity onPress={this.onOpenTwitter}>
                <Icon name='Twitter' width='75' height='75' viewBox="0 0 80 80" fill='#FFFFFF'/>
                <View style={StepStyles.socialNetworkTextWrapper}>
                  <Text style={StepStyles.socialNetworkDescription}>Sign up with</Text>
                  <Text style={StepStyles.socialNetworkName}>Twitter</Text>
                </View>
              </TouchableOpacity>
            </Col>
          </Grid>
        </View>

        <Separator>OR SIGN UP WITH E-MAIL</Separator>

        <View style={{paddingTop: 46, paddingBottom: 60}}>
          <LoginForm onSubmit={(data) => this.onSubmit(data)} buttonText={'Create Account'}/>
        </View>

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
    );
  }
}

export default Step1;
