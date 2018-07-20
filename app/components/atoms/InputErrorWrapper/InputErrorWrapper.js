import React, { Component } from "react";
import { View, Text } from "react-native";

import PropTypes from "prop-types";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import stylesUtil from "../../../utils/styles-util";

class InputErrorWrapper extends Component {
  static propTypes = {
    theme: PropTypes.oneOf(["blue", "white"]),
    error: PropTypes.string,
    margin: PropTypes.string,
  };

  static defaultProps = {
    theme: "blue",
    margin: '0 0 15 0',
  };



  render() {
    const { error, theme, margin } = this.props;
    const margins = stylesUtil.getMargins(margin);

    if (error) margins.bottom = 0;

    return (
      <View style={margins}>
        <View style={[error ? [globalStyles.errorInputWrapper] : null, { marginBottom: 20 }]}>
          {this.props.children}
        </View>
        {error ? <Text style={globalStyles[`${theme}ErrorText`]}>* {error}</Text> : null}
      </View>
    );
  }
}

export default InputErrorWrapper;
