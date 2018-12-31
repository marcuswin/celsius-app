import React, {Component} from 'react';
import PropTypes from "prop-types";
import { View, Text, Slider } from "react-native";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import { COLORS, GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import stylesUtil from "../../../utils/styles-util";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class CelSlider extends Component {
  static propTypes = {
    field: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['number', 'range']),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    minimumValue: PropTypes.number,
    maximumValue: PropTypes.number,
    step: PropTypes.number,
    onValueChange: PropTypes.func,
    // array of { label, value } objects, value not required
    items: PropTypes.instanceOf(Array),
    margin: PropTypes.string,
  }

  static defaultProps = {
    type: 'number',
    minimumValue: 0,
    value: 0,
    maximumValue: 100,
    step: 1,
    margin: '0 0 0 0',
  }

  constructor(props) {
    super(props)
    const { minimumValue, maximumValue, items, actions, value, field } = props;

    this.state = {
      min: minimumValue || 0,
      max: maximumValue || items.length - 1,
      labels: items.map(i => i.label),
    }

    if (!value) actions.updateFormField(field, minimumValue)
  }

  onChange = (value) => {
    const { actions, field } = this.props;
    actions.updateFormField(field, value)
  }

  render() {
    const { value, step, margin } = this.props;
    const { min, max, labels } = this.state;

    const margins = stylesUtil.getMargins(margin);
    return (
      <View style={margins}>
        <Slider
          minimumValue={min}
          maximumValue={max}
          value={Number(value)}
          step={step}
          onValueChange={this.onChange}
        />

        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          { labels.map(l => <Text key={l} style={[globalStyles.normalText, { color: COLORS.blue }]}>{l}</Text>)}
        </View>
      </View>
    );
  }
}

export default CelSlider;
