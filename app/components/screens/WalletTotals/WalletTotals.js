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
    walletBalances: state.wallet.currencies,
    transactions: state.wallet.transactions,
    supportedCurrencies: state.generalData.supportedCurrencies,
    currencyRatesShort: state.generalData.currencyRatesShort,
    nav: state.nav,
    user: state.users.user,
    portfolio: state.portfolio.portfolio,
    activeScreen: state.nav.routes[state.nav.index].routeName,
  }),
  dispatch => bindActionCreators(actions, dispatch)
)
class WalletTotals extends Component {

  static Proptypes = {
    type: Proptypes.oneOf(["total", "single-coin"]),
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
    const { getWalletDetails, getAllTransactions } = this.props;
    getWalletDetails();
    getAllTransactions();
  }

  componentWillReceiveProps(nextProps) {
    const { activeScreen, getWalletDetails, getAllTransactions } = this.props;

    if (activeScreen !== nextProps.activeScreen && nextProps.activeScreen === 'WalletTotals') {
      getWalletDetails();
      getAllTransactions();
    }
  }

  // event hanlders
  getTransactions() {
    const { transactions } = this.props;
    if (!transactions) return [];

    const transactionIds = Object.keys(transactions);
    const transactionArray = [];
    transactionIds.forEach(tid => transactionArray.push(transactions[tid]));
    return transactionArray;
  }

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
              <Text style={[WalletTotalsStyle.cryptoAmount]}>{formatter.crypto(balance, short, { precision: 5 })}</Text>
            </View>
            <PricingChangeIndicator
              isPercentChangeNegative={percentage < 0}
              percentChange={percentage}
            />
        </ListItem>
      </List>
    );
  }


  render() {
    const { walletBalances, supportedCurrencies, navigateTo, currencyRatesShort } = this.props;
    const transactions = this.getTransactions();

    const ethereumTotal = this.renderBalance({
      balance: walletBalances.filter(b => b.currency.short === 'ETH')[0].amount,
      balanceUsd: walletBalances.filter(b => b.currency.short === 'ETH')[0].total,
      short: 'ETH',
      currency: 'ETHEREUM',
      percentage: supportedCurrencies.filter(sc => sc.short === 'ETH')[0].market.quotes.USD.percent_change_24h,
    });
    const bitcoinTotal = this.renderBalance({
      balance: walletBalances.filter(b => b.currency.short === 'BTC')[0].amount,
      balanceUsd: walletBalances.filter(b => b.currency.short === 'BTC')[0].total,
      short: 'BTC',
      currency: 'BITCOIN',
      percentage: supportedCurrencies.filter(sc => sc.short === 'BTC')[0].market.quotes.USD.percent_change_24h,
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

          { bitcoinTotal }
          { ethereumTotal }

          <View style={WalletTotalsStyle.history}>
            <TransactionHistory
              transactions={transactions}
              navigateTo={navigateTo}
              currencyRatesShort={currencyRatesShort}
            />
          </View>
        </Content>

      </BasicLayout>
    );
  }
}

export default WalletTotals;
