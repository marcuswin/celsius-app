import React from "react";
import { View, Text } from "react-native";
import { List, ListItem } from 'native-base';
import { Grid, Col } from "react-native-easy-grid";
import Link from "../../atoms/Link/Link";
import formatter from "../../../utils/formatter";
import Icon from "../../atoms/Icon/Icon";

import { STYLES } from "../../../config/constants/style";

import TransactionsHistoryStyles from "./TransactionsHistory.styles";

const data = [
  {
    id: 1,
    amount: 300,
    amount_usd: 500,
    coin: 'BTC',
    time: '2 May 2018',
    status: 'withdrawn'
  },
  {
    id: 2,
    amount: 300,
    amount_usd: 500,
    coin: 'BTC',
    time: '2 May 2018',
    status: 'in progress'
  },
  {
    id: 3,
    amount: 300,
    amount_usd: 500,
    coin: 'BTC',
    time: '2 May 2018',
    status: 'received'
  }
]

const colors = {
  "in progress": STYLES.YELLOW,
  "received": STYLES.PRIMARY_GREEN,
  "withdrawn": STYLES.PRIMARY_RED,
}

const TransactionsHistory = () => 
   <View>
    <Text style={TransactionsHistoryStyles.title}>Transaction History</Text>
    <List
      dataArray={data}
      bounces={false}
      style={{marginBottom: 30}}
      renderRow={(item) =>
        <ListItem style={TransactionsHistoryStyles.listItem}>
          <Grid style={{paddingLeft: 0, marginLeft: 0}}>
            <Col size={70} style={{paddingLeft: 0, marginLeft: 0}}>
              <Col style={{ width: 40, position: "absolute" }}>
                {(item.status === 'withdrawn' || item.status === 'in progress') && 
                  <Icon 
                    name='SentArrow' height='36'
                    width='36' viewBox="0 0 36 36"
                    fill={colors[item.status]}
                    stroke='white'
                  />
                }
                {item.status === 'received' && 
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
                <Text style={TransactionsHistoryStyles.coinAmount}>{formatter.crypto(item.amount)} {item.coin}</Text>
              </Col>
            </Col>
            <Col size={30}>
              <View style={{display: 'flex', alignSelf: 'flex-end'}}>
                <Text style={TransactionsHistoryStyles.time}>{item.time}</Text>
                <Text
                  style={[TransactionsHistoryStyles.status, {color: colors[item.status]}]}>
                  {item.status}
                </Text>
              </View>
            </Col>
          </Grid>
        </ListItem>
      }/>
    <Link>See all</Link>
  </View>


export default TransactionsHistory;