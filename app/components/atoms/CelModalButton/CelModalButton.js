import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, View } from "react-native";

import CelModalButtonStyle from "./CelModalButton.styles";
import STYLES from "../../../constants/STYLES";
import CelText from "../CelText/CelText";

class CelModalButton extends Component {
  static propTypes = {
    position: PropTypes.oneOf(["single", "middle", "left", "right"]).isRequired,
    onPress: PropTypes.func,
    buttonStyle: PropTypes.oneOf([
      "basic",
      "secondary",
      "disabled",
      "red",
      "green",
      "white",
    ]),
  };
  static defaultProps = {
    buttonStyle: "basic",
    position: "single",
  };

  handleButtonStyle = () => {
    const { buttonStyle } = this.props;

    switch (buttonStyle) {
      case "secondary":
        return {
          backgroundColor: STYLES.COLORS.LIGHT_GRAY,
        };
      case "red":
        return {
          backgroundColor: STYLES.COLORS.RED,
        };
      case "disabled":
        return {
          backgroundColor: STYLES.COLORS.DISABLED_BASIC_BUTTON25,
        };
      case "green":
        return {
          backgroundColor: STYLES.COLORS.GREEN,
        };
      case "white":
        return {
          backgroundColor: STYLES.COLORS.WHITE,
        };
      default:
        return {
          backgroundColor: STYLES.COLORS.CELSIUS_BLUE,
        };
    }
  };

  handleBorderRadius = () => {
    const { position } = this.props;

    switch (position) {
      case "single":
        return {
          borderRadius: 8,
        };
      case "left":
        return {
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
        };
      case "right":
        return {
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
        };
      default:
        return null;
    }
  };

  render() {
    const { children, onPress, buttonStyle } = this.props;
    const style = CelModalButtonStyle();
    const borderRadius = this.handleBorderRadius();
    const buttonColor = this.handleButtonStyle();
    const textColor =
      buttonStyle === "basic" ||
      buttonStyle === "red" ||
      buttonStyle === "disabled" ||
      buttonStyle === "green"
        ? STYLES.COLORS.WHITE
        : STYLES.COLORS.DARK_GRAY;

    return (
      <View style={style.container}>
        <TouchableOpacity
          style={[style.buttonStyle, borderRadius, buttonColor]}
          onPress={buttonStyle !== "disabled" ? onPress : null}
          disabled={buttonStyle === "disabled"}
        >
          <CelText color={textColor} type={"H4"} weight={"500"}>
            {children}
          </CelText>
        </TouchableOpacity>
      </View>
    );
  }
}

export default CelModalButton;
