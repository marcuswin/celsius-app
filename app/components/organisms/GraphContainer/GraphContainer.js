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
    currencyGraphs: state.currencies.graphs
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)

class GraphContainer extends Component {

  static propTypes = {
    showXTicks: PropTypes.bool,
    showPeriods: PropTypes.bool,

  };
  static defaultProps = {
    showXTicks: false,
    showCursor: false,
    showPeriods: false,
  }

  constructor(props) {
    super(props);



    const { currencyGraphs } = props;
    const timeline = "1d";
    const dateArray = currencyGraphs.LTC[timeline].map(data => data[0]);
    const priceArray = currencyGraphs.LTC[timeline].map(data => data[1]);

    this.state = {
      dateArray,
      priceArray,
      timeline
    };

  }

  renderTimeline = (period) => {

    const { currencyGraphs } = this.props;

    const date = currencyGraphs.LTC[period].map(data => data[0]);
    const price = currencyGraphs.LTC[period].map(data => data[1])

    this.setState({
      dateArray: date,
      priceArray: price,
      timeline: period
    })
  };



  render() {
    const { showPeriods, showXTicks } = this.props;
    const {dateArray, priceArray, timeline} = this.state;
    const style = GraphContainerStyle();

    return (
      <SafeAreaView style={style.container}>
        {
          showPeriods &&
            <PeriodGraphView onChange={this.renderTimeline}/>
        }
        <Graph dateArray={dateArray} priceArray={priceArray} showCursor/>
        {
          showXTicks &&
          <XTicks time={dateArray} timeline={timeline}/>
        }
      </SafeAreaView>
    );
  }
}

export default testUtil.hookComponent(GraphContainer);
