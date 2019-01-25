import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import HomeStyle from "./Home.styles";
import CircleButton from "../../atoms/CircleButton/CircleButton";
import STYLES from "../../../constants/STYLES";
import CelText from "../../atoms/CelText/CelText";

@connect(
  state => ({
    style: HomeStyle(state.ui.theme),
    theme: state.ui.theme,
    appInitialized: state.app.appInitialized
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class Home extends Component {
  static navigationOptions = {
    title: 'Home Screen',
  };

  async componentWillMount() {
    const { actions, appInitialized } = this.props;
    if (!appInitialized) actions.initCelsiusApp();
  }

  render() {
    const { style, actions, theme } = this.props;
    return (
      <View style={[style.container, style.content]}>
        <CelText color="red">Welcome to Home Screen</CelText>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <CircleButton icon={theme === 'light' ? 'Close' : false} theme={theme} type="Theme" style={{ backgroundColor: '#fff' }} onPress={() => { actions.setAppTheme('light') }} />
          <CircleButton icon={theme === 'dark' ? 'Close' : false} theme={theme} type="Theme" style={[{ backgroundColor: STYLES.COLORS.DARK }, theme === 'dark' ? { borderWidth: 1 } : {}]} onPress={() => { actions.setAppTheme('dark') }} />
        </View>
      </View>
    );
  }
}

export default Home;
