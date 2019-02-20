import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import GraphContainerStyle from "./GraphContainer.styles";
import PeriodGraphView from "../../atoms/PeriodGraphView/PeriodGraphView";
import Graph from "../../atoms/Graph/Graph";
import XTicks from "../../atoms/XTicks/XTicks";



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
  };
  static defaultProps = {
    showXTicks: false,
    showCursor: false,
    showPeriods: false,
  }

  constructor(props) {
    super(props);



    const { currencyGraphs, currenciesRates } = props;

    const timeline = "1d";
    const dateArray = currencyGraphs.LTC[timeline].map(data => data[0]);
    const priceArray = currencyGraphs.LTC[timeline].map(data => data[1]);
    const rate = currenciesRates.filter(c => c.short === "LTC")[0].price_change_usd[timeline]

    this.state = {
      dateArray,
      priceArray,
      timeline,
      rate
    };

  }

  renderTimeline = (period) => {

    const { currencyGraphs, currenciesRates } = this.props;

    const rate = currenciesRates.filter(c => c.short === "LTC")[0].price_change_usd[period];
    const date = currencyGraphs.LTC[period].map(data => data[0]);
    const price = currencyGraphs.LTC[period].map(data => data[1])

    this.setState({
      dateArray: date,
      priceArray: price,
      timeline: period,
      rate
    })
  };



  render() {
    const { periods, showPeriods, showXTicks, interest, width } = this.props;
    const {dateArray, priceArray, timeline, rate} = this.state;
    const style = GraphContainerStyle();

    return (
      <SafeAreaView style={style.container}>
        {
          showPeriods &&
            <PeriodGraphView width={width} periods={periods} onChange={this.renderTimeline}/>
        }
        <Graph width={width} dateArray={dateArray} priceArray={priceArray} interest={interest} showCursor rate={rate}/>
        {
          showXTicks &&
          <XTicks width={width} time={dateArray} timeline={timeline}/>
        }
      </SafeAreaView>
    );
  }
}

export default testUtil.hookComponent(GraphContainer);
