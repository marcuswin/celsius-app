import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import testUtil from "../../../utils/test-util";
import { COLORS, FONT_SCALE } from "../../../config/constants/style";

class Steps extends Component {
  static propTypes = {
    current: PropTypes.number.isRequired,
    totalSteps: PropTypes.number.isRequired,
  }

  // rendering methods
  renderStep = (value) => {
    const { totalSteps, current } = this.props;
    let wrapperStyle = current >= value ? styles.circleActive : styles.circleInactive;
    wrapperStyle = totalSteps === current && value === current ? styles.circleFinal : wrapperStyle
    let outerCircleStyle = value === current ? styles.outerCircleBlue : styles.outerCircleWhite;
    outerCircleStyle = totalSteps === current && value === current ? styles.outerCircleFinal : outerCircleStyle;
    return (
      <View style={outerCircleStyle} key={value}>
        <View style={wrapperStyle}>
          <Text style={styles.text}>{value}</Text>
        </View>
      </View>
    )
  }

  render() {
    const { totalSteps } = this.props;
    const steps = [];
    for (let i = 1; i <= totalSteps; i++) steps.push(i);
    return (
      <View style={styles.wrapper}>
        {steps.map(this.renderStep)}
      </View>
    );
  }
}

const circle = {
  width: 32,
  height: 32,
  borderRadius: 16,
  justifyContent: 'center',
  alignItems: 'center'
}

const outerCircle = {
  width: 40,
  height: 40,
  borderRadius: 20,
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 2,
}

const styles = {
  outerCircleWhite: {
    ...outerCircle,
    borderColor: 'white',
  },
  outerCircleBlue: {
    ...outerCircle,
    borderColor: COLORS.blue,
  },
  outerCircleFinal: {
    ...outerCircle,
    borderColor: COLORS.green,
  },
  text: {
    color: 'white',
    fontFamily: 'agile-medium',
    fontSize: 21,
  },
  circleActive: {
    ...circle,
    backgroundColor: COLORS.blue,
  },
  circleInactive: {
    ...circle,
    backgroundColor: 'rgba(137,144,153,0.3)',
  },
  circleFinal: {
    ...circle,
    backgroundColor: COLORS.green,
  },
  wrapper: {
    height: FONT_SCALE * 65,
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    zIndex: 10,
    marginLeft: -40,
    marginRight: -40,
  },
}

export default testUtil.hookComponent(Steps);
