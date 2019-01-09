// TODO(fj) move to CelInput if not used elsewhere or atom library
// TODO(fj) rename to InputError

import React, { Component } from "react";
import { View, Text } from "react-native";

import PropTypes from "prop-types";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import stylesUtil from "../../../utils/styles-util";
import testUtil from "../../../utils/test-util";

class InputErrorWrapper extends Component {
  static propTypes = {
    theme: PropTypes.oneOf(["blue", "white"]),
    error: PropTypes.string,
    margin: PropTypes.string,
    field: PropTypes.string.isRequired,
    onlyError: PropTypes.bool
  };

  static defaultProps = {
    theme: "blue",
    margin: '0 0 15 0',
    onlyError: false
  };




  render() {
    const { error, theme, margin, onlyError, field } = this.props;
    const margins = stylesUtil.getMargins(margin);

    if (error) margins.bottom = 0;

    return (
      <View style={[margins, error && !onlyError ? { paddingBottom: 20 } : null]}>
        <View style={[error ? [globalStyles.errorInputWrapper] : null]}>
          {this.props.children}
        </View>
        {error && !onlyError ? <Text ref={testUtil.generateTestHook(this, `InputErrorWrapper.${field}`)} style={globalStyles[`${theme}ErrorText`]}>* {error}</Text> : null}
      </View>
    );
  }
}

export default testUtil.hookComponent(InputErrorWrapper);
