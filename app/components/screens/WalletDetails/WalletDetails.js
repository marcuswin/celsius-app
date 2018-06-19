import React, { Component } from "react";
import { Text } from "react-native";
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
import formatter from "../../../utils/formatter";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";

@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    callsInProgress: state.api.callsInProgress,
    history: state.api.history,
    lastCompletedCall: state.api.lastCompletedCall,
    wallet: state.wallet,
    transactions: state.wallet.transactions,
    activeScreen: state.nav.routes[state.nav.index].routeName,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class WalletDetails extends Component {
  constructor() {
    super();

    this.state = {
      infoBubble: true,
    }
  }

  componentDidMount() {
    const { getCoinTransactions, navigation } = this.props;
    const currency = navigation.getParam('currency');

    getCoinTransactions(currency.toLowerCase());
  }

  onCloseInfo = () => this.setState({ infoBubble: false })

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

    console.log({
      transactionArray,
      transactionIds,
      transactions,
    })

    return transactionArray;
  }

  render() {
    const { navigateTo, navigation } = this.props;
    const currency = navigation.getParam('currency')
    const maxLoan = 4000; // todo
    const transactions = this.getTransactions();

    return (
      <BasicLayout bottomNavigation>
        <MainHeader
          onCancel={() => navigateTo('WalletLanding')}
        />
        <WalletDetailsHeading currency={currency} />
        <Message />
        <Content style={{ paddingLeft: 40, paddingRight: 40 }}>
          {this.state.infoBubble && <WalletInfoBubble
            title={`Deposit your ${currency}`}
            onPressClose={this.onCloseInfo}
          >
            <Text style={[globalStyles.normalText, { color: 'white' }]}>
              You can get a loan up to
              <Text style={[globalStyles.boldText, { color: 'white' }]}> {formatter.usd(maxLoan)} </Text>
              if you deposit your {currency} into your Celsius wallet.
            </Text>
          </WalletInfoBubble>}
          <TransactionsHistory transactions={transactions} />
          <CelButton margin={'40 0 70 0'} onPress={() => {this.props.navigateTo('EnterPasscode', { currency: currency.toLowerCase() })}}>Withdraw</CelButton>
        </Content>
      </BasicLayout>
    )
  }
}

export default WalletDetails;
