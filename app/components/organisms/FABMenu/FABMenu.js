import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
// import FABMenuStyle from "./FABMenu.styles";

@connect(
  () => ({
    // map state to props
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class FABMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>Hello FABMenu</Text>
      </View>
    );
  }
}

export default FABMenu;
