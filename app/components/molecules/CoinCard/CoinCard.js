import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Grid, Col, Row } from "react-native-easy-grid";

import Card from '../../atoms/Card/Card';
import {FONT_SCALE, STYLES} from "../../../config/constants/style";


const commonStyles = {
  percentageAmount: {
    marginLeft: 3,
    marginRight: 3,
  },
  triangle: {
    width: 9,
    height: 5,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    marginTop: 7,
    borderTopWidth: 0,
    borderRightWidth: 4.5,
    borderBottomWidth: 6,
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
  }
}

const CoinCardStyle = StyleSheet.create({
  label: {
    color: '#3D4853',
    fontSize: FONT_SCALE * 11,
    opacity: 0.7,
    fontFamily: 'agile-book',
  },
  text: {
    fontSize: FONT_SCALE * 29,
    color: '#3D4853',
    fontFamily: 'agile-book',
  },
  coinAmount: {
    fontSize: FONT_SCALE * 14,
    fontFamily: 'agile-book',
    color: '#181C21',
    fontWeight: '100',
  },
  bold: {
    fontWeight: 'bold'
  },
  red: {
    ...commonStyles.percentageAmount,
    color: STYLES.PRIMARY_RED,
  },
  green: {
    ...commonStyles.percentageAmount,
    color: STYLES.COIN_DATA_GREEN,
  },
  triangleUp: {
    ...commonStyles.triangle,
    borderBottomColor: STYLES.COIN_DATA_GREEN,
  },
  triangleDown: {
    ...commonStyles.triangle,
    borderBottomColor: STYLES.PRIMARY_RED,
    marginTop: 6,
    transform: [
      {rotate: '180deg'}
    ]
  },
  coinData: {
    display: 'flex',
    borderTopWidth: 1,
    borderColor: STYLES.GRAY_1,
    marginTop: 12,
    paddingTop: 12,
  },
  image: {
    marginLeft: 'auto',
    width: 48,
    height: 48,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
});


const CoinCard = (props) => {
  const percentChange24h = props.market.quotes.USD.percent_change_24h;
  const isPercentChangeNegative = percentChange24h < 0;
  return <Card>
    <Grid>
      <Col style={{width: '70%', justifyContent: 'center'}}>
        <View>
          <Text style={CoinCardStyle.label}>{props.currency.short.toUpperCase()} - {props.currency.name.toUpperCase()}</Text>
          <Text style={CoinCardStyle.text}>{`$${props.market.quotes.USD.price}`}</Text>
        </View>
      </Col>
      <Col style={{width: '30%'}}>
        <Image
          source={{uri: props.currency.image_url}}          
          style={CoinCardStyle.image}
        />
      </Col>
    </Grid>
    <Grid style={CoinCardStyle.coinData}>
      <Row>
        <View style={CoinCardStyle.wrapper}>
          <Text style={CoinCardStyle.coinAmount}>{props.amount} {props.currency.short.toUpperCase()}: </Text>
          <Text style={[CoinCardStyle.coinAmount, CoinCardStyle.bold]}>${(props.amount * props.market.quotes.USD.price).toFixed(3)}</Text>
        </View>
        <View style={[CoinCardStyle.wrapper, {marginLeft: 'auto'}]}>
          <View style={isPercentChangeNegative ? CoinCardStyle.triangleDown : CoinCardStyle.triangleUp} />
          <Text style={isPercentChangeNegative ? CoinCardStyle.red : CoinCardStyle.green }>{percentChange24h}%</Text><Text>(24h)</Text>
        </View>
      </Row>
    </Grid>
  </Card>;
}

export default CoinCard;