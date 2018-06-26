import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { LineChart } from "react-native-svg-charts";
import get from 'lodash/get';
import { Grid, Col, Row } from "react-native-easy-grid";
import { COLORS } from "../../../config/constants/style";


import formatter from "../../../utils/formatter";
import PricingChangeIndicator from "../../molecules/PricingChangeIndicator/PricingChangeIndicator";
import WalletDetailsGraphContainerStyle from './WalletDetailsGraphContainer.styles';

const periods = ['1d', '7d', '1m', '3m', '1y'];

class WalletDetailsGraphContainer extends Component {

  constructor(props) {
    super(props);
    const { supportedCurrencies, currency } = this.props;
    const period = '1d';
    const currencyData = this.getCurrencyData(supportedCurrencies, currency);
    const percentChange = this.getPercentageChange(currencyData, period);
    const graphDataPrices = this.getGraphData(supportedCurrencies, currency, period);

    this.state = {
      activePeriod: period,
      percentChange,
      graphData: graphDataPrices,
    }

  }

  componentWillReceiveProps(nextProps) {
    const { supportedCurrencies, currency } = this.props;

    if (currency !== nextProps.currency) {
      const period = '1d';
      const currencyData = this.getCurrencyData(supportedCurrencies, nextProps.currency);
      const percentChange = this.getPercentageChange(currencyData, period);
      const graphDataPrices = this.getGraphData(supportedCurrencies, nextProps.currency, period);

      this.setState({
        activePeriod: period,
        percentChange,
        graphData: graphDataPrices,
      })

    }

  }


  onPress = (period) => {
    const { supportedCurrencies, currency } = this.props;

    const currencyData = this.getCurrencyData(supportedCurrencies, currency);
    const percentChange = this.getPercentageChange(currencyData, period);
    const graphDataPrices = this.getGraphData(supportedCurrencies, currency, period);

    this.setState({
      activePeriod: period,
      percentChange,
      graphData: graphDataPrices,
    })

  }

  getGraphData = (supportedCurrencies, currency, period) => {
    const currencyData = this.getCurrencyData(supportedCurrencies, currency);
    const graphData = get(currencyData, `market.price_usd.${period}`, null)
    // eslint-disable-next-line
    return graphData != null ? graphData.map(([_timestamp, price]) => price) : null;
  }

  getPercentageChange = (currencyData, period) => get(currencyData, `market.price_change_usd.${period}`, '-');
  getCurrencyData = (supportedCurrencies, currency) => supportedCurrencies != null && supportedCurrencies.find(supportedCurrencie => supportedCurrencie.short === currency.toUpperCase());

  render() {
    const { currency, supportedCurrencies } = this.props;
    const { percentChange, graphData, activePeriod } = this.state;
    const isPercentChangeNegative = this.state.percentChange < 0;
    const currencyData = this.getCurrencyData(supportedCurrencies, currency);
    const currencyPrice = get(currencyData, 'market.quotes.USD.price', '-');

    return <Grid style={WalletDetailsGraphContainerStyle.root}>
      <Row>
        <Col style={{alignItems: 'flex-start', alignContent: 'flex-start'}}>
          <PricingChangeIndicator
            isPercentChangeNegative={isPercentChangeNegative}
            percentChange={percentChange}
            period={activePeriod}
            rootStyles={{marginLeft: 0}}
            />
        </Col>
        <Col style={{ marginLeft: 'auto'}}>
          <Text
            style={[WalletDetailsGraphContainerStyle.coinAmount, {alignSelf: 'flex-end'}]}
          >
            1 {currency.toUpperCase()} = <Text style={{fontFamily: 'agile-book'}}>{formatter.usd(currencyPrice)}</Text>
          </Text>
        </Col>
      </Row>
      {graphData &&
        <Row style={WalletDetailsGraphContainerStyle.graphDataWrapper}>
          <View style={{ width: '100%' }}>
            <LineChart
              style={{ height: 240 }}
              data={graphData}
              svg={{ stroke: isPercentChangeNegative ? '#EF461A' : '#4FB895' }}
            />
          </View>
        </Row>
      }
      <Row style={WalletDetailsGraphContainerStyle.buttonsWrapper}>
        { periods.map(period =>
          <TouchableOpacity
            key={period}
            style={[WalletDetailsGraphContainerStyle.periodButton, this.state.activePeriod === period ? { backgroundColor: COLORS.gray } : null]}
            onPress={() => this.onPress(`${period}`)}
          >
            <Text style={WalletDetailsGraphContainerStyle.periodButtonText}>{period.toUpperCase()}</Text>
          </TouchableOpacity>)
        }
      </Row>
    </Grid>;
  }
}

export default WalletDetailsGraphContainer;

