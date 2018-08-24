import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { Grid, Col, Row } from "react-native-easy-grid";
import { LineChart } from 'react-native-svg-charts'
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import formatter from '../../../utils/formatter';
import PricingChangeIndicator from "../../molecules/PricingChangeIndicator/PricingChangeIndicator";
import Icon from "../../atoms/Icon/Icon";
import Card from '../../atoms/Card/Card';
import { FONT_SCALE, GLOBAL_STYLE_DEFINITIONS as globalStyles, STYLES } from "../../../config/constants/style";
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
    fontFamily: 'agile-light',
    color: '#181C21',
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
    marginLeft: 'auto',
  },
  lastInterestWrapper: {
    backgroundColor: STYLES.PRIMARY_BLUE,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginHorizontal: 8,
    marginBottom: 8,
  },
  lastInterestText: {
    color: STYLES.WHITE_TEXT_COLOR,
    fontSize: FONT_SCALE * 16,
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
    marginRight: 20,
  },
  row: {
    paddingLeft: 16,
    paddingRight: 16,
  },
});

// const CoinCardInfo = ({text}) => (
//   <Row>
//     <View style={[CoinCardStyle.wrapper, CoinCardStyle.lendingBorrowingInfoWrapper]}>
//       <Icon
//         name={'EligibilityStarTwo'}
//         height='22'
//         width='22'
//         stroke={'#9DA3A9'}
//         fill={'rgba(255,255,255,0.5)'}
//       />
//       <Text style={CoinCardStyle.lendingBorrowingInfoText}>{text}</Text>
//     </View>
//   </Row>
// );

@connect(
  state => ({
    nav: state.nav,
    activeScreen: state.nav.routes[state.nav.index].routeName,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class CoinCard extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['default', 'wallet-card'])
  }

  static defaultProps = {
    type: 'default',
  }

  render() {
    const { type, currency, amount, total, supportedCurrencies, lastInterest } = this.props;

    const letterSize = Math.round(total).toString().length >= 7 ?
      FONT_SCALE * 20 : FONT_SCALE * 29;

    const percentChange = get(currency, 'market.quotes.USD.percent_change_24h', 0);
    const isPercentChangeNegative = percentChange < 0;
    const graphDataObj = supportedCurrencies != null && supportedCurrencies.filter(supportedCurrencie => supportedCurrencie.short === currency.short)
    const graphData = get(graphDataObj, '[0]market.price_usd.7d', null)
    // eslint-disable-next-line
    const graphDataPrices = graphData != null ? graphData.map(([_timestamp, price]) => price) : null;

    const cardType = type === 'default' ? 'transparent' : 'white';
    return (
      <Card type={cardType}>
        <Grid style={type === "wallet-card" && Number(amount) === 0 ? [CoinCardStyle.row, { paddingTop: 10, opacity: 0.4 }] : [CoinCardStyle.row, { paddingTop: 10 }]}>
          <Row>
            <Col style={{ width: '70%', justifyContent: 'center' }}>
              <View>
                <Text
                  style={CoinCardStyle.label}>{currency.short.toUpperCase()} - {currency.name.toUpperCase()}</Text>
                <Text style={[CoinCardStyle.text, {fontSize: letterSize}]}>{formatter.usd(total)}</Text>
                <Text
                  style={[CoinCardStyle.coinAmount, { fontFamily: 'agile-light' }]}>{ formatter.crypto(amount, currency.short.toUpperCase(), { precision: 5 }) }</Text>
              </View>
            </Col>
            <Col style={{ width: '30%' }}>
              <Image
                source={{ uri: currency.image_url }}
                style={CoinCardStyle.image}
              />
              { type !== "wallet-card" && ELIGIBLE_COINS.indexOf(currency.short) !== -1 ? (
                <Icon
                  style={{position: 'absolute', bottom: 0, right: 0 }}
                  name={'EligibilityStar'}
                  height='20'
                  width='20'
                  fill={STYLES.PRIMARY_BLUE}
                  stroke={'white'}
                />
              ) : null }
            </Col>
          </Row>
        </Grid>
        <Grid style={[CoinCardStyle.coinData, type === 'default' ? {borderColor: 'white'} : { borderColor: STYLES.GRAY_1 }]}>
          <Row style={[CoinCardStyle.row, { paddingBottom: 16 }]}>
            <PricingChangeIndicator
              rootStyles={{marginLeft: 0,}}
              isPercentChangeNegative={isPercentChangeNegative}
              percentChange={percentChange}
            />
            <View style={CoinCardStyle.wrapper}>
              <Text
                style={CoinCardStyle.coinAmount}>1 {currency.short} =
              </Text>
              <Text style={[CoinCardStyle.coinAmount, globalStyles.boldText]}>{formatter.usd(currency.market.quotes.USD.price)}</Text>
            </View>
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
        </Grid>
        {(!!lastInterest && !!Number(lastInterest.amount_usd)) && <View style={CoinCardStyle.lastInterestWrapper}>
          <View>
            <Text style={CoinCardStyle.lastInterestText}>Weekly interest on {currency.short.toUpperCase()}:</Text>
          </View>
          <View style={{flex: 0}}>
            <Text style={[CoinCardStyle.lastInterestText, globalStyles.boldText]}>{formatter.usd(lastInterest.amount_usd)}</Text>
          </View>
        </View>}
      </Card>
    );
  }
};

export default CoinCard;
