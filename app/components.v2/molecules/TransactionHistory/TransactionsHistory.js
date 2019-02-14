// TODO(fj): check new designs

import React, { Component } from "react";
import moment from "moment";
import { View } from "react-native";
// import { List } from 'native-base';
import TransactionRow from "../../atoms/TransactionRow/TransactionRow";
import CelButton from "../../atoms/CelButton/CelButton";

class TransactionsHistory extends Component {
  constructor() {
    super();
    this.state = { showAll: false }
  }

  render() {
    const { currencyRatesShort, transactions, navigateTo } = this.props;
    const { showAll } = this.state;

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

    let transactionsDisplay = orderedTransactionsByDate.map(t => ({
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
    })).filter(t => !(t.nature.includes('transfer') && !t.transfer_data))

    const totalTransactions = transactionsDisplay.length;

    if (!showAll) {
      transactionsDisplay = transactionsDisplay.slice(0,5);
    }

    return (
      <View>
        <List
          dataArray={transactionsDisplay}
          scrollEnabled={false}
          style={{marginBottom: 15}}
          renderRow={(item) =>
            <TransactionRow
              transaction={item}
              onPress={() => navigateTo('TransactionDetails', { id: item.id })}
            />
          }/>

        <CelButton
          onPress={() => this.setState({ showAll: !showAll })}
          transparent
          color="blue"
          inverse
        >
          { showAll && totalTransactions > 5 ? 'Show less' : 'Show all' }
        </CelButton>
      </View>
    )
  }
}


export default TransactionsHistory;
