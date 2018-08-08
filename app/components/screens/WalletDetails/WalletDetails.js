import React, { Component } from "react";
import { Text, View } from "react-native";
import { Content } from 'native-base';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import * as appActions from "../../../redux/actions";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import { MainHeader } from "../../molecules/MainHeader/MainHeader";
import WalletDetailsHeading from "../../molecules/WalletDetailsHeading/WalletDetailsHeading";
import TransactionsHistory from "../../molecules/TransactionHistory/TransactionsHistory";
import CelButton from "../../atoms/CelButton/CelButton";
import WalletInfoBubble from "../../molecules/WalletInfoBubble/WalletInfoBubble";
import WalletDetailsGraphContainer from "../../molecules/WalletDetailsGraphContainer/WalletDetailsGraphContainer";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";

@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    appSettings: state.users.appSettings,
    callsInProgress: state.api.callsInProgress,
    history: state.api.history,
    lastCompletedCall: state.api.lastCompletedCall,
    transactions: state.wallet.transactions,
    walletCurrencies: state.wallet.currencies,
    activeScreen: state.nav.routes[state.nav.index].routeName,
    currencyRatesShort: state.generalData.currencyRatesShort,
    supportedCurrencies: state.generalData.supportedCurrencies,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class WalletDetails extends Component {
  componentDidMount() {
    const { actions, navigation } = this.props;
    const currency = navigation.getParam('currency');

    actions.getWalletDetails();
    actions.getCoinTransactions(currency.toLowerCase());
  }

  componentWillReceiveProps(nextProps) {
    const { navigation, actions } = this.props;
    const oldCurrency = navigation.getParam('currency');
    const newCurrency = nextProps.navigation.getParam('currency');

    if (nextProps.activeScreen === 'WalletDetails' && newCurrency !== oldCurrency) {
      actions.getCoinTransactions(newCurrency.toLowerCase());
      actions.getWalletDetails();
    }
  }

  onCloseInfo = () => this.props.actions.updateUserAppSettings({ showWalletDetailsInfoBox: false });

  onPressWithdraw = () => {
    const { actions, navigation } = this.props;
    const currency = navigation.getParam('currency').toLowerCase();

    actions.initForm({ currency });
    actions.navigateTo('WithdrawalInfo');
  }

  getTransactions() {
    const { transactions, navigation } = this.props;
    const currency = navigation.getParam('currency').toLowerCase();
    const transactionIds = Object.keys(transactions);
    const transactionArray = [];

    transactionIds.forEach(tid => {
      if (transactions[tid].coin === currency) {
        transactionArray.push(transactions[tid]);
      }
    })

    return transactionArray;
  }

  render() {
    const { walletCurrencies, actions, navigation, currencyRatesShort, supportedCurrencies, appSettings } = this.props;
    const currency = navigation.getParam('currency').toLowerCase();
    const transactions = this.getTransactions();
    const walletData = (walletCurrencies != null) && walletCurrencies.find(w => w.currency.short.toLowerCase() === currency);
    const isCelCurrency = currency === 'cel';
    const canWithdrawCrypto = !!Number(walletData.amount);

    return (
      <BasicLayout bottomNavigation>
        <MainHeader
          onCancel={() => actions.navigateTo('WalletLanding')}
        />
        <WalletDetailsHeading
          currency={currency}
        />
        <Content>
          { currency !== 'cel' && (
            <WalletDetailsGraphContainer
              currency={currency}
              supportedCurrencies={supportedCurrencies}
            />
          )}
          <View style={{ paddingLeft: 40, paddingRight: 40 }}>
            {appSettings.showWalletDetailsInfoBox && (
              <WalletInfoBubble
                title={isCelCurrency ? `Your CEL Price` : `Deposit your ${currency.toUpperCase()}`}
                onPressClose={this.onCloseInfo}
              >

                <Text style={[globalStyles.normalText, { color: 'white' }]}>
                  {isCelCurrency ?
                    `The price of CEL is currently set to the Crowdsale price of $.30 until the CEL token is listed on an official exchange.` :
                    `Once you deposit at least $300 in ETH or BTC you'll be eligible for a loan of $100`
                  }
                </Text>
              </WalletInfoBubble>
            )}

            { !!transactions.length && (
              <TransactionsHistory
                transactions={transactions}
                navigateTo={actions.navigateTo}
                currencyRatesShort={currencyRatesShort}
              />
            )}

            { canWithdrawCrypto && (
              <CelButton
                margin={'40 0 70 0'}
                onPress={this.onPressWithdraw}
              >
                Withdraw
              </CelButton>
            )}
          </View>
        </Content>
      </BasicLayout>
    )
  }
}

export default WalletDetails;
