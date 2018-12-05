import React, {Component} from 'react';
import { ImageBackground, StatusBar } from "react-native";
import {connect} from 'react-redux';
import {Container, Content, View} from 'native-base';
import {bindActionCreators} from 'redux';
import testUtil from "../../../utils/test-util";

import WelcomeStyle from "./Welcome.styles";
import CelButton from "../../atoms/CelButton/CelButton";
import * as appActions from '../../../redux/actions';
import WelcomeCarousel from "../../molecules/WelcomeCarousel/WelcomeCarousel";
import { analyticsEvents } from '../../../utils/analytics-util';
import ReferralReceivedModal from "../../organisms/ReferralReceivedModal/ReferralReceivedModal";
import Message from "../../atoms/Message/Message";


@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class WelcomeScreen extends Component {
  render() {
    const {actions} = this.props;

    return (
      <Container
        ref={testUtil.generateTestHook(this, `Welcome.screen`)}
        style={{ backgroundColor: 'black' }}
      >
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
        />
        <Content bounces={false} style={WelcomeStyle.content}>
          <ImageBackground source={require('../../../../assets/images/Onboarding_background3x.png')} style={[WelcomeStyle.view]}>
            <Message/>

            <WelcomeCarousel />

            <View style={WelcomeStyle.buttonWrapper}>
              <CelButton
                // TODO(ns): see when to redirect to login instead of sign up
                ref={testUtil.generateTestHook(this, 'Welcome.skipButton')}
              onPress={() => {
                actions.navigateTo('SignupOne');
                analyticsEvents.signupButton()
              }}
                transparent
                size="medium"
              >
               Skip
              </CelButton>
            </View>
          </ImageBackground>
        </Content>
        <ReferralReceivedModal />
      </Container>
    );
  }
}

export default testUtil.hookComponent(WelcomeScreen);
