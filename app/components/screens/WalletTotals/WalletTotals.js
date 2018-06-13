import React, { Component } from "react";
import { View, Text } from "react-native";
import { List, ListItem, Content } from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Proptypes from "prop-types";
import get from "lodash/get";

import * as actions from "../../../redux/actions";
import WalletTotalsStyle from "./WalletTotals.styles";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import WalletDetailsHeading from "../../molecules/WalletDetailsHeading/WalletDetailsHeading";
import { MainHeader } from "../../molecules/MainHeader/MainHeader";
import PricingChangeIndicator from "../../molecules/PricingChangeIndicator/PricingChangeIndicator";
import TransactionHistory from "../../molecules/TransactionHistory/TransactionsHistory";


@connect(
  state => ({
    balance: state.wallet.balance,
    nav: state.nav,
    user: state.users.user,
    portfolio: state.portfolio.portfolio
  }),
  dispatch => bindActionCreators(actions, dispatch)
)
class WalletTotals extends Component {

  static Proptypes = {
    type: Proptypes.oneOfType(["total", "single-coin"]),
    onPressPrevious: Proptypes.func,
    onPressNext: Proptypes.func
  };

  static defaultProps = {
    type: "total"
  };

  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };
    // binders
  }

  // lifecycle methods
  componentDidMount() {
    const { getWalletDetails } = this.props;
    getWalletDetails();
  }

  // event hanlders
  // rendering methods

  renderList() {
    const { portfolio, balance } = this.props;
    const percentChange24h = get(portfolio, "meta.quotes.USD.percent_change_24h", 0);
    const isPercentChangeNegative = percentChange24h < 0;
    // const portfolioData = get(portfolio, "data", []);

    return (
      <List style={WalletTotalsStyle.list}>
        <ListItem style={WalletTotalsStyle.listItem}>
          <View style={WalletTotalsStyle.coinInfo}>
            <View style={WalletTotalsStyle.coinAmount}>
              <Text style={WalletTotalsStyle.name}>ETH - ETHEREUM</Text>
              <Text style={WalletTotalsStyle.fiatAmount}>${balance.totalUsd}</Text>
              <Text style={WalletTotalsStyle.cryptoAmount}>{balance.eth} ETH</Text>
            </View>
            <View style={WalletTotalsStyle.coinPercentage}>
              <PricingChangeIndicator
                isPercentChangeNegative={isPercentChangeNegative}
                percentChange24h={percentChange24h}
              />
            </View>
          </View>
        </ListItem>
      </List>

    );
  };

  render() {
    const { type } = this.props;

    // const totalValue = get(portfolio, "meta.quotes.USD.total", 0);

    return (
      <BasicLayout
        bottomNavigation
      >
        <MainHeader onCancel={console.log()}/>
        <WalletDetailsHeading
          type={type}

        />

        <Content>
          {this.renderList()}
          <View style={WalletTotalsStyle.history}>
            <TransactionHistory/>
          </View>
        </Content>

       </BasicLayout>
    );
  }
}

export default WalletTotals;
