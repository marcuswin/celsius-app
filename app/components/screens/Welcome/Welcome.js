import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Content, View} from 'native-base';
import {bindActionCreators} from 'redux';

import {MainHeader} from '../../molecules/MainHeader/MainHeader';
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
          <MainHeader/>
          <View style={[WelcomeStyle.view]}>
            <WelcomeCarousel />

            <View style={WelcomeStyle.buttonWrapper}>
              <CelButton
                onPress={() => {
                  mixpanelEvents.signupButton();
                  actions.navigateTo('SignupOne')}
                }
                white
                iconRight="IconArrowRight"
              >
                Sign up
              </CelButton>

              <CelButton
                onPress={() => actions.navigateTo('Login', true)}
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
