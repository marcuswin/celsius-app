import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as actions from "../../../redux/actions";
import RadioButtonsStyle from "./RadioButtons.styles";

@connect(
  () => ({}),
  dispatch => bindActionCreators(actions, dispatch),
)
class RadioButtons extends Component {
  static propTypes = {
    field: PropTypes.string.isRequired,
    // array of { label, value } objects
    items: PropTypes.instanceOf(Array).isRequired,
    margin: PropTypes.string,
  }

  static defaultProps = {
    margin: '0 0 0 0',
  }
  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };
    // binders
  }

  // lifecycle methods
  // event hanlders
  // rendering methods
  renderRadioButtonEl = (item, index, allItems) => {
    const { updateFormField, field, value } = this.props;
    const buttonStyles = [];
    const textStyles = [];

    if (index === 0) {
      buttonStyles.push(RadioButtonsStyle.firsButton);
    } else if (index === allItems.length - 1) {
      buttonStyles.push(RadioButtonsStyle.lastButton);
    } else {
      buttonStyles.push(RadioButtonsStyle.button);
    }

    if (item.value === value) {
      textStyles.push(RadioButtonsStyle.textActive);
      buttonStyles.push(RadioButtonsStyle.buttonActive);
    } else {
      textStyles.push(RadioButtonsStyle.textInactive);

    }

    return (
      <TouchableOpacity key={item.label} style={buttonStyles} onPress={() => updateFormField(field, item.value)}>
        <Text style={textStyles}>
          { item.label }
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { items } = this.props;
    return (
      <View style={RadioButtonsStyle.wrapper}>
        { items.map(this.renderRadioButtonEl) }
      </View>
    );
  }
}

export default RadioButtons;
