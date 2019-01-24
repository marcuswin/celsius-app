import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import HomeStyle from "./Home.styles";
// import FabMenu from "../../organisms/FabMenu/FabMenu";
import CircleButton from "../../atoms/CircleButton/CircleButton";
import STYLES from "../../../constants/STYLES";

@connect(
  state => ({
    style: HomeStyle(state.ui.theme),
    theme: state.ui.theme,
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
    const { style, actions, theme } = this.props;
    return (
      <View style={[style.container, style.content]}>
        <Text style={{ color: "red" }}>Welcome to Home Screen</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <CircleButton theme={theme} type="Theme" style={{ backgroundColor: '#fff', borderWidth: 2 }} onPress={() => { actions.setAppTheme('light') }} />
          <CircleButton theme={theme} type="Theme" style={{ backgroundColor: STYLES.colors.DARK, borderWidth: 1 }} onPress={() => { actions.setAppTheme('dark') }} />
        </View>
        {/* <FabMenu /> */}
      </View>
    );
  }
}

export default Home;
