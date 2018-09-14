import React from "react";
import moment from "moment";
import { View, Text, TouchableOpacity } from "react-native";
import { List, ListItem } from 'native-base';
import { Grid, Col } from "react-native-easy-grid";
import formatter from "../../../utils/formatter";
import Icon from "../../atoms/Icon/Icon";

import { STYLES } from "../../../config/constants/style";
import TransactionsHistoryStyles from "./TransactionsHistory.styles";

const colors = {
  pending: STYLES.YELLOW,
  incoming: STYLES.PRIMARY_GREEN,
  outgoing: STYLES.PRIMARY_RED,
  blue: STYLES.PRIMARY_BLUE,
}

const statusText = {
  "pending": 'In progress',
  "incoming": 'Received',
  "outgoing": 'Withdrawn',
}

const getTransactionStatusText = (transaction) => {
  if (transaction.nature === 'interest') {
    return `${transaction.interest_coin.toUpperCase()} Interest`;
  }

  if (transaction.nature === 'collateral') {
    return 'Loan Collateral';
  }

  return statusText[transaction.status];
};

const getTransactionStatusColor = (transaction) => {
  if (transaction.nature === 'interest' || transaction.nature === 'collateral') {
    return colors.blue;
  }

  return colors[transaction.status];
};

const TransactionIcon = ({ transaction }) => {
  let element;

  if (transaction.type === 'outgoing') {
    element = (
      <Icon
        name='SentArrow' height='36'
        width='36' viewBox="0 0 36 36"
        fill={colors[transaction.status]}
        stroke='white'
      />
    );
  }
  if (transaction.status === 'incoming' && transaction.nature !== 'interest') {
    element = (
      <Icon
        name='ReceiveArrow'
        height='36'
        width='36'
        viewBox="0 0 36 36"
        fill={colors[transaction.status]}
        stroke='white'
      />
    )
  }
  if (transaction.nature === 'interest') {
    element = (
      <View style={[TransactionsHistoryStyles.iconWrapper, { paddingLeft: 3 }]}>
        <Icon
          name='InterestIcon'
          height='24'
          width='24'
          viewBox="0 0 30 15"
          fill={STYLES.WHITE_TEXT_COLOR}
        />
      </View>
    );
  }

  if (transaction.nature === 'collateral') {
    element = (
      <View style={[TransactionsHistoryStyles.iconWrapper, { paddingLeft: 1 }]}>
        <Icon
          name='Lock'
          width='14'
          height='16'
          fill={STYLES.WHITE_TEXT_COLOR}
        />
      </View>
    );
  }

  return element;
}

const TransactionsHistory = (props) => {
  const { currencyRatesShort, transactions, navigateTo } = props;

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

  const transactionsDisplay = orderedTransactionsByDate.map(t => ({
    id: t.id,
    amount: t.amount,
    amount_usd: t.amount_usd ? t.amount_usd : t.amount * currencyRatesShort[t.coin],
    nature: t.nature,
    interest_coin: t.interest_coin,
    coin: t.coin,
    time: moment(t.time).isSame(moment(), 'day') ? moment(t.time).format('HH:mm') : moment(t.time).format('DD MMM YYYY'),
    status: t.is_confirmed ? t.type : 'pending',
    type: t.type,
  }))


  return (
    <View>
      <List
        dataArray={transactionsDisplay}
        scrollEnabled={false}
        style={{marginBottom: 30}}
        renderRow={(item) =>
          <ListItem style={TransactionsHistoryStyles.listItem}>
            <TouchableOpacity style={{width: '100%'}} onPress={() => navigateTo('TransactionDetails', { id: item.id } )}>
              <Grid style={{paddingLeft: 0, marginLeft: 0}}>
                <Col size={70} style={{paddingLeft: 0, marginLeft: 0}}>
                  <Col style={{ width: 40, position: "absolute" }}>
                   <TransactionIcon transaction={item} />
                  </Col>
                  <Col style={{paddingLeft: 40}}>
                    <Text style={TransactionsHistoryStyles.usdAmount}>{formatter.usd(item.amount_usd)}</Text>
                    <Text style={TransactionsHistoryStyles.coinAmount}>{formatter.crypto(item.amount, item.coin.toUpperCase(), { precision: 5 })}</Text>
                  </Col>
                </Col>
                <Col size={50}>
                  <View style={{display: 'flex', alignSelf: 'flex-end'}}>
                    <Text style={[TransactionsHistoryStyles.time, { alignSelf: 'flex-end' }]}>{item.time}</Text>
                    <Text
                      style={[TransactionsHistoryStyles.status, {color: getTransactionStatusColor(item)}]}>
                      {getTransactionStatusText(item)}
                    </Text>
                  </View>
                </Col>
              </Grid>
            </TouchableOpacity>
          </ListItem>
        }/>
    </View>
  )
}


export default TransactionsHistory;
