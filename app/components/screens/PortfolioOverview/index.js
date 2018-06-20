import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, List, Body, ListItem, Content } from 'native-base';
import { bindActionCreators } from "redux";
import get from 'lodash/get';

import TotalCoinsHeader from '../../molecules/TotalCoinsHeader/TotalCoinsHeader';
import PricingChangeIndicator from "../../molecules/PricingChangeIndicator/PricingChangeIndicator";
import CoinCard from "../../molecules/CoinCard/CoinCard";
import CelButton from "../../atoms/CelButton/CelButton";
import * as actions from "../../../redux/actions";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";


@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    portfolio: state.portfolio.portfolio,
    supportedCurrencies: state.generalData.supportedCurrencies,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class PortfolioScreen extends Component {

  componentDidMount() {
    const { getSupportedCurrencies } = this.props;
    getSupportedCurrencies();
  }

  render() {
    const { navigateTo, portfolio, supportedCurrencies } = this.props;
    const animatedHeading = {
      text: 'Portfolio',
      subheading: "Track your coins",
    };

    const mainHeader = {
      backButton: false,
    };

    const totalValue = get(portfolio, 'meta.quotes.USD.total', 0);
    const percentChange24h = get(portfolio, 'meta.quotes.USD.percent_change_24h', 0);
    const isPercentChangeNegative = percentChange24h < 0;
    const portfolioData = get(portfolio, 'data', []);

    return (
      <SimpleLayout animatedHeading={animatedHeading} mainHeader={mainHeader} contentSidePadding={0}>
        <Content bounces={false} style={{marginTop: -10}}>
          {totalValue !== 0 &&
            <TotalCoinsHeader totalValue={totalValue} >
              <PricingChangeIndicator
                isPercentChangeNegative={isPercentChangeNegative}
                percentChange24h={percentChange24h}
              />
            </TotalCoinsHeader>
          }
          <View style={{paddingLeft: 36, paddingRight: 36}}>
            <View>
              <List
                dataArray={portfolioData}
                scrollEnabled={false}
                renderRow={(item) =>
                  <ListItem style={{marginLeft: 0, marginRight: 0, paddingRight: 0, borderBottomWidth: 0}}>
                    <Body>
                    <CoinCard
                      supportedCurrencies={supportedCurrencies}
                      {...item}
                      />
                    </Body>
                  </ListItem>
                }/>
            </View>
            <View style={{marginTop: 30, marginBottom: 40}}>
              <CelButton
                onPress={() => navigateTo('ManagePortfolio')}
              >
                Manage your coins
              </CelButton>
            </View>
          </View>
        </Content>
      </SimpleLayout>
    );
  }
}

export default PortfolioScreen;
