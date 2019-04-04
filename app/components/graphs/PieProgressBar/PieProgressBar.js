import React, { Component } from 'react';
import { View, ART } from 'react-native';
import PropTypes from 'prop-types';
import * as d3 from 'd3'

import testUtil from "../../../utils/test-util";
import PieProgressBarStyle from "./PieProgressBar.styles";
import { heightPercentageToDP } from "../../../utils/styles-util";
import CelText from "../../atoms/CelText/CelText";

const {Surface, Group, Shape} = ART;

const width = heightPercentageToDP("23.5%");
const height = heightPercentageToDP("23.5%");

class PieProgressBar extends Component {

  static propTypes = {
    amount: PropTypes.string,
    max: PropTypes.number,
    min: PropTypes.number,
  };
  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {amount, max, min} = this.props;
    const style = PieProgressBarStyle();
    const percentage = (amount - min) * 100 / (max - min);
    const section = d3.pie().value(amount)({});
    const path = d3.arc()
      .outerRadius(height / 2.5) // must be less than 1/2 the chart's height/width
      .innerRadius(height /2.3) // the size of the inner 'donut' whitespace
      .startAngle(0)
      .endAngle(Math.PI / 100 * 2 * (percentage))
      .cornerRadius(8);

    return (
        <View style={style.outerCircle}>
          <Surface width={width} height={height}>
            <Group x={width/2} y={height/2}>
              {
                section.map(sec => (
                  <Shape
                    key={section}
                    d={path(sec)}
                    stroke="rgba(65, 86, 166, 0.3)"
                    fill={`white`}
                    strokeWidth={2}
                  />
                ))
              }
            </Group>
          </Surface>
          <View style={style.innerCircle}/>
          <View style={style.contentCircle}>
            <CelText color={"white"} type={"H3"} weight={"700"}>
              {amount}
            </CelText>
            <CelText color={"white"} type={"H5"} weight={"300"}>
              CEL coins
            </CelText>
          </View>
        </View>
    );
  }
}

export default testUtil.hookComponent(PieProgressBar);
