import React, {Component} from 'react';
import {Image, Linking, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Text, View} from 'native-base';
import {bindActionCreators} from "redux";

import {FONT_SCALE, GLOBAL_STYLE_DEFINITIONS, STYLES} from "../../../config/constants/style";
import Icon from "../../atoms/Icon/Icon";
import EarnInterest from "./EarnInterest.styles";
import * as actions from "../../../redux/actions";
import {PrimaryButton} from "../../atoms/Buttons/Button/Button";

@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    earnInterest: state.earnInterest
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class ThankYouLenderScreen extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const {navigateTo, user} = this.props;

    return (
      <Container>
        <Content bounces={false} style={EarnInterest.thanksLenderContent}>
          <Text style={EarnInterest.heading}>Thanks for the interest!</Text>
          <Text style={EarnInterest.welcomeText}>{user.first_name}, we couldn't do this without you</Text>

          <TouchableOpacity onPress={() => navigateTo('Home', true)}>
            <View style={[GLOBAL_STYLE_DEFINITIONS.centeredColumn, {paddingTop: 20}]}>
              <View style={EarnInterest.imageWrapper}>
                <View style={EarnInterest.celsiusLogo}>
                  <Icon name='CelsiusLogoV2' width='48' height='48' viewBox="0 0 49 49" fill='#FFFFFF'/>
                </View>
                <Image style={{width: 200, height: 200, borderRadius: 100}}
                       source={require('../../../../assets/images/Headshot-cat.jpg')}/>
              </View>
            </View>
          </TouchableOpacity>

          <View style={EarnInterest.emcWrapper}>
            <Image style={EarnInterest.emcImage}
                   source={require('../../../../assets/images/emc.png')}/>
          </View>

          <View style={{paddingBottom: 20}}>
            <PrimaryButton
              iconRight={false}
              customStyles={{backgroundColor: '#fff', height: 50}}
              customTitleStyles={{color: STYLES.PRIMARY_GREEN, fontSize: FONT_SCALE * 18}}
              onPress={() => navigateTo('Calculator')}
              title="Interested in getting a loan?"/>
          </View>

          <TouchableOpacity onPress={() => Linking.openURL('https://t.me/CelsiusNetwork')}>
            <View style={EarnInterest.telegramContainer}>
              <Icon name='TelegramIcon' width='24' height='24' viewBox="0 0 24 24" fill='#FFFFFF'/>
              <Text style={EarnInterest.telegramText}>Join us on Telegram</Text>
            </View>
          </TouchableOpacity>

        </Content>
      </Container>
    );
  }
}

export default ThankYouLenderScreen;
