import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, List, Body, ListItem } from 'native-base';
import { bindActionCreators } from "redux";
import get from 'lodash/get';

import TotalCoinsHeader from '../../molecules/TotalCoinsHeader/TotalCoinsHeader';
import PricingChangeIndicator from "../../molecules/PricingChangeIndicator/PricingChangeIndicator";
import CoinCard from "../../molecules/CoinCard/CoinCard";
import CelButton from "../../atoms/CelButton/CelButton";
import * as appActions from "../../../redux/actions";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";

@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    portfolio: state.portfolio.portfolio,
    supportedCurrencies: state.generalData.supportedCurrencies,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)

class PortfolioScreen extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.getSupportedCurrencies();
  }

  render() {
    const { actions, portfolio, supportedCurrencies } = this.props;
    const animatedHeading = {
      text: 'Track Coins',
      subheading: 'Your coins watchlist',
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
        <View>
          {totalValue !== 0 &&
            <TotalCoinsHeader totalValue={totalValue} >
              <PricingChangeIndicator
                isPercentChangeNegative={isPercentChangeNegative}
                percentChange={percentChange24h}
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
                onPress={() => actions.navigateTo('ManagePortfolio')}
              >
                Manage coins
              </CelButton>
            </View>
          </View>
        </View>
      </SimpleLayout>
    );
  }
}

export default PortfolioScreen;
