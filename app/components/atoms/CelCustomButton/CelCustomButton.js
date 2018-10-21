import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";

// import {STYLES} from "../../config/constants/style";
import CelCustomButtonStyle from "./CelCustomButton.styles";
import Icon from "../Icon/Icon";


const buttonColors = ["blue", "white"];
const buttonSizes = ["small", "normal", "large"];

class CelCustomButton extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    iconRight: PropTypes.string,
    iconLeft: PropTypes.string,
    titleIcon: PropTypes.string,
    color: PropTypes.oneOf(buttonColors),
    iconRightColor: PropTypes.string,
    iconLeftColor: PropTypes.string,
    IconLeftHeight: PropTypes.string,
    IconRightHeight: PropTypes.string,
    size: PropTypes.oneOf(buttonSizes),
    value: PropTypes.string,
    title: PropTypes.string,
    titleColor: PropTypes.string,
    explanation: PropTypes.string,
    explanationColor: PropTypes.string,
    margin: PropTypes.string,
    disabled: PropTypes.bool,
    activated: PropTypes.bool
  };

  static defaultProps = {
    color: "white",
    size: "normal",
    margin: "0 0 0 0",
    iconRight: true
  };

  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };
    // binders
  }

  // rendering methods
  renderTitle() {
    const { title, titleColor } = this.props;
    return (
      <Text style={[CelCustomButtonStyle.title, { color: titleColor }]}>{title}</Text>
    );
  }

  renderExplanation() {
    const { explanation, explanationColor } = this.props;
    return (
      <Text style={[CelCustomButtonStyle.explanation, { color: explanationColor }]}>{explanation}</Text>
    );
  }

  renderValue() {
    const { value } = this.props;

    return (
      <Text style={CelCustomButtonStyle.value}>{value}</Text>
    );
  }

  renderIconLeft() {
    const { iconLeft, iconLeftColor, iconLeftHeight } = this.props;

    return (
      <Icon
        name={iconLeft}
        height={iconLeftHeight}
        viewBox='0 0 35 45'
        fill={iconLeftColor}
      />
    );
  }

  renderIconRight() {
    const { iconRight, iconRightColor, iconRightHeight } = this.props;

    return (
      <Icon
        name={iconRight}
        height={iconRightHeight}
        viewBox='0 0 26 26'
        fill={iconRightColor}
      />
    );
  }

  renderNormal() {
    const { iconRight, children, value, color } = this.props;

    return (
      <View style={[CelCustomButtonStyle.normalButton, { backgroundColor: color }]}>

        <View>
          <Text style={CelCustomButtonStyle.buttonName}>{children}</Text>
        </View>

        <View style={CelCustomButtonStyle.valueIcon}>
          {value ? this.renderValue() : null}
          <View style={CelCustomButtonStyle.valueIconRight}>
          {iconRight ? this.renderIconRight() : null}
          </View>
        </View>

      </View>
    );
  }

  renderLarge() {
    const { iconRight, color, title, explanation, iconLeft, activated} = this.props;

    return (
      <View style={[CelCustomButtonStyle.largeButton, { backgroundColor: color }]}>

        <View style={CelCustomButtonStyle.iconLeft}>
          {iconLeft ? this.renderIconLeft() : null}
        </View>

        <View style={CelCustomButtonStyle.buttonTextWrapper}>

          {activated ? <Text style={CelCustomButtonStyle.activated}>ACTIVE</Text> : null}

          <View style={CelCustomButtonStyle.titleIcon}>
            {title ? this.renderTitle() : null}
            <View style={CelCustomButtonStyle.largeButtonRightIcon}>
              {iconRight ? this.renderIconRight() : null}
            </View>
          </View>

          <View>
            {explanation ? this.renderExplanation() : null}
          </View>

        </View>

      </View>
    );
  }

  render() {
    const { onPress, size } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
      >
        {size === "large" && this.renderLarge()}
        {size === "normal" && this.renderNormal()}
      </TouchableOpacity>
    );
  }
}

export default CelCustomButton;
