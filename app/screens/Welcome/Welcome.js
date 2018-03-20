import React, {Component} from 'react';
import {Text, StatusBar, Image} from 'react-native';
import {connect} from 'react-redux';
import {Button, Container, Content, View} from 'native-base';
import {bindActionCreators} from 'redux';

import {MainHeader} from '../../components/Headers/MainHeader/MainHeader';
import {GLOBAL_STYLE_DEFINITIONS} from "../../config/constants/style";
import WelcomeStyle from "./styles";
import {PrimaryButton} from "../../components/Buttons/Button/Button";
import {Heading} from "../../components/Headings/Heading/Heading";
import * as actions from '../../redux/actions/index';

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
              <Image source={require('../../../assets/images/Welcome-Animal.png')} style={[WelcomeStyle.heroImage]}/>
            </View>

            <Heading style={WelcomeStyle.welcomeTitle} text={'Welcome to Celsius'}/>
            <Text style={WelcomeStyle.description}>
              We are creating the future of
              <Text style={GLOBAL_STYLE_DEFINITIONS.boldText}> P2P lending and borrowing</Text>.
              Keep up with what we’re doing by joining our community of members.
            </Text>
            <View style={WelcomeStyle.buttonWrapper}>
              <PrimaryButton onPress={() => navigateTo('Register')} title={'Sign up'}/>
              <Button
                style={WelcomeStyle.linkButton}
                block
                title={'Already have an account?'}
                transparent
                onPress={() => navigateTo('Login', true)}
              >
                <Text style={WelcomeStyle.linkButtonText}>Already have an account?</Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

export default WelcomeScreen;
