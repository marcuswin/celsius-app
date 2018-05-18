import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Text, View } from 'native-base';
import { bindActionCreators } from "redux";
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

import { Message } from '../../atoms/Message/Message';
import { MainHeader } from '../../../components/molecules/MainHeader/MainHeader';
import Calculator from '../Calculator/Calculator'
import PortfolioStyle from "./styles";
import * as actions from "../../../redux/actions";
import BottomNavigation from "../../organisms/BottomNavigation/BottomNavigation";
import CelHeading from "../../atoms/CelHeading/CelHeading";


@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    portfolio: state.portfolio.portfolio,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)


class ManagePorfolio extends Component {
  render() {
    const portfolioData = get(this.props.portfolio, 'data', []);
    const userHasPortfolio = !isEmpty(portfolioData);
    return (
      <Container>
        <MainHeader
          cancelBtn={userHasPortfolio}
          onCancel={userHasPortfolio ? () => this.props.navigateTo('Home') : null}
        />
        <CelHeading
          text={userHasPortfolio ? "Your coins" : `Hola, ${ this.props.user && this.props.user.first_name ? this. props.user.first_name : 'Guest' }!`}
          subheading={userHasPortfolio ? "Manage your portfolio" : null}
          />
        <Message/>
        <Content bounces={false} style={PortfolioStyle.content}>
          <View style={{paddingTop: 30}}>
            {!userHasPortfolio &&
              <Text style={PortfolioStyle.subHeading}>
                So, what coins are you HODLing?
              </Text>
            }
            <Text style={PortfolioStyle.description}>
              {userHasPortfolio ? "Add, remove or change amount for the existing coins in your portfolio." : "Let us know which coins you like to HODL so we can help you track their value and tell you how much estimated interest you could earn as well as how big an estimated loan you could apply for in the future.\n" + '\n' + "Please add at least one coin in order to proceed." }
            </Text>
          </View>
          <Calculator {...this.props} userHasPortfolio={userHasPortfolio} />
        </Content>
        {userHasPortfolio ? <BottomNavigation/> : null}
      </Container>
    );
  }
}

export default ManagePorfolio;
