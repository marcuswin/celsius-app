import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Animated, View, Easing, Text } from "react-native";
import { Input } from "native-base";

import { GLOBAL_STYLE_DEFINITIONS as globalStyles, STYLES as colors } from "../../../config/constants/style";
import {AUTO_CAPITALIZE, KEYBOARD_TYPE} from "../../../config/constants/common";

class TextInput extends Component {
  static propTypes = {
    theme: PropTypes.oneOf(['blue', 'white']),

    // inherited from CelInput
    labelText: PropTypes.string.isRequired,
    floatingLabel: PropTypes.bool,
    // for Input
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    editable: PropTypes.bool,
    maxLength: PropTypes.number,
    secureTextEntry: PropTypes.bool,
    returnKeyType: PropTypes.string,
    keyboardType: PropTypes.string,
    multiline: PropTypes.bool,
    autoCapitalize: PropTypes.string,
    autoCorrect: PropTypes.bool,
    spellCheck: PropTypes.bool,
  }

  static defaultProps = {
    type: 'text',
    theme: 'blue',
    // inherited from CelInput
    floatingLabel: true,
    // for Input
    value: '',
    placeholder: '',
    returnKeyType: null,
    editable: true,
    maxLength: 100,
    keyboardType: KEYBOARD_TYPE.DEFAULT,
    multiline: false,
    autoCapitalize: AUTO_CAPITALIZE.NONE,
    autoCorrect: false,
    spellCheck: false,
  }

  constructor(props) {
    super(props);

    this.state = {
      active: false,
      animatedValue: new Animated.Value(this.props.value ? 10 : 20),
    }
  }

  animateLabel(value) {
    Animated.timing(
      this.state.animatedValue,
      {
        toValue: value,
        easing: Easing.out(Easing.quad),
        duration: 300,
        useNativeDriver: true,
      }
    ).start();
  }

  // rendering methods
  render() {
    const { theme, editable, maxLength, secureTextEntry, keyboardType, multiline, autoCapitalize, autoCorrect, spellCheck, placeholder, labelText, value, onFocus, returnKeyType} = this.props;
    const { active } = this.state;

    let label = labelText || placeholder;
    label = (value || active) ? label.toUpperCase() : label;

    const labelStyles = { ...globalStyles.inputLabel, ...globalStyles[`${theme}InputTextColor`] };

    if (value || active) {
      this.animateLabel(10);
    } else {
      this.animateLabel(20);
    }

    return (
      <View style={[globalStyles.inputWrapper, globalStyles[`${theme}InputWrapper`]]}>
          <Input
            style={[globalStyles.input, globalStyles[`${theme}InputTextColor`]]}
            underlineColorAndroid='rgba(0,0,0,0)'
            underline={false}
            maxLength={maxLength}
            autoCapitalize={autoCapitalize}
            editable={editable}
            onFocus={() => {
              if (onFocus) onFocus()
              this.setState({ active: true })}
            }
            selectionColor={theme === 'white' ? colors.GRAY_2 : colors.INPUT_COLOR_WHITE }
            onBlur={() => this.setState({ active: false })}
            returnKeyType={returnKeyType}
            autoCorrect={autoCorrect}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            multiline={multiline}
            spellCheck={spellCheck}
            onChangeText={(text) => this.props.onChange(text) }
            value={value || ''}
          />
            <Animated.View style={{
              ...globalStyles.inputLabelWrapper,
              transform: [{
                translateY: this.state.animatedValue.interpolate({
                  inputRange: [10, 20],
                  outputRange: [-12, 0],
                }),
              }, {
                scale: this.state.animatedValue.interpolate({
                  inputRange: [10, 20],
                  outputRange: [0.6, 1],
                }),
              }],
            }}>
              <Text style={labelStyles}>{ label }</Text>
            </Animated.View>
      </View>
    )
  }
}

export default TextInput;
