import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import moment from "moment";
import testUtil from "../../../utils/test-util";

import XTicksStyle from "./XTicks.styles";

import { heightPercentageToDP, widthPercentageToDP } from "../../../utils/styles-util";
import CelText from "../CelText/CelText";


class XTicks extends Component {

  static propTypes = {
    time: PropTypes.instanceOf(Array).isRequired,
    timeline: PropTypes.string
  };
  static defaultProps = {
    width: widthPercentageToDP("100%")
  };

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

  renderXAxis = () => {
    const { time, timeline, width } = this.props;
    const style = XTicksStyle();
    const ticks = [];
    const ticksTwo = [];
    let tm;


    switch (timeline) {
      case "1y":
        tm = "MMM";
        break;
      case "1d":
        tm = "kk";
        break;
      case "1m":
        tm = "D";
        break;
      case "7d":
        tm = "ddd";
        break;
      default:
        tm = "1d";
    }

    const maxVal = 10;
    const delta = Math.floor(time.length / maxVal);
    for (let i = 0; i < time.length; i += delta) {
      ticks.push(moment(time[i]).format(tm));
        if (timeline === "1m") {
          ticksTwo.push(moment(time[i]).format("MMM"))
        }
    }

    if (timeline === "1y") return (
      <View  style={[style.xValues]}>
        {ticks.map((date, index) => (
            <CelText key={date} type={"H7"}
                     style={{
                       position: "absolute",
                       bottom: heightPercentageToDP("1.2%"),
                       left: index * (width * 0.11) - (width * 0.03),
                       color: index === 0 || index === ticks.length - 1 ? "transparent" : "gray"
                     }}>{date}</CelText>
          )
        )}
      </View>
    );
    if (timeline === "1m") return (
      <View  style={[style.xValues]}>
        {ticks.map((date, index) => (
             <CelText key={date} type={"H7"}
                      style={{
                        position: "absolute",
                        bottom: heightPercentageToDP("1.2%"),
                        left: index * (width * 0.1125) - (width * 0.03),
                        color:index === 0 || index === ticks.length - 1 ? "transparent" : "gray"
                      }}>{date}</CelText>
          // 0.108
          )
        )}
        {ticksTwo.map((date, index) => (
            <CelText key={date} type={"H7"}
                     style={{
                       position: "absolute",
                       bottom: 0,
                       left: index * (width * 0.11) - (width * 0.03),
                       color:index === 0 || index === ticks.length - 1 ? "transparent" : "gray"
                     }}>{date}</CelText>
            // 0.108
          )
        )}
        </View>
    );
    if (timeline === "1d") return (
      <View  style={[style.xValues]}>
        {ticks.map((date, index) => (
            <CelText key={date} type={"H7"}
                     style={{
                       position: "absolute",
                       bottom: heightPercentageToDP("1.2%"),
                       left: index * (width * 0.11) - (width * 0.03),
                       color:index === 0 || index === ticks.length - 1 ? "transparent" : "gray"
                     }}>{`${date}h`}</CelText>
          // 0.111
          )
        )}
      </View>
    );
    if (timeline === "7d") return (
        <View style={[style.xValues]}>
          {ticks.map((date, index) => (
                <CelText key={date} type={"H7"}
                         style={{
                           position: "absolute",
                           bottom: heightPercentageToDP("1.2%"),
                           left: index * (width * 0.11) - (width * 0.03),
                           color:index === 0 || index === ticks.length - 1 ? "transparent" : "gray"
                         }}>{date}</CelText>
            // 0.112
            )
          )}
        </View>
      );
  };

  render() {
    return (
      <View>
        {this.renderXAxis()}
      </View>
    );
  }
}

export default testUtil.hookComponent(XTicks);
