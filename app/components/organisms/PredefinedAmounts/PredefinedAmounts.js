import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';

import testUtil from "../../../utils/test-util";

import PredefinedAmountsStyle from "./PredefinedAmounts.styles";
import CelText from '../../atoms/CelText/CelText';

class PredefinedAmounts extends Component {

  static propTypes = {
    data: PropTypes.instanceOf(Object),
    onSelect: PropTypes.func,
    activePeriod: PropTypes.instanceOf(Object),
  };
  static defaultProps = {
  }


  render() {
    const { data, onSelect, activePeriod } = this.props;
    const style = PredefinedAmountsStyle()
    return (
      <View style={{ flexDirection: "row", justifyContent: 'space-evenly', marginTop: 50 }}>
        {data.map(({ label, value }) =>
          <TouchableOpacity
            key={label}
            style={[style.periodButton, activePeriod.value === value ? style.selectedAmount : null]}
            onPress={() => onSelect({ label, value })}
          >
            <CelText style={activePeriod.label === label ? style.selectedAmountText : null}>{label}</CelText>
          </TouchableOpacity>
        )}
      </View >
    );
  }
}

export default testUtil.hookComponent(PredefinedAmounts);
