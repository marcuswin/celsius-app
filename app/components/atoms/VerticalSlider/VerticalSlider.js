import React, { Component } from 'react';
import { View, TouchableOpacity, Slider } from 'react-native';

import testUtil from "../../../utils/test-util";

import VerticalSliderStyle from "./VerticalSlider.styles";
import STYLES from '../../../constants/STYLES';

class VerticalSlider extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);

    this.state = {
      currentStep: 0
    };
  }

  render() {
    // const { currentStep } = this.state;
    const { values, currentStep } = this.props;
    const style = VerticalSliderStyle();
    return (
      <View style={style.container}>
        <View style={{ height: values.length - 1 * 56, width: 40, paddingVertical: 10 }}>
          <View style={{ transform: [{ rotate: '90deg' }] }}>
            <Slider minimumTrackTintColor={STYLES.COLORS.CELSIUS_BLUE} maximumTrackTintColor={STYLES.COLORS.DARK_GRAY_OPACITY} style={{ width: 5 * 56, height: 40 }} orientation="vertical" minimumValue={0} maximumValue={5} step={1} value={currentStep} onValueChange={this.props.onChange} />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {values.map((value, index) => (
            <TouchableOpacity key={`value-${index}`} style={{ height: 50, justifyContent: 'center' }} onPress={() => this.props.onChange(index)}>
              {value}
            </TouchableOpacity>
          ))}
        </View>
      </View >
    );
  }
}

export default testUtil.hookComponent(VerticalSlider);
