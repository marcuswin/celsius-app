import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import HomeStyle from "./Home.styles";

// import style from "./style.styles";

@connect(
  state => ({
    style: HomeStyle(state.ui.theme),
    appInitialized: state.app.appInitialized
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class Home extends Component {
  async componentWillMount() {
    const { actions, appInitialized } = this.props;
    if (!appInitialized) actions.initCelsiusApp();
  }

  render() {
    const { style } = this.props;
    return (
      <View style={[style.container, style.content]}>
        <Text style={{ color: "red" }}>Welcome to Home Screen</Text>
      </View>
    );
  }
}

export default Home;
