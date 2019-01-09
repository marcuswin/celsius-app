import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
// import StaticScreenStyle from "./StaticScreen.styles";

@connect(
  () => ({
    // map state to props
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class StaticScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Welcome to StaticScreen Screen</Text>
      </View>
    );
  }
}

export default StaticScreen;
