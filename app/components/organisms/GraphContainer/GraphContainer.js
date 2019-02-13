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



    const { currencyGraphs } = this.props;
    const dateArray = currencyGraphs.LTC["1y"].map(data => data[0]);
    const priceArray = currencyGraphs.LTC["1y"].map(data => data[1]);

    this.state = {
      dateArray,
      priceArray
    };

  }

  render() {
    const { showPeriods, showXTicks } = this.props;
    const {dateArray, priceArray} = this.state;
    const style = GraphContainerStyle();

    return (
      <SafeAreaView style={style.container}>
        {showPeriods &&
            <PeriodGraphView/>
        }
        <Graph dateArray={dateArray} priceArray={priceArray} showCursor/>
        { showXTicks &&
          <XTicks time={dateArray}/>
        }
      </SafeAreaView>
    );
  }
}

export default testUtil.hookComponent(GraphContainer);
