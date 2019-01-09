// TODO(fj): not used anywhere?

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import RadioButtonsStyle from "./RadioButtons.styles";

const themeColors = {
  blue: '#7A89C0',
  grey: 'rgba(137,144,153,0.5)',
}

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class RadioButtons extends Component {
  static propTypes = {
    field: PropTypes.string.isRequired,
    // array of { label, value } objects
    items: PropTypes.instanceOf(Array).isRequired,
    margin: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    theme: PropTypes.oneOf(['grey', 'blue']),
  }

  static defaultProps = {
    margin: '0 0 0 0',
    theme: 'blue'
  }

  // lifecycle methods
  // event hanlders
  // rendering methods
  renderRadioButtonEl = (item, index, allItems) => {
    const { actions, field, value, theme } = this.props;
    const buttonStyles = [];
    const textStyles = [];

    if (index === 0) {
      buttonStyles.push(RadioButtonsStyle.firstButton, { borderRightColor: themeColors[theme] });
    } else if (index === allItems.length - 1) {
      buttonStyles.push(RadioButtonsStyle.lastButton);
    } else {
      buttonStyles.push(RadioButtonsStyle.button, { borderRightColor: themeColors[theme] });
    }

    if (item.value === value) {
      textStyles.push(RadioButtonsStyle.textActive);
      buttonStyles.push({ backgroundColor: themeColors[theme] });
    } else {
      textStyles.push(RadioButtonsStyle.textInactive, { color: themeColors[theme] });

    }

    return (
      <TouchableOpacity key={item.label} style={buttonStyles} onPress={() => actions.updateFormField(field, item.value)}>
        <Text style={textStyles}>
          { item.label }
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { items, theme } = this.props;
    return (
      <View style={[RadioButtonsStyle.wrapper, { borderColor: themeColors[theme] }]}>
        { items.map(this.renderRadioButtonEl) }
      </View>
    );
  }
}

export default RadioButtons;
