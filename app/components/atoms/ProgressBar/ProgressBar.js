import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import testUtil from "../../../utils/test-util";

import ProgressBarStyle from "./ProgressBar.styles";
import { THEMES } from '../../../constants/UI';

class ProgressBar extends Component {

  static propTypes = {
    theme: PropTypes.oneOf(Object.values(THEMES)).isRequired,
    steps: PropTypes.number.isRequired,
    currentStep: PropTypes.number.isRequired,
    width: PropTypes.number

  };
  static defaultProps = {
    theme: THEMES.LIGHT,
  }

  renderSteps = () => {
    const { steps, currentStep, theme } = this.props
    const style = ProgressBarStyle(theme)
    const views = [];

    for (let step = 1; step <= steps; step++) {
      let stepView;
      const stepViewStyle = [{ flex: 1 / (steps) }];
      if (step <= currentStep) {
        stepViewStyle.push(style.colored)
        if (step === 1) stepViewStyle.push(style.radiusLeft)
        if (step === steps) stepViewStyle.push(style.radiusRight)
        stepView = <View style={stepViewStyle} key={step} />
      } else {
        stepViewStyle.push(style.nonColor)
        if (step === steps) stepViewStyle.push(style.radiusRight)
        stepView = <View style={stepViewStyle} key={step} />
      }
      views.push(stepView)
    }
    return views;
  }

  render() {
    const { theme } = this.props
    const style = ProgressBarStyle(theme)
    const Steps = this.renderSteps;
    return (
      <View style={style.container}>
        <Steps />
      </View>
    );
  }
}

export default testUtil.hookComponent(ProgressBar);
