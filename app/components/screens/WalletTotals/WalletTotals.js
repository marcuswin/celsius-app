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
import formatter from "../../../utils/formatter";
import {FONT_SCALE} from "../../../config/constants/style";


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
    const fiatLetterSize = balanceUsd.toString().length >= 10 ? FONT_SCALE * 24 : FONT_SCALE * 30;

    return (
      <List style={WalletTotalsStyle.list}>
        <ListItem style={WalletTotalsStyle.listItem}>
            <View>
              <Text style={WalletTotalsStyle.name}>{short} - {currency}</Text>
              <Text style={[WalletTotalsStyle.fiatAmount, {fontSize: fiatLetterSize}]}>{formatter.usd(balanceUsd)}</Text>
              <Text style={[WalletTotalsStyle.cryptoAmount]}>{formatter.crypto(balance)} {short}</Text>
            </View>
            <PricingChangeIndicator
              isPercentChangeNegative={false}
              percentChange24h={percentage}
            />
        </ListItem>
      </List>
    );
  }


  render() {
    const { balance } = this.props;

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
        <MainHeader
          onCancel={() => this.props.navigateTo('WalletLanding')}
        />
        <WalletDetailsHeading
          type='total'
          currency='total'
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
