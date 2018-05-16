import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Text, View} from 'native-base';
import {bindActionCreators} from "redux";
import isEmpty from 'lodash/isEmpty';

import {MainHeader} from '../../../components/molecules/MainHeader/MainHeader';
import {AnimatedHeading} from '../../../components/molecules/AnimatedHeading/AnimatedHeading';
import Calculator from '../Calculator/Calculator'
import PortfolioStyle from "./styles";
import * as actions from "../../../redux/actions";
import BottomNavigation from "../../organisms/BottomNavigation/BottomNavigation";


@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    portfolio: state.portfolio.portfolio,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)


class ManagePorfolio extends Component {

  onScroll = event => {
    this.heading.animateHeading(event);
  };

  render() {
    const userHasPortfolio = !isEmpty(this.props.portfolio)
    return (
        <Container>
        <StatusBar barStyle="dark-content"/>
        <MainHeader
          cancelBtn={userHasPortfolio}
          onCancel={userHasPortfolio ? () => this.props.navigateTo('Home') : null}
        />
        <AnimatedHeading
          ref={(heading) => {
            this.heading = heading;
          }}
          backButton={false}
          text={userHasPortfolio ? "Your coins" : `Hola, ${ this.props.user && this.props.user.first_name ? this. props.user.first_name : 'Guest' }!`}
          subheading={userHasPortfolio ? "Manage your portfolio" : null}
          />
        <Content bounces={false} onScroll={this.onScroll} style={PortfolioStyle.content}>
          <View style={{paddingTop: 30}}>
            {!userHasPortfolio &&
              <Text style={PortfolioStyle.subHeading}>
                So, what coins are you HODLing?
              </Text>
            }
            <Text style={PortfolioStyle.description}>
              {userHasPortfolio ? "Add, remove or change amount for the existing coins in your portfolio." : "Let us know which coins you like to HODL so we can help you track their value and tell you how much estimated interest you could earn as well as how big an estimated loan you could apply for in the future."}
            </Text>
          </View>
          <Calculator {...this.props} userHasPortfolio={userHasPortfolio} />
        </Content>

          { userHasPortfolio ? <BottomNavigation/> : null }
      </Container>
    );
  }
}

export default ManagePorfolio;
