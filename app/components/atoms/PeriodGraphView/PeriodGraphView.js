import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from "react-native";

import testUtil from "../../../utils/test-util";

import PeriodGraphViewStyle from "./PeriodGraphView.styles";
import CelText from "../CelText/CelText";


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
    // switch (period) {
    //   case "YEAR":
    //     tm = "MMM";
    //     break;
    //   case "DAY":
    //     tm = "HH";
    //     break;
    //   case "1m":
    //     tm = "DD";
    //     break;
    //   case "7d":
    //     tm = "DD";
    //     break;
    //   default:
    //     tm = "1y";
    // }


    this.setState({
      activePeriod: period,
    });
  };

  // lifecycle methods
  // event hanlders
  // rendering methods
  render() {
    const {periods} = this.props;
    const {activePeriod} = this.state;
    const style = PeriodGraphViewStyle()

    return (
      <View style={style.periods}>
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
