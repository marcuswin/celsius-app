import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from "react-native";

import testUtil from "../../../utils/test-util";

import PeriodGraphViewStyle from "./PeriodGraphView.styles";
import CelText from "../../atoms/CelText/CelText";


class PeriodGraphView extends Component {

  static propTypes = {
    periods: PropTypes.instanceOf(Array),
  };
  static defaultProps = {
    periods: ["DAY", "WEEK", "MONTH", "YEAR", "ALL"],
    showPeriods: false,
  }
  
  constructor(props) {
    super(props);

    this.state = {
      // initial state
      activePeriod: "DAY"
    };

    // binders
  }

  activatePeriod = (period) => {
    let tm;

    switch (period) {
      case "YEAR":
        tm = "1y";
        break;
      case "DAY":
        tm = "1d";
        break;
      case "MONTH":
        tm = "1m";
        break;
      case "WEEK":
        tm = "7d";
        break;
      default:
        tm = "1d";
    }


    this.setState({
      activePeriod: period,
    });

    this.props.onChange(tm)
  };

  // lifecycle methods
  // event hanlders
  // rendering methods
  render() {
    const {periods, width} = this.props;
    const {activePeriod} = this.state;
    const style = PeriodGraphViewStyle();

    return (
      <View style={[style.periods, {width}]}>
        {periods.map((period) => (
          <TouchableOpacity key={period} style={{ alignItems: "center" }}
          onPress={() => this.activatePeriod(period)}>
            <CelText key={period} type={"H7"}
                     style={{ color: activePeriod === period ? "rgba(65,86,166,1)" : "rgba(59,71,85,0.5)" }}>
              {period}
            </CelText>
            {activePeriod === period &&
            <View style={style.active}/>
            }
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

export default testUtil.hookComponent(PeriodGraphView);
