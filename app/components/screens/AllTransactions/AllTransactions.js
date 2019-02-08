import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import AllTransactionsStyle from "./AllTransactions.styles";
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import TransactionsHistory from '../../molecules/TransactionsHistory/TransactionsHistory';

@connect(
  state => ({
    style: AllTransactionsStyle(),
    transactions: state.wallet.transactions,
    currencyRatesShort: state.generalData.currencyRatesShort
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class AllTransactions extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      header: {
        title: "Transaction history",
        left: "back",
        right: "profile"
      }
    };
  }

  getTransactions() {
    const { transactions } = this.props;
    if (!transactions) return [];

    const transactionIds = Object.keys(transactions);
    const transactionArray = [];
    transactionIds.forEach(tid => transactionArray.push(transactions[tid]));
    return transactionArray;
  }

  render() {
    const { actions, currencyRatesShort } = this.props
    const { header } = this.state;
    const transactions = this.getTransactions();

    return (
      <RegularLayout header={header} >
        <View style={{ width: '100%' }}>
          <TransactionsHistory showAll transactions={transactions} currencyRatesShort={currencyRatesShort} navigateTo={actions.navigateTo} />
        </View>
      </RegularLayout>
    )
  }
}

export default testUtil.hookComponent(AllTransactions);
