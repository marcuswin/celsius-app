import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import AllTransactionsStyle from "./AllTransactions.styles";
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import TransactionsHistory from '../../molecules/TransactionsHistory/TransactionsHistory';
import transactionsUtil from "../../../utils/transactions-util";
import API from '../../../constants/API';
import apiUtil from '../../../utils/api-util';
import LoadingState from '../../atoms/LoadingState/LoadingState';

@connect(
  state => ({
    transactions: state.transactions.transactionList,
    currencyRatesShort: state.currencies.currencyRatesShort,
    callsInProgress: state.api.callsInProgress
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class AllTransactions extends Component {
  static propTypes = {};
  static defaultProps = {}

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

  componentDidMount() {
    const { actions } = this.props
    actions.getAllTransactions();
  }

  render() {
    const { actions, currencyRatesShort, transactions, callsInProgress } = this.props
    const { header } = this.state;
    const transactionsArray = transactionsUtil.filterTransactions(transactions);
    const loadingTransactions = apiUtil.areCallsInProgress([API.GET_ALL_TRANSACTIONS], callsInProgress);
    const style = AllTransactionsStyle();

    return (
      <RegularLayout header={header}>
        <View style={style.container}>
          {loadingTransactions ?
            <LoadingState />
            : <TransactionsHistory
              transactions={transactionsArray}
              currencyRatesShort={currencyRatesShort}
              navigateTo={actions.navigateTo}
            />
          }
        </View>
      </RegularLayout>
    )
  }
}

export default testUtil.hookComponent(AllTransactions);
