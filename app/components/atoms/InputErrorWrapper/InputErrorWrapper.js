import React, { Component } from "react";
import { View, Text } from "react-native";

import PropTypes from "prop-types";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";

class InputErrorWrapper extends Component {
  static propTypes = {
    theme: PropTypes.oneOf(["blue", "white"]),
    error: PropTypes.string
  };

  static defaultProps = {
    theme: "blue"
  };



  render() {
    const { error, theme } = this.props;

    return (
      <View style={[error ? {marginBottom: 13} : null]}>
        <View style={[error ? [globalStyles.errorInputWrapper] : null, { marginBottom: 20 }]}>
          {this.props.children}
        </View>
        {error ? <Text style={globalStyles[`${theme}ErrorText`]}>* {error}</Text> : null}
      </View>
    );
  }
}

export default InputErrorWrapper;
