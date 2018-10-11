import React, { Component } from "react";
import { Dimensions, Text, TextInput, View } from "react-native";
import { hook } from 'cavy';

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
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };
  }

  // Component graber for cavy
  getInputRef = () => {
    const {generateTestHook, testSelector} = this.props;

    if (testSelector) {
      return generateTestHook(testSelector, ref => { this.input = ref });
    }

    return ref => { this.input = ref };
  }

  getDigitValue = value => {
    const {showDigits} = this.props;

    if (showDigits && value) {
      return value;
    }

    if (value) {
      return '•'
    }

    return '';
  };

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
      index: index + 1,
      value: value[index]
    }));

    const digitBackgroundStyle = isActiveInput ? globalStyles[`${theme}InputWrapperActive`] : globalStyles[`${theme}InputWrapper`];
    
    return (
      <View style={PinInputStyle.container}>
        <View style={PinInputStyle.digitsWrapper}>
          {digitsMap.map(digit =>
            <View 
                  key={digit.index}
                  style={[PinInputStyle.digitWrapper, digitWrapperStyle, digitBackgroundStyle]}>
              <Text style={[PinInputStyle.digitText, pinTextStyle]}>
                {this.getDigitValue(digit.value)}
              </Text>
            </View>
          )}
        </View>
        <TextInput 
                   style={[PinInputStyle.digitInput, pinInputStyle]}
                   testSelector={this.props.testSelector}
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
                   onBlur={() => this.setState({ active: false })}/>
      </View>
    );
  }
}

// export default PinInput;
const TestHook = hook(PinInput)
export default TestHook;