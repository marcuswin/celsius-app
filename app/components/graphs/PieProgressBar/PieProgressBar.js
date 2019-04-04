import React, { Component } from 'react';
import { View, ART } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as d3 from 'd3'

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
// import PieProgressBarStyle from "./PieProgressBar.styles";
import { heightPercentageToDP, widthPercentageToDP } from "../../../utils/styles-util";
import CelText from "../../atoms/CelText/CelText";

const {Surface, Group, Shape} = ART;

const width = heightPercentageToDP("23.5%");
const height = heightPercentageToDP("23.5%");

const userPurchases = [
  {
    itemName: 'Mountain Dew',
    price: 100
  },
  {
    itemName: 'Shoes',
    price: 20
  },
];

const sectionAngles = d3.pie().value(d => d.price)(userPurchases)
const path = d3.arc()
  .outerRadius(heightPercentageToDP("23.5%") / 2.5) // must be less than 1/2 the chart's height/width
  .innerRadius(heightPercentageToDP("23.5%") /2.3) // the size of the inner 'donut' whitespace
  .startAngle(0)
  .endAngle(Math.PI / 100 * 2 * 88)
  .cornerRadius(8)

@connect(
  () => ({

  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class PieProgressBar extends Component {

  static propTypes = {
    path: PropTypes.func.isRequired,
    value: PropTypes.func.isRequired
  };
  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  // componentDidMount() {
  //   this.calculateProgress()
  // }

  // calculateProgress() {
  // }

  render() {
    // const style = PieProgressBarStyle();

    return (
        <View style={{marginTop: 10,justifyContent: "center", alignItems: "center",backgroundColor: "rgba(255,255,255,0.3)", height: heightPercentageToDP("20.3%"), width: heightPercentageToDP("20.3%"), borderRadius: height/2}}>
          <Surface width={width} height={height}>
            <Group x={width/2} y={height/2}>
              {
                sectionAngles.map(section => (
                  <Shape
                    key={section.index}
                    d={path(section)}
                    stroke="rgba(65, 86, 166, 0.3)"
                    fill={`white`}
                    strokeWidth={2}
                  />
                ))
              }
            </Group>
          </Surface>
          <View style={{position: "absolute", top: heightPercentageToDP("0.8%"),left: widthPercentageToDP("1.5%"), width: heightPercentageToDP("18.7%"), height: heightPercentageToDP("18.7%"), borderRadius: height/ 2, backgroundColor: "rgba(65, 86, 166, 1)"}}/>
          <View style={{position: "absolute", justifyContent: "center", alignItems: "center", top: heightPercentageToDP("1.65%"),left: widthPercentageToDP("2.95%"), width: heightPercentageToDP("17%"), height: heightPercentageToDP("17%"), borderRadius: height/ 2, backgroundColor: "rgba(255,255,255,0.3)"}}>
            <CelText color={"white"} type={"H3"} weight={700}>
              7,045
            </CelText>
            <CelText color={"white"} type={"H5"} weight={300}>
              CEL coins
            </CelText>
          </View>
        </View>
    );
  }
}

export default testUtil.hookComponent(PieProgressBar);
