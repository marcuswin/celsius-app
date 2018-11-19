import React, { Component } from "react";
import { Dimensions, Text, TextInput, View } from "react-native";

import PinInputStyle from "./PinInput.styles";
import { KEYBOARD_TYPE } from "../../../config/constants/common";
import { FONT_SCALE, GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";

const PinTextFontSizeMap = {
  4: FONT_SCALE * 40,
  5: FONT_SCALE * 28,
  6: FONT_SCALE * 22,
};

// Please don't hate me for the name, we can rename it when we remove PinInput. :)
class PinInput extends Component {
  constructor() {
    super();

    this.state = {
      active: false,
      deactivateTimeout: null,
    };
  }

  /**
   * @param {string} value
   * @param {number} index
   * @return {string}
   */
  getDigitValue = (value, index) => {
    const {showDigits, value: inputValue} = this.props;
    const {active} = this.state;

    if (showDigits && value || (index === inputValue.length && active)) {
      return value;
    }

    if (value) {
      return '•'
    }

    return '';
  };

  componentWillDismount() {
    const {deactivateTimeout} = this.state;

    if (deactivateTimeout) {
      clearTimeout(deactivateTimeout);
    }
  }

  saveLayout = () => {
    this.input.measureInWindow((x, y, width, height) => {
      this.props.onLayout({ x, y, width, height });
    });
  };

  handlePinChange = text => {
    const { digits, onChange } = this.props;

    onChange(text);

    if (digits === text.length) {
      this.input.blur();
    }
  };

  handleInputBlur = () => {
    const timeout = setTimeout(() => {
      this.setState({
        active: false,
        deactivateTimeout: null,
      });
    }, 500);

    this.setState({ deactivateTimeout: timeout});

    const {onBlur} = this.props;

    if (onBlur) {
      onBlur();
    }
  };

  render() {
    const { digits, value, onFocus, theme } = this.props;
    const { active } = this.state;
    const isActiveInput = value || active;

    const width = Dimensions.get("window").width - 72;

    const pinSize = (width - 12 * (digits - 1)) / digits;

    const digitWrapperStyle = {
      width: pinSize,
      height: pinSize
    };

    const pinInputStyle = {
      width,
      height: pinSize
    };

    const pinTextStyle = {
      fontSize: FONT_SCALE * 16,
      ...globalStyles[`${theme}InputTextColor`],
    };

    if (PinTextFontSizeMap[digits]) {
      pinTextStyle.fontSize = PinTextFontSizeMap[digits];
    }

    const digitsMap = [...Array(digits)].map((mapValue, index) => ({
      active: (index === value.length || (value.length === digits && index + 1 === digits)) && active,
      index: index + 1,
      value: value[index]
    }));

    const digitBackgroundStyle = isActiveInput ? globalStyles[`${theme}InputWrapperActive`] : globalStyles[`${theme}InputWrapper`];

    return (
      <View style={PinInputStyle.container}>
        <View style={PinInputStyle.digitsWrapper}>
          {digitsMap.map(digit =>
            <View key={digit.index}
                  style={[
                    PinInputStyle.digitWrapper,
                    digitWrapperStyle,
                    digitBackgroundStyle,
                    digit.active ? PinInputStyle.digitWrapperActive : {},
                  ]}>
              <Text style={[PinInputStyle.digitText, pinTextStyle]}>
                {this.getDigitValue(digit.value, digit.index)}
              </Text>
            </View>
          )}
        </View>
        <TextInput style={[PinInputStyle.digitInput, pinInputStyle]}
                   value={value}
                   maxLength={digits}
                   ref={ref => {
                     this.input = ref;
                   }}
                   onLayout={() => this.saveLayout()}
                   keyboardType={KEYBOARD_TYPE.NUMERIC}
                   onChangeText={this.handlePinChange}
                   onFocus={() => {
                     if (onFocus) {
                       onFocus();
                     }
                     this.setState({ active: true });
                   }}
                   onBlur={this.handleInputBlur}/>
      </View>
    );
  }
}

export default PinInput;
