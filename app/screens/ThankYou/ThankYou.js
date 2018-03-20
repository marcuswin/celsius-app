import React, {Component} from 'react';
import {Image, Linking, StatusBar, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Text, View} from 'native-base';
import {bindActionCreators} from "redux";

import ThankYouStyle from "./styles";
import * as NavigateActions from "../../redux/actions/navigate";
import {FONT_SCALE, GLOBAL_STYLE_DEFINITIONS, STYLES} from "../../config/constants/style";
import Icon from "../../components/Icons/Icon";
import {PrimaryButton} from "../../components/Buttons/Button/Button";

@connect(
  state => ({
    nav: state.nav,
    loanRequest: state.loanRequests.loanRequest,
    user: state.users.user,
  }),
  dispatch => bindActionCreators(NavigateActions, dispatch),
)

class ThankYouScreen extends Component {
  constructor() {
    super();

    this.state = {};
  }


  onScroll = event => {
    this.heading.animateHeading(event);
  };

  render() {
    const {loanRequest, navigateTo, user} = this.props;

    return (
      <Container>
        <StatusBar barStyle="dark-content"/>
        <Content bounces={false} style={ThankYouStyle.content} onScroll={this.onScroll}>
          <Text style={ThankYouStyle.heading}>Thanks for joining!</Text>
          <Text style={ThankYouStyle.welcomeText}>Welcome to the community, {user.first_name}</Text>

          <TouchableOpacity onPress={() => navigateTo('Home', true)}>
            <View style={[GLOBAL_STYLE_DEFINITIONS.centeredColumn, {paddingTop: 24}]}>
              <View style={ThankYouStyle.imageWrapper}>
                <View style={ThankYouStyle.celsiusLogo}>
                  <Icon name='CelsiusLogoV2' width='48' height='48' viewBox="0 0 49 49" fill='#FFFFFF'/>
                </View>
                <Image style={{width: 200, height: 200, borderRadius: 100}}
                       source={require('../../../assets/images/Headshot-cat.jpg')}/>
              </View>
            </View>
          </TouchableOpacity>

          <View style={{paddingTop: 26}}>
            <Text style={ThankYouStyle.description}>
              You’re the
              <Text
                style={[GLOBAL_STYLE_DEFINITIONS.boldText, {color: '#fff'}]}> {loanRequest ? loanRequest.order : 0} </Text>
              person to sign up for a loan using their crypto as collateral. We plan to start issuing our first loans
              later this Spring and will be in touch.
            </Text>
          </View>


          <View style={{paddingBottom: 20, paddingTop: 30}}>
            <PrimaryButton
              iconRight={false}
              customStyles={{backgroundColor: '#fff', height: 50}}
              customTitleStyles={{color: STYLES.PRIMARY_BLUE, fontSize: FONT_SCALE * 18}}
              onPress={() => this.props.navigateTo('EarnInterest')}
              title="Learn about Earning Interest"/>
          </View>

          <TouchableOpacity onPress={() => Linking.openURL('https://t.me/CelsiusNetwork')}>
            <View style={ThankYouStyle.telegramContainer}>
              <Icon name='TelegramIcon' width='24' height='24' viewBox="0 0 24 24" fill='#FFFFFF'/>
              <Text style={ThankYouStyle.telegramText}>Join us on Telegram</Text>
            </View>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

export default ThankYouScreen;
