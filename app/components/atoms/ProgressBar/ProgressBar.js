import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import testUtil from "../../../utils/test-util";

import ProgressBarStyle from "./ProgressBar.styles";

class ProgressBar extends Component {

  static propTypes = {
    theme: PropTypes.oneOf(["light", "dark", "celsius"]).isRequired,
    steps: PropTypes.number.isRequired,
    currentStep: PropTypes.number.isRequired,
    width: PropTypes.number

  };
  static defaultProps = {
    theme: "light",
  }

  renderSteps = () => {
    const { steps, currentStep, theme } = this.props
    const style = ProgressBarStyle(theme)
    const views = [];

    for (let step = 1; step <= steps; step++) {
      let stepView;
      if (step <= currentStep) {
        stepView = <View style={[style.colored, { flex: 1 / (steps) }, step === 1 ? style.radiusLeft : step === steps && style.radiusRight]} key={step} />
      } else {
        stepView = <View style={[style.nonColor, { flex: 1 / (steps) }, step === steps && style.radiusRight]} key={step} />
      }
      views.push(stepView)
    }
    return views;
  }

  render() {
    const { theme } = this.props
    const style = ProgressBarStyle(theme)
    return (
      <View style={style.container}>
        {this.renderSteps()}
      </View>
    );
  }
}

export default testUtil.hookComponent(ProgressBar);
