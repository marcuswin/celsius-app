import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Animated, View, Easing } from "react-native";
import { Input } from "native-base";

import { GLOBAL_STYLE_DEFINITIONS as globalStyles, STYLES as colors, FONT_SCALE } from "../../../config/constants/style";
import {AUTO_CAPITALIZE, KEYBOARD_TYPE} from "../../../config/constants/common";

const ACTIVE_LABEL_TOP = 8;
const INACTIVE_LABEL_TOP = 18;
const ACTIVE_LABEL_SIZE = FONT_SCALE * 12;
const INACTIVE_LABEL_SIZE = FONT_SCALE * 20;

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
      labelTop: new Animated.Value(this.props.value ? ACTIVE_LABEL_TOP : INACTIVE_LABEL_TOP),
      labelFontSize: new Animated.Value(this.props.value ? ACTIVE_LABEL_SIZE : INACTIVE_LABEL_SIZE),
    }
  }

  animateLabel(top, fontSize) {
    Animated.parallel([
      Animated.timing(
        this.state.labelTop,
        {
          toValue: top,
          easing: Easing.out(Easing.quad),
          duration: 300,
        }
      ),
      Animated.timing(
        this.state.labelFontSize,
        {
          toValue: fontSize,
          easing: Easing.out(Easing.quad),
          duration: 300,
        }
      ),
    ]).start();
  }

  // rendering methods
  render() {
    const { theme, editable, maxLength, secureTextEntry, keyboardType, multiline, autoCapitalize, autoCorrect, spellCheck, placeholder, labelText, value, onFocus, returnKeyType} = this.props;
    const { active } = this.state;

    let label = labelText || placeholder;
    label = (value || active) ? label.toUpperCase() : label;

    let labelStyles = value || active ? globalStyles.inputLabelActive : globalStyles.inputLabelInactive;
    labelStyles = { ...labelStyles, ...globalStyles[`${theme}InputTextColor`] };

    if (value || active) {
      this.animateLabel(ACTIVE_LABEL_TOP, ACTIVE_LABEL_SIZE);
    } else {
      this.animateLabel(INACTIVE_LABEL_TOP, INACTIVE_LABEL_SIZE);
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
              left: 18,
              zIndex: 2,
              position: 'absolute',
              top: this.state.labelTop,
            }} pointerEvents="none">
              <Animated.Text style={{
                ...labelStyles,
                fontSize: this.state.labelFontSize
              }}>{ label }</Animated.Text>
            </Animated.View>
      </View>
    )
  }
}

export default TextInput;
