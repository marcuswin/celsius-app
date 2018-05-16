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
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class ThirdPartyLoginSection extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['signup', 'login'])
  };

  // lifecycle methods
  // event hanlders
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
      const {type, token} = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID.toString(), {
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

  // rendering methods
  render() {
    const {twitterClose, twitterGetAccessToken, screenWidth} = this.props;

    const iconSize = 0.2 * screenWidth;

    return (
      <View>
        <Grid>
          <Col style={ThirdPartyLoginSectionStyle.centeredColumn}>
            <TouchableOpacity onPress={this.facebookAuth}>
              <Icon name='Facebook' width={iconSize} height={iconSize} viewBox="0 0 80 80" fill='#FFFFFF'/>
              <View style={ThirdPartyLoginSectionStyle.socialNetworkTextWrapper}>
                <Text style={ThirdPartyLoginSectionStyle.socialNetworkDescription}>Login with</Text>
                <Text style={ThirdPartyLoginSectionStyle.socialNetworkName}>Facebook</Text>
              </View>
            </TouchableOpacity>
          </Col>
          <Col style={ThirdPartyLoginSectionStyle.centeredColumn}>
            <TouchableOpacity onPress={this.googleAuth}>
              <Icon name='Google' width={iconSize} height={iconSize} viewBox="0 0 80 80" fill='#FFFFFF'/>
              <View style={ThirdPartyLoginSectionStyle.socialNetworkTextWrapper}>
                <Text style={ThirdPartyLoginSectionStyle.socialNetworkDescription}>Login with</Text>
                <Text style={ThirdPartyLoginSectionStyle.socialNetworkName}>Google</Text>
              </View>


            </TouchableOpacity>
          </Col>
          <Col style={ThirdPartyLoginSectionStyle.centeredColumn}>
            <TouchableOpacity onPress={this.onOpenTwitter}>
              <Icon name='Twitter' width={iconSize} height={iconSize} viewBox="0 0 80 80" fill='#FFFFFF'/>
              <View style={ThirdPartyLoginSectionStyle.socialNetworkTextWrapper}>
                <Text style={ThirdPartyLoginSectionStyle.socialNetworkDescription}>Login with</Text>
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
