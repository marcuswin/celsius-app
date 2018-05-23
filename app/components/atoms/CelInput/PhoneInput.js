import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
// import {} from 'native-base';

// import {STYLES} from "../../config/constants/style";
// import CelInputStyle from "./CelInput.styles";
import {AUTO_CAPITALIZE, KEYBOARD_TYPE} from "../../../config/constants/common";

class CelInput extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['text', 'number', 'phone', 'password', 'six-digit']),
    theme: PropTypes.oneOf(['blue', 'white']),

    // inherited from CelInput
    labelText: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onPress: PropTypes.func,
    editable: PropTypes.bool,
    maxLength: PropTypes.number,
    secureTextEntry: PropTypes.bool,
    keyboardType: PropTypes.string,
    multiline: PropTypes.bool,
    floatingLabel: PropTypes.bool,
    autoCapitalize: PropTypes.string,
    autoCorrect: PropTypes.bool,
    spellCheck: PropTypes.bool,
    value: PropTypes.string,
    // type: PropTypes.oneOf(["primary", "secondary"]),
  }

  static defaultProps = {
    type: 'text',
    theme: 'blue',
    // inherited from CelInput
    editable: true,
    maxLength: 100,
    keyboardType: KEYBOARD_TYPE.DEFAULT,
    multiline: false,
    floatingLabel: true,
    autoCapitalize: AUTO_CAPITALIZE.NONE,
    autoCorrect: false,
    spellCheck: false,
    value: '',
    placeholder: ''
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
  render() {
    return (
      <View>
        <Text>Hello</Text>
      </View>
    );
  }
}

export default CelInput;
