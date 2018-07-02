import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'native-base';
import { bindActionCreators } from "redux";
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

import Calculator from '../Calculator/Calculator'
import PortfolioStyle from "./styles";
import * as actions from "../../../redux/actions";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";

@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    portfolio: state.portfolio.portfolio,
    portfolioFormData: state.ui.portfolioFormData,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class ManagePorfolio extends Component {

  componentDidMount() {
    const portfolioData = this.getPortfolioData();
    const userHasPortfolio = this.getUserHasPortfolio();

    if (userHasPortfolio) {
      const portfolioFormData = get(this.props.portfolioFormData, 'data', portfolioData);
      this.props.updatePortfolioFormData(portfolioFormData);
    }
  }

  getPortfolioData = () => get(this.props.portfolio, 'data', []);

  getUserHasPortfolio = () => {
    const portfolioData = this.getPortfolioData();
    return !isEmpty(portfolioData);
  }

  render() {
    const {navigateBack} = this.props;
    const userHasPortfolio = this.getUserHasPortfolio();
    const animatedHeading = {
      text: userHasPortfolio ? "Your coins" : `Hola, ${ this.props.user && this.props.user.first_name ? this. props.user.first_name : 'Guest' }!`,
      subheading: userHasPortfolio ? "Manage your portfolio" : null
    };

    return (

        <SimpleLayout
          animatedHeading={animatedHeading}
          mainHeader={{ backButton: false, onCancel: userHasPortfolio ? navigateBack : null }}
        >
          <View style={{paddingTop: 30}}>
            {!userHasPortfolio &&
              <Text style={PortfolioStyle.subHeading}>
                So, what coins are you HODLing?
              </Text>
            }
            { userHasPortfolio ? (
              <Text style={PortfolioStyle.description}>
                Add, remove or change amount for the existing coins in your portfolio.
              </Text>
            ) : (
              <View>
                <Text style={PortfolioStyle.description2}>
                  Let us know which coins you like to HODL so we can help you track their value and tell you how much estimated interest you could earn as well as how big an estimated loan you could apply for in the future.
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

export default ManagePorfolio;
