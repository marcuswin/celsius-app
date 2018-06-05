import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {Grid, Col, Row} from "react-native-easy-grid";
import { LineChart } from 'react-native-svg-charts'
import get from 'lodash/get';

import formatter from '../../../utils/formatter';
import PricingChangeIndicator from "../../molecules/PricingChangeIndicator/PricingChangeIndicator";
import StarIcon from "../../atoms/StarIcon/StarIcon";
import Card from '../../atoms/Card/Card';
import {FONT_SCALE, STYLES} from "../../../config/constants/style";


const {height} = Dimensions.get('window');

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
    fontFamily: 'agile-medium',
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
    marginTop: height / 55,
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
  const graphData = get(props.market.quotes.USD, 'price7d', null)

  return <Card>
    <Grid style={props.type === "wallet-card" && props.item.coinAmount === 0 ? [CoinCardStyle.row, {paddingTop: 10, opacity: 0.6}] : [CoinCardStyle.row, {paddingTop: 10}] }>
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
      {graphData &&
        <Row style={[CoinCardStyle.row, {paddingBottom: 20}]}>
          <View style={{width: '100%'}}>
            <LineChart
              style={{ height: 30 }}
              data={ graphData  }
              svg={{ stroke: isPercentChangeNegative ? '#EF461A' : '#4FB895' }}
            />
          </View>
        </Row>
      }
      {(props.currency.short === "BTC" || props.currency.short === "ETH" || props.currency.short === "CEL" ) &&
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
