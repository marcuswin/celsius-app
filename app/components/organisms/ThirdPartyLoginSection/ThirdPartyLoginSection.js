import React, {Component} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {Col, Grid} from "react-native-easy-grid";
import {TWLoginButton} from 'react-native-simple-twitter';
import {Constants, Facebook, Google} from "expo";

import * as actions from "../../../redux/actions";
import ThirdPartyLoginSectionStyle from "./ThirdPartyLoginSection.styles";
import Icon from "../../atoms/Icon/Icon";
import { actions as mixpanelActions } from '../../../services/mixpanel'


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
    screenWidth: state.ui.dimensions.screenWidth,
    user: state.users.user,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class ThirdPartyLoginSection extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['signup', 'login'])
  };

  // lifecycle methods
  // event handlers
  onOpenTwitter = () => {
    if (this.props.type === 'signup') {
      mixpanelActions.startedSignup('Twitter');
    }
    this.fakeTwitterButton.onButtonPress();
    this.props.twitterOpen();
  };

  onTwitterSuccess = (twitterUser) => {
    const {loginTwitter, user, type, twitterSuccess} = this.props;

    const u = twitterUser;
    u.accessToken = user.twitter_oauth_token;
    u.secret_token = user.twitter_oauth_secret;

    if (type === 'login') {
      loginTwitter(u);
    } else {
      twitterSuccess(u);
    }
  };

  setFakeTwitterButton = (component) => {
    this.fakeTwitterButton = component;
  };

  googleAuth = async () => {
    const {loginGoogle, type, googleSuccess} = this.props;

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

        if (type === 'login') {
          loginGoogle(user);
        } else {
          mixpanelActions.startedSignup('Google');
          googleSuccess(user);
        }
      } else {
        return {cancelled: true};
      }
    } catch (e) {
      return {error: true};
    }
  };

  facebookAuth = async () => {
    const {loginFacebook, facebookSuccess} = this.props;

    try {
      const {type, token} = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID.toString(), {
        permissions: ['public_profile', 'email'],
      });

      if (type === 'success') {
        const response = await fetch(`${FACEBOOK_URL}${token}`);

        const user = await response.json();
        user.accessToken = token;

        if (this.props.type === 'login') {
          loginFacebook(user);
        } else {
          mixpanelActions.startedSignup('Facebook');
          facebookSuccess(user);
        }
      }
    } catch (e) {
      this.props.showMessage('error', e.message)
    }

  };

  // rendering methods
  render() {
    const {twitterClose, twitterGetAccessToken, screenWidth, type} = this.props;

    const iconSize = 0.2 * screenWidth;
    const action = type === 'login' ? 'Login with' : 'Sign up with';

    return (
      <View>
        <Grid>
          <Col style={ThirdPartyLoginSectionStyle.centeredColumn}>
            <TouchableOpacity onPress={this.facebookAuth}>
              <Icon name='Facebook' width={iconSize} height={iconSize} viewBox="0 0 80 80" fill='#FFFFFF'/>
              <View style={ThirdPartyLoginSectionStyle.socialNetworkTextWrapper}>
                <Text style={ThirdPartyLoginSectionStyle.socialNetworkDescription}>{ action }</Text>
                <Text style={ThirdPartyLoginSectionStyle.socialNetworkName}>Facebook</Text>
              </View>
            </TouchableOpacity>
          </Col>
          <Col style={ThirdPartyLoginSectionStyle.centeredColumn}>
            <TouchableOpacity onPress={this.googleAuth}>
              <Icon name='Google' width={iconSize} height={iconSize} viewBox="0 0 80 80" fill='#FFFFFF'/>
              <View style={ThirdPartyLoginSectionStyle.socialNetworkTextWrapper}>
                <Text style={ThirdPartyLoginSectionStyle.socialNetworkDescription}>{ action }</Text>
                <Text style={ThirdPartyLoginSectionStyle.socialNetworkName}>Google</Text>
              </View>


            </TouchableOpacity>
          </Col>
          <Col style={ThirdPartyLoginSectionStyle.centeredColumn}>
            <TouchableOpacity onPress={this.onOpenTwitter}>
              <Icon name='Twitter' width={iconSize} height={iconSize} viewBox="0 0 80 80" fill='#FFFFFF'/>
              <View style={ThirdPartyLoginSectionStyle.socialNetworkTextWrapper}>
                <Text style={ThirdPartyLoginSectionStyle.socialNetworkDescription}>{ action }</Text>
                <Text style={ThirdPartyLoginSectionStyle.socialNetworkName}>Twitter</Text>
              </View>
            </TouchableOpacity>
          </Col>
        </Grid>

        <TWLoginButton
          ref={this.setFakeTwitterButton}
          style={ThirdPartyLoginSectionStyle.fakeTwitterButton}
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

export default ThirdPartyLoginSection;
