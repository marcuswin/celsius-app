import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import GraphContainerStyle from "./GraphContainer.styles";
import PeriodGraphView from "../PeriodGraphView/PeriodGraphView";
import Graph from "../Graph/Graph";
import XTicks from "../XTicks/XTicks";
import Spinner from "../../atoms/Spinner/Spinner";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";

@connect(
  (state, props) => {
    let graphData;

    if (props.type === "total-balance") graphData = state.graph.walletTotalChartData;
    if (props.type === "total-interest") graphData = state.graph.interestChartData;
    if (props.type === "coin-balance") graphData = state.graph.coinWalletChartData;
    // if (props.type === "coin-interest") graphData = state.graph.coinInterestChartData;

    return {
      currenciesRates: state.currencies.rates,
      callsInProgress: state.api.callsInProgress,
      graphData
    };
  },
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)

class GraphContainer extends Component {

  static propTypes = {
    showXTicks: PropTypes.bool,
    showPeriods: PropTypes.bool,
    height: PropTypes.number,
    width: PropTypes.number,

    type: PropTypes.oneOf(["total-balance", "total-interest", "coin-balance", "coin-interest"]).isRequired,
    period: PropTypes.oneOf(["1d", "1w", "1m", "1y"]),
    coin: PropTypes.string
  };
  static defaultProps = {
    showXTicks: false,
    showCursor: false,
    showPeriods: false,

    period: "1d"
  };

  constructor(props) {
    super(props);
    this.state = {
      timeline: props.period
    };
  }

  componentDidMount = () => this.fetchGraphData();


  fetchGraphData = () => {
    const { type, coin, actions } = this.props;
    const { timeline } = this.state;

    if (type === "total-balance") {
      actions.getTotalWalletBalanceData(timeline);
    }

    if (type === "total-interest") {
      actions.getInterestGraphData(timeline);
    }

    if (type === "coin-balance") {
      actions.getCoinWalletBalanceData(coin, timeline);
    }
  };

  splitArrays = () => {
    const { graphData } = this.props;

    if (!graphData) return {
      dates: [],
      prices: []
    };

    return {
      dates: graphData.map(d => d[0]),
      prices: graphData.map(d => d[1])
    };
  };

  renderTimeline = (period) => {
    this.setState({
      timeline: period
    });
    this.fetchGraphData();
  };

  render() {
    const { graphData, periods, showPeriods, showXTicks, interest, width, showCursor, callsInProgress, type, coin, currenciesRates } = this.props;
    const { timeline } = this.state;
    const style = GraphContainerStyle();
    let rate;

    if (!type) return null;

    const isLoading = !graphData || !graphData.length || apiUtil.areCallsInProgress([
      API.GET_WALLET_BALANCE_DATA,
      API.GET_COIN_WALLET_BALANCE_DATA,
      API.GET_INTEREST_GRAPH_DATA
    ], callsInProgress);

    const { dates, prices } = this.splitArrays();
    if (type === "coin-balance") {
      rate = currenciesRates.find((c) => c.short === coin).price_change_usd[timeline];
    }
    if (type === "total-balance") {
      rate = prices[prices.length - 1] > prices[prices.length - 2] ? 1 : -1;
    }

    return (
      <View style={[style.container, { width }]}>
        {showPeriods && <PeriodGraphView width={width} periods={periods} onChange={this.renderTimeline}/>}
        {isLoading ? (
          <View style={style.spinner}>
            <Spinner/>
          </View>
        ) : (
          <Graph width={width} dateArray={dates} priceArray={prices} interest={interest} showCursor={showCursor}
                 rate={rate} timeline={timeline}/>
        )}
        <View style={style.xTick}>
          {showXTicks && !isLoading && <XTicks width={width} time={dates} timeline={timeline}/>}
        </View>
      </View>
    );
  }
}

export default testUtil.hookComponent(GraphContainer);
