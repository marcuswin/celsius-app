import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import WalletLayout from "../../layouts/WalletLayout/WalletLayout";
import TransactionsHistory from "../../molecules/TransactionHistory/TransactionsHistory";

@connect(
  state => ({
    transactions: state.wallet.transactions,
    currencyRatesShort: state.generalData.currencyRatesShort,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class WalletTransactions extends Component {
  // lifecycle methods
  componentDidMount() {
    const { actions } = this.props;
    actions.getAllTransactions();
  }

  componentWillReceiveProps(nextProps) {
    const { activeScreen, actions } = this.props;

    if (activeScreen !== nextProps.activeScreen && nextProps.activeScreen === 'WalletTransactions') {
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
  render() {
    const { currencyRatesShort, actions } = this.props;
    const transactions = this.getTransactions();

    return (
      <WalletLayout>
        <TransactionsHistory
          transactions={transactions}
          navigateTo={actions.navigateTo}
          currencyRatesShort={currencyRatesShort}
        />
      </WalletLayout>
    );
  }
}

export default WalletTransactions;
