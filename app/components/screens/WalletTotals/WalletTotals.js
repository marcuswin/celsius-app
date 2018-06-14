import React, { Component } from "react";
import { View, Text } from "react-native";
import { List, ListItem, Content } from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Proptypes from "prop-types";

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
  renderBalance(coinData) {
    const { balance, balanceUsd, short, currency, percentage } = coinData;

    return (
      <List style={WalletTotalsStyle.list}>
        <ListItem style={WalletTotalsStyle.listItem}>
          <View style={WalletTotalsStyle.coinInfo}>
            <View style={WalletTotalsStyle.coinAmount}>
              <Text style={WalletTotalsStyle.name}>{short} - {currency}</Text>
              <Text style={WalletTotalsStyle.fiatAmount}>${balanceUsd}</Text>
              <Text style={WalletTotalsStyle.cryptoAmount}>{balance} {short}</Text>
            </View>
            <View style={WalletTotalsStyle.coinPercentage}>
              <PricingChangeIndicator
                isPercentChangeNegative={false}
                percentChange24h={percentage}
              />
            </View>
          </View>
        </ListItem>
      </List>
    );
  }


  render() {
    const { type, balance } = this.props;

    const ethereum = this.renderBalance({
      balance: balance.eth,
      balanceUsd: balance.ethUsd,
      short: "ETH",
      currency: "ETHEREUM",
      percentage: 15
    });
    const bitcoin = this.renderBalance({
      balance: balance.btc,
      balanceUsd: balance.btcUsd,
      short: "BTC",
      currency: "BITCOIN",
      percentage: -5
    });

    return (
      <BasicLayout
        bottomNavigation
      >
        <MainHeader onCancel={console.log()}/>
        <WalletDetailsHeading
          type={type}
        />

        <Content>

          {ethereum}
          {bitcoin}

          <View style={WalletTotalsStyle.history}>
            <TransactionHistory/>
          </View>
        </Content>

      </BasicLayout>
    );
  }
}

export default WalletTotals;
