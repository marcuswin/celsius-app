import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import moment from "moment";
import testUtil from "../../../utils/test-util";

import XTicksStyle from "./XTicks.styles";

import { heightPercentageToDP, widthPercentageToDP } from "../../../utils/styles-util";
import CelText from "../CelText/CelText";


class XTicks extends Component {

  static propTypes = {
    time: PropTypes.instanceOf(Array).isRequired,
    timeline: PropTypes.string,
  };
  static defaultProps = {
  }
  
  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };

    // binders
  }

  // lifecycle methods
  // event hanlders
  // rendering methods
  render() {
    const {time, timeline} = this.props;
    const style = XTicksStyle()
    const ticks = [];
    let tm;

    switch (timeline) {
      case "1y":
        tm = "MMM";
        break;
      case "1d":
        tm = "H";
        break;
      case "1m":
        tm = "ddd do";
        break;
      case "7d":
        tm = "dd";
        break;
      default:
        tm = "1d";
    }

    const maxVal = 10;
    const delta = Math.floor(time.length / maxVal);
    for (let i = 0; i < time.length; i += delta) {
      ticks.push(moment(time[i]).format(tm));
    }
    
    return (
      <View style={style.xValues}>
        {ticks.map((date, index) => (
            <CelText key={date} type={"H6"}
                     style={{
                       position: "absolute",
                       bottom: heightPercentageToDP("1.2%"),
                       left: index * widthPercentageToDP("11%") - widthPercentageToDP("3%"),
                       color: index === 0 || index === ticks.length - 1 ? "transparent" : "gray"
                     }}>{date}</CelText>
          )
        )}
      </View>
    );
  }
}

export default testUtil.hookComponent(XTicks);
