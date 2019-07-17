import React, { Component } from "react";
import { View, ART } from "react-native";
import PropTypes from "prop-types";
import * as d3 from "d3";

import CircularProgressBarStyles from "./CircularProgressBar.styles";
import { heightPercentageToDP } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";
import CelText from "../../atoms/CelText/CelText";


const { Surface, Group, Shape } = ART;

class CircularProgressBar extends Component {

  static propTypes = {
    amountPaid: PropTypes.number,
    amountLoaned: PropTypes.number,
    width: PropTypes.number,
  };
  static defaultProps = {
    width: heightPercentageToDP("22.5%")
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const style = CircularProgressBarStyles();
    const {width, amountLoaned, amountPaid} = this.props;
    const percentage = amountPaid * 100 / amountLoaned;
    const section = d3.pie().value(l => l.percent)({});
    const path = d3.arc()
      .startAngle(0)
      .endAngle(Math.PI * 2 * percentage / 100)
      .outerRadius(width / 2.5) // must be less than 1/2 the chart's height/width
      .innerRadius(width / 2.3); // the size of the inner 'donut' whitespace

    return (
      <View>
        <Surface width={width} height={width}>
          <Group x={width / 2} y={width / 2}>
            {
              section.map(sec => (
                <Shape
                  d={path(sec)}
                  stroke={STYLES.COLORS.GREEN}
                  fill={STYLES.COLORS.GREEN}
                  strokeWidth={4}
                  key={"trt"}
                />
              ))
            }
          </Group>
        </Surface>
        <View style={[style.innerCircle, { backgroundColor: STYLES.COLORS.GREEN_OPACITY }]}/>
        <View style={[style.contentCircle, style.progressBackground]}>
          <CelText color={STYLES.COLORS.GRAY} type={"H6"} weight={"300"}>
            Amount paid
          </CelText>
          <CelText color={STYLES.COLORS.GREEN} type={"H3"} weight={"600"}>
            {amountPaid}
          </CelText>
        </View>
      </View>
    );
  }
}

export default CircularProgressBar;
