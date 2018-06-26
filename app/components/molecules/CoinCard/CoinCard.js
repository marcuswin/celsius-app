import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { Grid, Col, Row } from "react-native-easy-grid";
import { LineChart } from 'react-native-svg-charts'
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import * as actions from "../../../redux/actions";
import formatter from '../../../utils/formatter';
import PricingChangeIndicator from "../../molecules/PricingChangeIndicator/PricingChangeIndicator";
import Icon from "../../atoms/Icon/Icon";
import Card from '../../atoms/Card/Card';
import { FONT_SCALE, STYLES } from "../../../config/constants/style";
import { ELIGIBLE_COINS } from "../../../config/constants/common";



const { height } = Dimensions.get('window');

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
  },
  bold: {},
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
      { rotate: '180deg' }
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

@connect(
  state => ({
    nav: state.nav,
    activeScreen: state.nav.routes[state.nav.index].routeName,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)


class CoinCard extends Component {

  static propTypes = {
    type: PropTypes.oneOf(['default', 'wallet-card'])
  }

  static defaultProps = {
    type: 'default',
  }


  render() {
    const { type, currency, amount, total, supportedCurrencies } = this.props;

    const percentChange = get(currency, 'market.quotes.USD.percent_change_24h', 0);
    const isPercentChangeNegative = percentChange < 0;
    const graphDataObj = supportedCurrencies != null && supportedCurrencies.filter(supportedCurrencie => supportedCurrencie.short === currency.short)
    const graphData = get(graphDataObj, '[0]market.price_usd.7d', null)
    // eslint-disable-next-line
    const graphDataPrices = graphData != null ? graphData.map(([_timestamp, price]) => price) : null;


    return <Card>
      <Grid style={type === "wallet-card" && amount === 0 ? [CoinCardStyle.row, { paddingTop: 10, opacity: 0.6 }] : [CoinCardStyle.row, { paddingTop: 10 }]}>
        <Row>
          <Col style={{ width: '70%', justifyContent: 'center' }}>
            <View>
              <Text
                style={CoinCardStyle.label}>{currency.short.toUpperCase()} - {currency.name.toUpperCase()}</Text>
              <Text style={CoinCardStyle.text}>{formatter.usd(total)}</Text>
              <Text
                style={[CoinCardStyle.coinAmount, { fontFamily: 'agile-light' }]}>{ formatter.crypto(amount, currency.short.toUpperCase(), { precision: 5 }) }</Text>
            </View>
          </Col>
          <Col style={{ width: '30%' }}>
            <Image
              source={{ uri: currency.image_url }}
              style={CoinCardStyle.image}
            />
          </Col>
        </Row>
      </Grid>
      <Grid style={CoinCardStyle.coinData}>
        <Row style={[CoinCardStyle.row, { paddingBottom: 16 }]}>
          <View style={CoinCardStyle.wrapper}>
            <Text
              style={[CoinCardStyle.coinAmount, CoinCardStyle.bold]}>1 {currency.short} = {formatter.usd(currency.market.quotes.USD.price)}</Text>
          </View>
          <PricingChangeIndicator
            isPercentChangeNegative={isPercentChangeNegative}
            percentChange={percentChange}
          />
        </Row>
        {graphDataPrices &&
          <Row style={[CoinCardStyle.row, { paddingBottom: 20 }]}>
            <View style={{ width: '100%' }}>
              <LineChart
                style={{ height: 30 }}
                data={graphDataPrices}
                svg={{ stroke: isPercentChangeNegative ? '#EF461A' : '#4FB895' }}
              />
            </View>
          </Row>
        }
        {(type !== "wallet-card" && ELIGIBLE_COINS.indexOf(currency.short) !== -1) &&
          <Row>
            <View style={[CoinCardStyle.wrapper, CoinCardStyle.lendingBorrowingInfoWrapper]}>
              <Icon
                name={'EligibilityStarTwo'}
                height='22'
                width='22'
                stroke={'#9DA3A9'}
                fill={'rgba(61,72,83,0.5)'}
              />
              <Text style={CoinCardStyle.lendingBorrowingInfoText}>Eligible soon for lending and borrowing</Text>
            </View>
          </Row>
        }
      </Grid>
    </Card >;
  }
};

export default CoinCard;
