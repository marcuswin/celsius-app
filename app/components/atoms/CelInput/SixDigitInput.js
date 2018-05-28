import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import {Input} from 'native-base';

// import {STYLES} from "../../config/constants/style";
import CelInputStyle from "../../../../../celsius-app/app/components/atoms/CelInput/CelInput.styles";
import {KEYBOARD_TYPE} from "../../../../../celsius-app/app/config/constants/common";

class SixDigitInput extends Component {

  static propTypes = {
    theme: PropTypes.oneOf(['blue', 'white']),
    onChange: PropTypes.func.isRequired,
    editable: PropTypes.bool,
    value: PropTypes.string,
    // type: PropTypes.oneOf(["primary", "secondary"]),
  };

  static defaultProps = {
    theme: 'blue',
    // inherited from CelInput
    editable: true,
    value: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };
    // binders
  }

  // lifecycle methods
  // event handlers
  // rendering methods
  render() {

    const { editable, value } = this.props;

    return (
      <View style={CelInputStyle.sixDigitWrapper}>
        <Input
          style={CelInputStyle.sixDigitNumberInput}
          spacing={30}
          underlineColorAndroid='rgba(0,0,0,0)'
          underline={false}
          maxLength={6}
          editable={editable}
          keyboardType={KEYBOARD_TYPE.NUMERIC}
          onChangeText={(text) => this.props.onChange(text)}
          value={value || ''}
        />
      </View>
    );
  }
}

export default SixDigitInput;
