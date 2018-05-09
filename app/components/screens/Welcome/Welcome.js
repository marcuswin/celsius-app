import React, {Component} from 'react';
import {Text, StatusBar, Image} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, View} from 'native-base';
import {bindActionCreators} from 'redux';

import {MainHeader} from '../../molecules/MainHeader/MainHeader';
import {GLOBAL_STYLE_DEFINITIONS} from "../../../config/constants/style";
import WelcomeStyle from "./Welcome.styles";
import CelButton from "../../atoms/CelButton/CelButton";
import * as actions from '../../../redux/actions';

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
    if (user) navigateTo('Home');
  }

  render() {
    const {navigateTo} = this.props;

    return (
      <Container>
        <StatusBar barStyle="dark-content" style={WelcomeStyle.statusBar}/>
        <MainHeader/>
        <Content bounces={false} style={WelcomeStyle.content}>
          <View style={[WelcomeStyle.view]}>

            <View style={[WelcomeStyle.heroImageWrapper, GLOBAL_STYLE_DEFINITIONS.centeredColumn]}>
              <Image source={require('../../../../assets/images/Welcome-Animal.png')} style={[WelcomeStyle.heroImage]}/>
            </View>

            <Text style={WelcomeStyle.heading}>Welcome to Celsius</Text>
            <Text style={WelcomeStyle.description}>
              We are creating the future of
              <Text style={GLOBAL_STYLE_DEFINITIONS.boldText}> P2P lending and borrowing</Text>.
              Keep up with what we’re doing by joining our community of members.
            </Text>
            <View style={WelcomeStyle.buttonWrapper}>
              <CelButton
                onPress={() => navigateTo('SignupOne')}
                white
                iconRight="IconArrowRight"
              >
                Sign up
              </CelButton>

              <CelButton
                onPress={() => navigateTo('Login', true)}
                transparent
                size="small"
                margin="25 0 60 0"
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
