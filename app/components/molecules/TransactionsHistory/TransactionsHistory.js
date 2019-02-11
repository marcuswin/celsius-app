import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import moment from 'moment';

import testUtil from "../../../utils/test-util";

import TransactionsHistoryStyle from "./TransactionsHistory.styles";
import TransactionRow from '../../atoms/TransactionRow/TransactionRow';
import CelText from '../../atoms/CelText/CelText';
import Icon from '../../atoms/Icon/Icon';
import stylesUtil from '../../../utils/styles-util'

class TransactionsHistory extends Component {

  static propTypes = {
    transactions: PropTypes.instanceOf(Array),
    currencyRatesShort: PropTypes.instanceOf(Object).isRequired,
    navigateTo: PropTypes.func.isRequired,
    margin: PropTypes.string,
  };
  static defaultProps = {
    margin: '20 0 20 0'
  }

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { currencyRatesShort, transactions, navigateTo, margin } = this.props
    const style = TransactionsHistoryStyle()
    const margins = stylesUtil.getMargins(margin)

    const transactionsDisplay = transactions.map(t => ({
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
    }));

    return (
      <View style={[style.container, margins]}>
        <View style={style.filterContainer}>
          <View>
            <CelText bold type='H6'>Transaction history</CelText>
          </View>
          <View>
            <Icon name="Filter" width="16" height="16" />
          </View>
        </View>

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

      </View>
    );
  }
}

export default testUtil.hookComponent(TransactionsHistory);
