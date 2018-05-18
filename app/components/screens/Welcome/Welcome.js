import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Content, View} from 'native-base';
import {bindActionCreators} from 'redux';

import {MainHeader} from '../../molecules/MainHeader/MainHeader';
import WelcomeStyle from "./Welcome.styles";
import CelButton from "../../atoms/CelButton/CelButton";
import * as actions from '../../../redux/actions';
import WelcomeCarousel from "../../molecules/WelcomeCarousel/WelcomeCarousel";
import { getUserTemporaryId, actions as mixpanelActions } from '../../../services/mixpanel' 

@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class WelcomeScreen extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentWillMount() {
    const {navigateTo, user} = this.props;
    if (user) { 
      navigateTo('Home')
    } else { 
      getUserTemporaryId() 
    } 
  }

  render() {
    const {navigateTo} = this.props;

    return (
      <Container style={{ backgroundColor: 'black' }}>
        <Content bounces={false} style={WelcomeStyle.content}>
          <MainHeader/>
          <View style={[WelcomeStyle.view]}>
            <WelcomeCarousel />

            <View style={WelcomeStyle.buttonWrapper}>
              <CelButton
                onPress={() => {
                  mixpanelActions.signupButton();
                  navigateTo('SignupOne')}
                }
                white
                iconRight="IconArrowRight"
              >
                Sign up
              </CelButton>

              <CelButton
                onPress={() => navigateTo('Login', true)}
                transparent
                size="small"
                margin="25 0 20 0"
              >
                Already have an account?
              </CelButton>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

export default WelcomeScreen;
