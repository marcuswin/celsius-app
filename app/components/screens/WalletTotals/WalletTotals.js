import React, { Component } from "react";
import { View, Text } from "react-native";
import { List, ListItem, Content } from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Proptypes from "prop-types";

import * as appActions from "../../../redux/actions";
import WalletTotalsStyle from "./WalletTotals.styles";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import WalletDetailsHeading from "../../molecules/WalletDetailsHeading/WalletDetailsHeading";
import { MainHeader } from "../../molecules/MainHeader/MainHeader";
import PricingChangeIndicator from "../../molecules/PricingChangeIndicator/PricingChangeIndicator";
import TransactionHistory from "../../molecules/TransactionHistory/TransactionsHistory";
import formatter from "../../../utils/formatter";
import {FONT_SCALE} from "../../../config/constants/style";
import { ELIGIBLE_COINS } from "../../../config/constants/common";

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
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class WalletTotals extends Component {
  static propTypes = {
    type: Proptypes.oneOf(["total", "single-coin"]),
    onPressPrevious: Proptypes.func,
    onPressNext: Proptypes.func
  };

  static defaultProps = {
    type: "total"
  };

  // lifecycle methods
  componentDidMount() {
    const { actions } = this.props;
    actions.getWalletDetails();
    actions.getAllTransactions();
  }

  componentWillReceiveProps(nextProps) {
    const { activeScreen, actions } = this.props;

    if (activeScreen !== nextProps.activeScreen && nextProps.activeScreen === 'WalletTotals') {
      actions.getWalletDetails();
      actions.getAllTransactions();
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
  renderBalanceSection = (short) => {
    const { walletBalances, supportedCurrencies } = this.props;

    const balance = walletBalances.filter(b => b.currency.short === short)[0].amount;
    const balanceUsd = walletBalances.filter(b => b.currency.short === short)[0].total;
    const currency = supportedCurrencies.filter(sc => sc.short === short)[0].name.toUpperCase();
    const percentage = supportedCurrencies.filter(sc => sc.short === short)[0].market.price_change_usd['1d'];

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
    const { actions, currencyRatesShort } = this.props;
    const transactions = this.getTransactions();

    return (
      <BasicLayout
        bottomNavigation
      >
        <MainHeader
          onCancel={() => actions.navigateTo('Home')}
        />
        <WalletDetailsHeading
          type='total'
          currency='total'
        />

        <Content>

          { ELIGIBLE_COINS.map(this.renderBalanceSection) }

          <View style={WalletTotalsStyle.history}>
            <TransactionHistory
              transactions={transactions}
              navigateTo={actions.navigateTo}
              currencyRatesShort={currencyRatesShort}
            />
          </View>
        </Content>

      </BasicLayout>
    );
  }
}

export default WalletTotals;
