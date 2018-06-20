import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { LineChart } from "react-native-svg-charts";
import get from 'lodash/get';
import { Grid, Col, Row } from "react-native-easy-grid";
import { COLORS } from "../../../config/constants/style";


import formatter from "../../../utils/formatter";
import PricingChangeIndicator from "../../molecules/PricingChangeIndicator/PricingChangeIndicator";
import WalletDetailsGraphContainerStyle from './WalletDetailsGraphContainer.styles';

const periods = ['1d', '7d', '1m', '3m'];

class WalletDetailsGraphContainer extends Component {

  constructor(props) {
    super(props);
    const { supportedCurrencies, currency } = props;
    const percentChange = get(currency, 'market.quotes.USD.percent_change_24h', 0);

    const graphDataPrices = this.getGraphData(supportedCurrencies, currency);

    this.state = {
      activePeriod: '1d',
      percentChange,
      graphData: graphDataPrices,
    }

  }

  onPress = (period) => {
    const { supportedCurrencies, currency } = this.props;

    const currencyData = supportedCurrencies != null && supportedCurrencies.filter(supportedCurrencie => supportedCurrencie.short === currency); // todo
    const graphData = get(currencyData, `[0]market.price_usd.${period}`, null)
    // eslint-disable-next-line
    const graphDataPrices = graphData != null ? graphData.map(([_timestamp, price]) => price) : null;

    this.setState({
      activePeriod: period,
      graphData: graphDataPrices,
    })

  }

  getGraphData = (supportedCurrencies, currency) => {
    const currencyData = this.getCurrencyData(supportedCurrencies, currency);
    const graphData = get(currencyData, '[0]market.price_usd.1d', null)
    // eslint-disable-next-line
    return graphData != null ? graphData.map(([_timestamp, price]) => price) : null;
  }

  getCurrencyData = (supportedCurrencies, currency) => supportedCurrencies != null && supportedCurrencies.filter(supportedCurrencie => supportedCurrencie.short === currency);

  render() {
    const { currency, supportedCurrencies } = this.props;
    const { percentChange, graphData } = this.state;
    const isPercentChangeNegative = this.state.percentChange < 0;
    const currencyData = this.getCurrencyData(supportedCurrencies, currency);
    const currencyPrice = get(currencyData, '[0]market.quotes.USD.price', '-');

    return <Grid style={WalletDetailsGraphContainerStyle.root}>
      <Row>
        <Col style={{alignItems: 'flex-start', alignContent: 'flex-start'}}>
          <PricingChangeIndicator
            isPercentChangeNegative={isPercentChangeNegative}
            percentChange24h={percentChange}
            rootStyles={{marginLeft: 0}}
            />
        </Col>
        <Col style={{ marginLeft: 'auto'}}>
          <Text
            style={[WalletDetailsGraphContainerStyle.coinAmount, {fontWeight: 'bold', alignSelf: 'flex-end'}]}
          >
            1 {currency} = {formatter.usd(currencyPrice)}
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

