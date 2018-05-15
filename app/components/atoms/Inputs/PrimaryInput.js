import React, {Component} from 'react';
import {Input, Item, Label, Text, View} from "native-base";
import PropTypes from "prop-types";

import PrimaryInputStyles from './Inputs.styles';
import SecondaryInputStyles from './SecondaryInput.styles';
import {AUTO_CAPITALIZE, KEYBOARD_TYPE} from "../../../config/constants/common";

class PrimaryInput extends Component {
  static propTypes = {
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
    type: PropTypes.oneOf(["primary", "secondary"]),
  };

  static defaultProps = {
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
  };

  constructor(props) {
    super();

    this.state = {
      inputLabel: '',
      focused: false,
      secureTextEntry: false,
      value: props.value,
      top: -2
    };
  }

  // Component Lifecycle Methods
  componentDidMount() {
    const {labelText} = this.props;
    this.setState({inputLabel: labelText.toUpperCase()});
  }

  componentWillReceiveProps(nextProps) {
    // update value if it is changed externally (ex. from dropdown)
    const {value} = this.state;
    if (value !== nextProps.value) {
      this.setState({value: nextProps.value})
    }
  }

  // Event Handlers
  onChangeText = (text) => {
    this.props.onChange(text);
  };

  onBlur = () => {
    const {value} = this.state;

    if (value) {
      this.setState({focused: false});
    } else {
      this.setState({focused: false, top: -2});
    }
    this.renderLabelText()
  };

  onFocus = () => {
    const {clickable, onPress} = this.props;

    if (clickable) {
      onPress();
    } else {
      this.setState({focused: true, top: 8});
      this.renderLabelText()
    }
  };

  // Render methods
  renderLabelText = () => {
    const {labelText} = this.props;
    const inputLabel = this.props.labelText.toUpperCase()
    const {value, focused, top} = this.state;
    const InputStyles = (this.props.type !== 'secondary') ? PrimaryInputStyles : SecondaryInputStyles;

    let text = labelText;
    let fontSize = 18;
    let positionTop = top;

    if (value || focused) {
      text = inputLabel;
      fontSize = 12;
      positionTop = 8
    }

    return (
      <Label style={{top: positionTop}}>
        <Text style={[InputStyles.label, {fontSize}]}>{text}</Text>
      </Label>
    )
  };

  render() {
    const {
      editable,
      maxLength,
      secureTextEntry,
      keyboardType,
      multiline,
      floatingLabel,
      autoCapitalize,
      autoCorrect,
      spellCheck,
      placeholder,
      type,
    } = this.props;
    const InputStyles = (type !== 'secondary') ? PrimaryInputStyles : SecondaryInputStyles;
    return (
      <View style={InputStyles.wrapper}>
        <Item style={InputStyles.item} floatingLabel={floatingLabel}>
          {this.renderLabelText()}
          <Input
            style={InputStyles.input}
            underlineColorAndroid='rgba(0,0,0,0)'
            underline={false}
            placeholder={this.state.focused ? placeholder : ''}
            placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
            maxLength={maxLength}
            autoCapitalize={autoCapitalize}
            editable={editable}
            autoCorrect={autoCorrect}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            multiline={multiline}
            spellCheck={spellCheck}
            onChangeText={this.onChangeText}
            value={this.state.value}
          />
        </Item>
      </View>
    );
  }
}

export default PrimaryInput;
