import React from "react";
import moment from "moment";
import { View, Text, TouchableOpacity } from "react-native";
import { List, ListItem } from 'native-base';
import { Grid, Col } from "react-native-easy-grid";
// import Link from "../../atoms/Link/Link";
import formatter from "../../../utils/formatter";
import Icon from "../../atoms/Icon/Icon";

import { STYLES } from "../../../config/constants/style";
import TransactionsHistoryStyles from "./TransactionsHistory.styles";

const colors = {
  "pending": STYLES.YELLOW,
  "incoming": STYLES.PRIMARY_GREEN,
  "outgoing": STYLES.PRIMARY_RED,
}

const statusText = {
  "pending": 'In progress',
  "incoming": 'Received',
  "outgoing": 'Withdrawn',
}

const TransactionsHistory = (props) => {
  const displayTransactions = props.transactions.map(t => ({
    id: t.id,
    amount: t.amount,
    amount_usd: t.amount_usd,
    coin: t.coin,
    time: moment(t.time).format('DD MMM YYYY'),
    status: t.is_confirmed ? t.type : 'pending',
    type: t.type,
  }))
  return (
    <View>
      <Text style={TransactionsHistoryStyles.title}>Transaction History</Text>
      <List
        dataArray={displayTransactions}
        scrollEnabled={false}
        style={{marginBottom: 30}}
        renderRow={(item) =>
          <ListItem style={TransactionsHistoryStyles.listItem}>
            <TouchableOpacity style={{width: '100%'}} onPress={() => props.navigateTo('TransactionDetails', { id: item.id } )}>
              <Grid style={{paddingLeft: 0, marginLeft: 0}}>
                <Col size={70} style={{paddingLeft: 0, marginLeft: 0}}>
                  <Col style={{ width: 40, position: "absolute" }}>
                    { item.type === 'outgoing' &&
                      <Icon
                        name='SentArrow' height='36'
                        width='36' viewBox="0 0 36 36"
                        fill={colors[item.status]}
                        stroke='white'
                      />
                    }
                    { item.status === 'incoming' &&
                      <Icon
                        name='ReceiveArrow'
                        height='36'
                        width='36'
                        viewBox="0 0 36 36"
                        fill={colors[item.status]}
                        stroke='white'
                      />
                    }
                  </Col>
                  <Col style={{paddingLeft: 40}}>
                    <Text style={TransactionsHistoryStyles.usdAmount}>{formatter.usd(item.amount_usd)}</Text>
                    <Text style={TransactionsHistoryStyles.coinAmount}>{formatter.crypto(item.amount, item.coin.toUpperCase(), { precision: 5 })}</Text>
                  </Col>
                </Col>
                <Col size={30}>
                  <View style={{display: 'flex', alignSelf: 'flex-end'}}>
                    <Text style={TransactionsHistoryStyles.time}>{item.time}</Text>
                    <Text
                      style={[TransactionsHistoryStyles.status, {color: colors[item.status]}]}>
                      {statusText[item.status]}
                    </Text>
                  </View>
                </Col>
              </Grid>
            </TouchableOpacity>
          </ListItem>
        }/>
      {/* <Link>See all</Link> */}
    </View>
  )
}


export default TransactionsHistory;
