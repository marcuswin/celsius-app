import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Grid, Col, Row} from "react-native-easy-grid";
import { LineChart } from 'react-native-svg-charts'

import formatter from '../../../utils/formatter';
import PricingChangeIndicator from "../../molecules/PricingChangeIndicator/PricingChangeIndicator";
import StarIcon from "../../atoms/StarIcon/StarIcon";
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
};

const CoinCardStyle = StyleSheet.create({
  label: {
    color: '#3D4853',
    fontSize: FONT_SCALE * 11,
    opacity: 0.7,
    fontFamily: 'agile-book',
  },
  text: {
    marginTop: 5,
    marginBottom: 10,
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
  lendingBorrowingInfoWrapper: {
    width: '100%',
    backgroundColor: STYLES.GRAY_4,
    height: 46,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 20,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  lendingBorrowingInfoText: {
    color: 'white',
    fontFamily: 'agile-medium',
    fontSize: FONT_SCALE * 11,
    marginLeft: 9,
  },
  row: {
    paddingLeft: 16,
    paddingRight: 16,
  },
});


const CoinCard = (props) => {
  const percentChange24h = props.market.quotes.USD.percent_change_24h;
  const isPercentChangeNegative = percentChange24h < 0;

  const data = [ 0, 11, 6, 8, 12, 24, 8, 7, 2, 1, 20, 24, 30, 35, 5, 11, 6, 8, 12, 24, 8, 7, 2, 1, 20, 24, 30, 35, 5, 11, 6, 8, 12, 24, 8, 7, 2, 1, 20, 24, 30, 35, 5 ]; // TODO: djs: mocked data, should be loaded from backend

  return <Card>
    <Grid style={[CoinCardStyle.row, {paddingTop: 10}]}>
      <Row>
        <Col style={{width: '70%', justifyContent: 'center'}}>
          <View>
            <Text
              style={CoinCardStyle.label}>{props.currency.short.toUpperCase()} - {props.currency.name.toUpperCase()}</Text>
            <Text style={CoinCardStyle.text}>{formatter.usd(props.total)}</Text>
            <Text
              style={[CoinCardStyle.coinAmount, {fontFamily: 'agile-light'}]}>{props.amount} {props.currency.short.toUpperCase()}</Text>
          </View>
        </Col>
        <Col style={{width: '30%'}}>
          <Image
            source={{uri: props.currency.image_url}}
            style={CoinCardStyle.image}
          />
        </Col>
      </Row>
    </Grid>
    <Grid style={CoinCardStyle.coinData}>
      <Row style={[CoinCardStyle.row, {paddingBottom: 16}]}>
        <View style={CoinCardStyle.wrapper}>
          <Text
            style={[CoinCardStyle.coinAmount, CoinCardStyle.bold]}>1 {props.currency.short} = {formatter.usd(props.market.quotes.USD.price)}</Text>
        </View>
        <PricingChangeIndicator
          isPercentChangeNegative={isPercentChangeNegative}
          percentChange24h={percentChange24h}
        />
      </Row>
      <Row style={[CoinCardStyle.row, {paddingBottom: 16}]}>
        <View style={{width: '100%'}}>
          <LineChart
            style={{ height: 30 }}
            data={ data }
            svg={{ stroke: '#4FB895' }}
          />
        </View>
      </Row>
      {(props.currency.short === "BTC" || props.currency.short === "ETH") &&
      <Row>
        <View style={[CoinCardStyle.wrapper, CoinCardStyle.lendingBorrowingInfoWrapper]}>
          <StarIcon/>
          <Text style={CoinCardStyle.lendingBorrowingInfoText}>Eligible soon for lending and borrowing</Text>
        </View>
      </Row>
      }
    </Grid>
  </Card>;
};

export default CoinCard;
