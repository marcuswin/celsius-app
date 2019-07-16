import React, { Component } from 'react';
import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Svg } from "expo";


import * as appActions from "../../../redux/actions";
import CircularProgressBarStyle from "./CircularProgressBar.styles";
import STYLES from "../../../constants/STYLES";
import { widthPercentageToDP } from "../../../utils/styles-util";

const {Circle} = Svg;
const width = widthPercentageToDP("30%");
const size = width;
const strokeWidth = 10;
const radius = (size - strokeWidth) / 2;
// const circumference = radius * 2;


@connect(
  () => ({

  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class CircularProgressBar extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const style = CircularProgressBarStyle();
    // const foo = 1
    return (
      <View style={style.container}>
        <Svg height={size} width={size}>
        <Circle
          stroke={STYLES.COLORS.GREEN}
          fill={"none"}
          cx={size/2}
          cy={size/2}
          r={radius}
          {...{strokeWidth}}
        />
        </Svg>
      </View>
    );
  }
}

export default CircularProgressBar
