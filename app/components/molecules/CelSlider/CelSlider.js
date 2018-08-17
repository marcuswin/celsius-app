import React, {Component} from 'react';
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity } from 'react-native';
// import {} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
// import {STYLES} from "../../config/constants/style";
import CelSliderStyle from "./CelSlider.styles";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class CelSlider extends Component {
  static propTypes = {
    field: PropTypes.string.isRequired,
    // array of { label, value } objects
    items: PropTypes.instanceOf(Array).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    margin: PropTypes.string,
  }

  static defaultProps = {
    margin: '0 0 0 0',
  }

  // lifecycle methods
  // event hanlders
  // rendering methods
  renderSliderElement = (item, index, items) => {
    const { value, actions, field } = this.props;
    const width = 100 / items.length;

    const circleStyle = item.value === value ? CelSliderStyle.activeCircle : CelSliderStyle.inactiveCircle;
    const textStyle = item.value === value ? CelSliderStyle.activeText : CelSliderStyle.inactiveText;

    return (
      <TouchableOpacity
        key={item.value}
        style={{ width: `${width}%`, alignItems: 'center' }}
        onPress={() => actions.updateFormField(field, item.value)}
      >
        <View style={circleStyle} />
        <Text style={textStyle}>{ item.label }</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { items } = this.props;
    return (
      <View style={CelSliderStyle.wrapper}>
        { items.map(this.renderSliderElement) }
      </View>
    );
  }
}

export default CelSlider;
