import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Text, View} from 'native-base';
import {bindActionCreators} from "redux";

import {MainHeader} from '../../../components/molecules/MainHeader/MainHeader';
import {AnimatedHeading} from '../../../components/molecules/AnimatedHeading/AnimatedHeading';
import Calculator from '../Calculator/Calculator'
import PortfolioStyle from "./styles";
import * as actions from "../../../redux/actions";

@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)


class ManagePorfolio extends Component {
  constructor(props) {
    super();

    this.state = {
      headingTitle: `Hola, ${ props.user && props.user.first_name ? props.user.first_name : 'Guest' }!`
    };
  }

  onScroll = event => {
    this.heading.animateHeading(event);
  };

  render() {

    return (
      <Container>
        <StatusBar barStyle="dark-content"/>
        <MainHeader {...this.props} />
        <AnimatedHeading
          ref={(heading) => {
            this.heading = heading;
          }}
          subheading="Manage your porfolio"
          text="Your Coins" />
        <Content bounces={false} style={PortfolioStyle.content} onScroll={this.onScroll}>
          <View style={{paddingTop: 30}}>
            <Text style={PortfolioStyle.subHeading}>
              Tell us about your coins
            </Text>
            <Text style={PortfolioStyle.description}>
              Let us know which coins you currently possess. We’ll help you track their value and provide you with an idea about taking a loan and earning interest with Celsius.
            </Text>
          </View>
          <View>
            <Calculator />
          </View>
        </Content>
      </Container>
    );
  }
}

export default ManagePorfolio;