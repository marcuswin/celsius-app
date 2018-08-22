import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'native-base';
import { bindActionCreators } from "redux";
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

import Calculator from '../Calculator/Calculator'
import PortfolioStyle from "./ManagePortfolio.styles";
import * as appActions from "../../../redux/actions";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";

@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    portfolio: state.portfolio.portfolio,
    portfolioFormData: state.ui.portfolioFormData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class ManagePortfolio extends Component {
  componentDidMount() {
    const {portfolioFormData, actions} = this.props;
    const portfolioData = this.getPortfolioData();
    const userHasPortfolio = this.getUserHasPortfolio();

    if (userHasPortfolio) {
      const newPortfolioFormData = get(portfolioFormData, 'data', portfolioData);
      actions.updatePortfolioFormData(newPortfolioFormData);
    }
  }

  getPortfolioData = () => get(this.props.portfolio, 'data', []);

  getUserHasPortfolio = () => {
    const portfolioData = this.getPortfolioData();
    return !isEmpty(portfolioData);
  }

  render() {
    const { user } = this.props;

    const userHasPortfolio = this.getUserHasPortfolio();
    const animatedHeading = {
      text: userHasPortfolio ? "Your coins" : `Hola, ${ user && user.first_name ? user.first_name : 'Guest' }!`,
      subheading: userHasPortfolio ? "Manage your tracker" : null
    };

    const mainHeader = {
      backButton: false,
      rightLink: { screen: 'Portfolio', text: 'Done'},
    }

    return (
        <SimpleLayout
          animatedHeading={animatedHeading}
          mainHeader={mainHeader}
        >
          <View style={{paddingTop: 30}}>
            {!userHasPortfolio &&
              <Text style={PortfolioStyle.subHeading}>
                Track your coins
              </Text>
            }
            { userHasPortfolio ? (
              <Text style={PortfolioStyle.description}>
                Add, remove or change amount for the existing coins in your tracker.
              </Text>
            ) : (
              <View>
                <Text style={PortfolioStyle.description2}>
                  Add your portfolio coins so you can track the market, and get an overview of your assets.
                </Text>
                <Text style={PortfolioStyle.description}>
                  Please add at least one coin in order to proceed.
                </Text>
              </View>
            )}
          </View>
          <Calculator {...this.props} userHasPortfolio={userHasPortfolio} />
        </SimpleLayout>
    );
  }
}

export default ManagePortfolio;
