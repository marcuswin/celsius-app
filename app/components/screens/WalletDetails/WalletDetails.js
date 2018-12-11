import React, { Component } from "react";
import { Text, View } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import testUtil from "../../../utils/test-util";

import * as appActions from "../../../redux/actions";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import { MainHeader } from "../../molecules/MainHeader/MainHeader";
import WalletDetailsHeading from "../../molecules/WalletDetailsHeading/WalletDetailsHeading";
import TransactionsHistory from "../../molecules/TransactionHistory/TransactionsHistory";
import CelButton from "../../atoms/CelButton/CelButton";
import WalletDetailsGraphContainer from "../../molecules/WalletDetailsGraphContainer/WalletDetailsGraphContainer";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import CelScreenContent from "../../atoms/CelScreenContent/CelScreenContent";
import InfoBubble from "../../atoms/InfoBubble/InfoBubble";

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
  onCloseBCHInfo = () => this.props.actions.updateUserAppSettings({ showBchExplanationInfoBox: false });

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
      const transaction = transactions[tid];
      if (transaction.coin === currency || transaction.interest_coin === currency) {
        transactionArray.push(transaction);
      }
    });

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
          ref={testUtil.generateTestHook(this, 'WalletDetails.iks')}
          onCancel={() => actions.navigateTo('Home')}
        />
        <WalletDetailsHeading
          currency={currency}
        />
        <CelScreenContent padding='0 0 0 0'>
          {currency !== 'cel' && (
            <WalletDetailsGraphContainer
              currency={currency}
              supportedCurrencies={supportedCurrencies}
            />
          )}
          <View style={{ paddingLeft: 40, paddingRight: 40 }}>
            {(appSettings.showBchExplanationInfoBox && currency === "bch") && (
              <InfoBubble
                title={"Add more BCH-ABC."}
                shouldClose
                onPressClose={this.onCloseBCHInfo}
                color={"gray"}
                renderContent={() => (
                  <View>
                    <Text style={[globalStyles.normalText, { color: 'white' }]}>
                      {"The BCH deposited before November 14th at 11:40PM EST is now BCH-ABC. You will receive your BCH-SV once BitGo Supports it."}
                    </Text>
                    <Text style={[globalStyles.normalText, { color: 'white', marginTop: 10 }]}>
                      {"Use the address below to deposit BCH-ABC to your Celsius wallet."}
                    </Text>
                  </View>
                )}
              />
            )}
            {appSettings.showWalletDetailsInfoBox && isCelCurrency && (
              <InfoBubble
                title={`Your CEL Price`}
                shouldClose
                onPressClose={this.onCloseInfo}
                color={"gray"}
                margin={"22 0 25 0"}
                renderContent={() => (
                  <View>
                    <Text style={[globalStyles.normalText, { color: 'white' }]}>
                      The price of CEL is currently set to the Crowdsale price of $.30 until the CEL token is listed on an official exchange.
                </Text>
                  </View>
                )}
              />
            )}

            {!!transactions.length && (
              <TransactionsHistory
                transactions={transactions}
                navigateTo={actions.navigateTo}
                currencyRatesShort={currencyRatesShort}
              />
            )}

            {canWithdrawCrypto && (
              <CelButton
                ref={testUtil.generateTestHook(this, 'WalletDetails.withdraw')}
                margin={'40 0 0 0'}
                onPress={this.onPressWithdraw}
              >
                Withdraw
              </CelButton>
            )}
          </View>
        </CelScreenContent>
      </BasicLayout>
    )
  }
}

export default testUtil.hookComponent(WalletDetails);

