import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import GraphContainerStyle from "./GraphContainer.styles";
import PeriodGraphView from "../PeriodGraphView/PeriodGraphView";
import Graph from "../Graph/Graph";
import XTicks from "../XTicks/XTicks";

@connect(
  state => ({
    currencies: state.currencies.rates,
    walletSummary: state.wallet.summary,
    currencyGraphs: state.currencies.graphs,
    currenciesRates: state.currencies.rates,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)

class GraphContainer extends Component {

  static propTypes = {
    showXTicks: PropTypes.bool,
    showPeriods: PropTypes.bool,
    height: PropTypes.number,
    width: PropTypes.number,
    interest: PropTypes.bool,
    backgroundColor: PropTypes.string
  };
  static defaultProps = {
    showXTicks: false,
    showCursor: false,
    showPeriods: false,
  }

  constructor(props) {
    super(props);
    const { currencyGraphs, currenciesRates } = props;
    const currentCoin = "LTC";

    const timeline = "1d";
    const dateArray = currencyGraphs[currentCoin][timeline].map(data => data[0]);
    const priceArray = currencyGraphs[currentCoin][timeline].map(data => data[1]);
    const rate = currenciesRates.find((coin) => coin.short === currentCoin).price_change_usd[timeline];

    this.state = {
      dateArray,
      priceArray,
      timeline,
      rate
    };
  }

  renderTimeline = (period) => {
    const { currencyGraphs, currenciesRates } = this.props;
    const currentCoin = "LTC";

    const rate = currenciesRates.find((coin) => coin.short === currentCoin).price_change_usd[period];
    const date = currencyGraphs[currentCoin][period].map(data => data[0]);
    const price = currencyGraphs[currentCoin][period].map(data => data[1])

    this.setState({
      dateArray: date,
      priceArray: price,
      timeline: period,
      rate
    })
  };

  render() {
    const { periods, showPeriods, showXTicks, interest, width, showCursor, backgroundColor } = this.props;
    const { dateArray, priceArray, timeline, rate } = this.state;
    const style = GraphContainerStyle();

    return (
      <View style={style.container}>
        {showPeriods && <PeriodGraphView width={width} periods={periods} onChange={this.renderTimeline} />}
        <Graph width={width} dateArray={dateArray} priceArray={priceArray} interest={interest} showCursor={showCursor} rate={rate} timeline={timeline} backgroundColor={backgroundColor} />
        {showXTicks && <XTicks width={width} time={dateArray} timeline={timeline} />}
      </View>
    );
  }
}

export default testUtil.hookComponent(GraphContainer);
