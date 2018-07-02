import React, { Component } from "react";
import { Text, View } from "react-native";
import { Content } from 'native-base';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import * as actions from "../../../redux/actions";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import { MainHeader } from "../../molecules/MainHeader/MainHeader";
import Message from "../../atoms/Message/Message";
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
    activeScreen: state.nav.routes[state.nav.index].routeName,
    currencyRatesShort: state.generalData.currencyRatesShort,
    supportedCurrencies: state.generalData.supportedCurrencies,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class WalletDetails extends Component {
  componentDidMount() {
    const { getCoinTransactions, navigation, getWalletDetails } = this.props;
    const currency = navigation.getParam('currency');

    getWalletDetails();
    getCoinTransactions(currency.toLowerCase());
  }

  componentWillReceiveProps(nextProps) {
    const { navigation, getCoinTransactions, getWalletDetails } = this.props;
    const oldCurrency = navigation.getParam('currency');
    const newCurrency = nextProps.navigation.getParam('currency');

    if (nextProps.activeScreen === 'WalletDetails' && newCurrency !== oldCurrency) {
      getCoinTransactions(newCurrency.toLowerCase());
      getWalletDetails();
    }
  }

  onCloseInfo = () => this.props.updateUserAppSettings({ showWalletDetailsInfoBox: false });

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
    const { navigateTo, navigation, currencyRatesShort, supportedCurrencies, appSettings } = this.props;
    const currency = navigation.getParam('currency').toLowerCase();
    const transactions = this.getTransactions();

    return (
      <BasicLayout bottomNavigation>
        <MainHeader
          onCancel={() => navigateTo('WalletLanding')}
        />
        <WalletDetailsHeading
          currency={currency}
        />
        <Message />
        <Content>
          <WalletDetailsGraphContainer
            currency={currency}
            supportedCurrencies={supportedCurrencies}
          />
          <View style={{ paddingLeft: 40, paddingRight: 40 }}>
            {appSettings.showWalletDetailsInfoBox && (
              <WalletInfoBubble
                title={`Deposit your ${currency}`}
                onPressClose={this.onCloseInfo}
              >
                <Text style={[globalStyles.normalText, { color: 'white' }]}>
                  Once you deposit at least $300 in ETH or BTC you'll be eligible for a loan of $100
                </Text>
              </WalletInfoBubble>
            )}
            <TransactionsHistory
              transactions={transactions}
              navigateTo={navigateTo}
              currencyRatesShort={currencyRatesShort}
              />

            { currency.amount && <CelButton margin={'40 0 70 0'} onPress={() => {this.props.navigateTo('EnterPasscode', { currency: currency.toLowerCase() })}}>Withdraw</CelButton> }
          </View>
        </Content>
      </BasicLayout>
    )
  }
}

export default WalletDetails;
