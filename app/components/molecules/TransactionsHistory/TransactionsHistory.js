import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import moment from 'moment';

import testUtil from "../../../utils/test-util";

import TransactionsHistoryStyle from "./TransactionsHistory.styles";
import TransactionRow from '../../atoms/TransactionRow/TransactionRow';
import CelButton from '../../atoms/CelButton/CelButton';
import CelText from '../../atoms/CelText/CelText';
import Icon from '../../atoms/Icon/Icon';

class TransactionsHistory extends Component {

  static propTypes = {
    showAll: PropTypes.bool,
    transactions: PropTypes.instanceOf(Object).isRequired,
    // currencyRatesShort: PropTypes.instanceOf(Array).isRequired,
    navigateTo: PropTypes.func.isRequired
  };
  static defaultProps = {
    showAll: false
  }

  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };

    // binders
  }

  render() {
    const { currencyRatesShort, transactions, navigateTo, showAll } = this.props
    const style = TransactionsHistoryStyle()

    const orderedTransactionsByDate = transactions.sort((a, b) => {
      const date1 = moment(a.time)
      const date2 = moment(b.time)

      if (date1.isAfter(date2)) {
        return -1;
      }
      if (date1.isBefore(date2)) {
        return 1;
      }

      return 0;
    });

    let transactionsDisplay = currencyRatesShort ? orderedTransactionsByDate.map(t => ({
      id: t.id,
      amount: t.amount,
      amount_usd: t.amount_usd ? t.amount_usd : t.amount * currencyRatesShort[t.coin],
      nature: t.nature,
      interest_coin: t.interest_coin,
      coin: t.coin,
      time: moment(t.time).isSame(moment(), 'day') ? moment(t.time).format('HH:mm') : moment(t.time).format('DD MMM YYYY'),
      status: t.is_confirmed ? t.type : 'pending',
      type: t.type,
      transfer_data: t.transfer_data,
    })).filter(t => !(t.nature.includes('transfer') && !t.transfer_data)) : [];

    if (transactions.length > 5 && !showAll) transactionsDisplay = transactionsDisplay.slice(0, 5);

    return (
      <View style={style.container}>
        {!showAll ?
          <View style={style.filterContainer}>
            <View>
              <CelText bold type='H6'>Transaction history</CelText>
            </View>
            <View>
              <Icon name="Filter" width="16" height="16" />
            </View>
          </View> :
          <View style={style.filterIcon}>
            <Icon name="Filter" width="16" height="16" />
          </View>
        }
        <FlatList
          data={transactionsDisplay}
          renderItem={({ item }) =>
            <TransactionRow
              transaction={item}
              onPress={() => navigateTo('TransactionDetails', { id: item.id })}
            />
          }
          keyExtractor={(item) => item.id}
        />
        {currencyRatesShort && orderedTransactionsByDate.length > 5 && !showAll ?
          <CelButton basic onPress={() => navigateTo('AllTransactions')}>See all</CelButton>
          : null
        }
      </View>
    );
  }
}

export default testUtil.hookComponent(TransactionsHistory);
