import React, {Component} from 'react';
import { ImageBackground } from "react-native";
import {connect} from 'react-redux';
import {Container, Content, View} from 'native-base';
import {bindActionCreators} from 'redux';

import WelcomeStyle from "./Welcome.styles";
import CelButton from "../../atoms/CelButton/CelButton";
import * as appActions from '../../../redux/actions';
import WelcomeCarousel from "../../molecules/WelcomeCarousel/WelcomeCarousel";
import { mixpanelEvents } from '../../../services/mixpanel'


@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class WelcomeScreen extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentWillMount() {
    const {actions, user} = this.props;
    if (user) {
      actions.navigateTo('Home')
    }
  }

  render() {
    const {actions} = this.props;

    return (
      <Container style={{ backgroundColor: 'black' }}>
        <Content bounces={false} style={WelcomeStyle.content}>

          <ImageBackground source={require('../../../../assets/images/Onboarding_background3x.png')} style={[WelcomeStyle.view]}>
            <WelcomeCarousel />

            <View style={WelcomeStyle.buttonWrapper}>
              <CelButton
                // TODO(ns): see when to redirect to login instead of sign up
              onPress={() => {
                actions.navigateTo('SignupOne');
                mixpanelEvents.signupButton()
              }}
                transparent
                size="medium"
              >
               Skip
              </CelButton>
            </View>
          </ImageBackground>
        </Content>
      </Container>
    );
  }
}

export default WelcomeScreen;
