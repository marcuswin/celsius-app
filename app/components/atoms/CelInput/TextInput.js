import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Animated, View, Easing, Text, TextInput } from "react-native";
// import { Input } from "native-base";

import { GLOBAL_STYLE_DEFINITIONS as globalStyles, STYLES as colors } from "../../../config/constants/style";
import {AUTO_CAPITALIZE, KEYBOARD_TYPE} from "../../../config/constants/common";
import testUtil from "../../../utils/test-util";

// const {ENV} = Constants.manifest.extra;

class CelTextInput extends Component {
  static propTypes = {
    theme: PropTypes.oneOf(['blue', 'white']),

    // inherited from CelInput
    labelText: PropTypes.string,
    floatingLabel: PropTypes.bool,
    // for Input
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onLayout: PropTypes.func,
    editable: PropTypes.bool,
    maxLength: PropTypes.number,
    testSelector: PropTypes.string,
    isPassword: PropTypes.bool,
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
    isPassword: false,
    returnKeyType: null,
    editable: true,
    testSelector: null,
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

  getInputRef = () => {
    const {testSelector} = this.props;

    // if (testSelector) {
    //   return testUtil.generateTestHook(testSelector, ref => { this.input = ref });
    // }

    testUtil.generateTestHook(testSelector);
    return ref => { this.input = ref };
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

  saveLayout = () => {
    this.input.measureInWindow((x, y, width, height) => {
      this.props.onLayout({ x, y, width, height });
    })
  }


  // rendering methods
  render() {
    const { theme, editable, maxLength, secureTextEntry, keyboardType, multiline, autoCapitalize, autoCorrect, spellCheck, placeholder, labelText, value, onFocus, returnKeyType, isPassword} = this.props;
    const { active } = this.state;
    const isActiveInput = value || active;

    let label = labelText || placeholder;
    label = (isActiveInput) ? label.toUpperCase() : label;

    const labelStyles = { ...globalStyles.inputLabel, ...globalStyles[`${theme}InputTextColor`] };

    if (isActiveInput) {
      this.animateLabel(10);
    } else {
      this.animateLabel(20);
    }

    const inputBackground = isActiveInput ? globalStyles[`${theme}InputWrapperActive`] : globalStyles[`${theme}InputWrapper`];
    const disabledStyles = !editable ? globalStyles[`${theme}InputWrapperDisabled`] : {};
    const additionalTextInputStyle = isPassword ? {} : globalStyles.nonPasswordInputStyle;

    return (
      <View style={[globalStyles.inputWrapper, inputBackground, disabledStyles ]}>
        <TextInput
          style={[globalStyles.input, globalStyles[`${theme}InputTextColor`], additionalTextInputStyle]}
          underlineColorAndroid={'rgba(0,0,0,0)'}
          underline={false}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
          editable={editable}
          ref={this.getInputRef()}
          onLayout={ () => this.saveLayout()}
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
        <Animated.View pointerEvents={'none'} style={{
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
          }, {
            translateX: this.state.animatedValue.interpolate({
              inputRange: [10, 20],
              outputRange: [-100, 0],
            }),
          }],
        }}>
          <Text style={labelStyles}>{ label }</Text>
        </Animated.View>
      </View>
    )
  }
}

export default testUtil.hookComponent(CelTextInput);
