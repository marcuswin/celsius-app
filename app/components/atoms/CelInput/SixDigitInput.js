import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import {Input} from 'native-base';

import {KEYBOARD_TYPE} from "../../../config/constants/common";
import { FONT_SCALE, GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";

class SixDigitInput extends Component {

  static propTypes = {
    theme: PropTypes.oneOf(['blue', 'white']),
    onChange: PropTypes.func.isRequired,
    editable: PropTypes.bool,
    value: PropTypes.string,
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
  handleChange = (text) => {
    if (text.length <= 6) {
      this.props.onChange(text);
    }
  }
  // rendering methods
  render() {

    const { editable, value, theme } = this.props;

    return (
      <View style={[globalStyles.inputWrapper, globalStyles[`${theme}InputWrapper`], { paddingTop: 0, paddingBottom: 0 }]}>
        <Input
          style={[globalStyles.input, globalStyles[`${theme}InputTextColor`], { fontSize: FONT_SCALE * 40, textAlign: 'center', letterSpacing: 10, height: 50 }]}
          spacing={30}
          underlineColorAndroid='rgba(0,0,0,0)'
          underline={false}
          maxLength={6}
          editable={editable}
          keyboardType={KEYBOARD_TYPE.NUMERIC}
          onChangeText={this.handleChange}
          value={value || ''}
        />
      </View>
    );
  }
}

export default SixDigitInput;
