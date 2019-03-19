import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { TWLoginButton } from "react-native-simple-twitter";

import testUtil from "../../../utils/test-util";

import SocialLoginStyle from "./SocialLogin.styles";
import Icon from "../../atoms/Icon/Icon";

class SocialLogin extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['login', 'register']),
    actions: PropTypes.instanceOf(Object).isRequired,
  };
  static defaultProps = {
    type: 'login'
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  onTwitterSuccess = (twitterUser) => {
    const { user, type, actions } = this.props;

    const u = twitterUser;
    u.accessToken = user.twitter_oauth_token;
    u.secret_token = user.twitter_oauth_secret;

    if (type === "login") {
      actions.loginTwitter(u);
    } else {
      actions.twitterSuccess(u);
    }
  };

  onOpenTwitter = () => {
    const { actions } = this.props;
    // if (type === "signup") {
      // analyticsEvents.startedSignup("Twitter");
    // }
    this.fakeTwitterButton.onButtonPress();
    actions.twitterOpen();
  };

  setFakeTwitterButton = (component) => {
    this.fakeTwitterButton = component;
  };

  render() {
    const { actions, type } = this.props
    const style = SocialLoginStyle()
    return (
      <View style={style.container}>
        <View style={style.wrapper}>
          <TouchableOpacity onPress={() => actions.facebookAuth(type)}>
            <Icon name="Facebook" height="35" width="35" fill="#bdc1c3"/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => actions.googleAuth(type)}>
            <Icon name="Google" height="35" width="35" fill="#bdc1c3"/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onOpenTwitter}>
            <Icon name="Twitter" height="35" width="35" fill="#bdc1c3"/>
          </TouchableOpacity>
        </View>

        <TWLoginButton
          ref={this.setFakeTwitterButton}
          style={style.fakeTwitterButton}
          onGetAccessToken={actions.twitterGetAccessToken}
          onSuccess={this.onTwitterSuccess}
          closeText="< Back to Celsius"
          onClose={actions.twitterClose}
          onError={this.handleError}
        />
      </View>
    );
  }
}

export default testUtil.hookComponent(SocialLogin);
