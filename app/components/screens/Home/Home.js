import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import HomeStyle from "./Home.styles";
import CircleButton from "../../atoms/CircleButton/CircleButton";
import STYLES from "../../../constants/STYLES";
import CelText from "../../atoms/CelText/CelText";
import CelButton from "../../atoms/CelButton/CelButton";
import ProgressBar from "../../atoms/ProgressBar/ProgressBar";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import Separator from "../../atoms/Separator/Separator";
import CelInput from "../../atoms/CelInput/CelInput";
import stylesUtil from "../../../utils/styles-util";
import { THEMES } from "../../../constants/UI";


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
    const { actions, theme } = this.props;
    return (
      <RegularLayout header={{
        title: "Home"
      }}>
        <View styles={[{ flex: 1 }, stylesUtil.getMargins("0 20 20 20")]}>
          <CelText color="red">Welcome to Home Screen</CelText>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <CircleButton icon={theme === THEMES.LIGHT ? 'Close' : false} theme={theme} type="theme" style={[{ backgroundColor: '#fff', borderWidth: 1 }, theme === THEMES.LIGHT ? {} : { borderColor: 'transparent' }]} onPress={() => { actions.setAppTheme(THEMES.LIGHT) }} />
            <CircleButton icon={theme === THEMES.DARK ? 'Close' : false} theme={theme} type="theme" style={[{ backgroundColor: STYLES.COLORS.DARK_BACKGROUND, borderWidth: 1 }, theme === THEMES.DARK ? {} : { borderColor: 'transparent' }]} onPress={() => { actions.setAppTheme(THEMES.DARK) }} />
            <CircleButton icon={theme === THEMES.CELSIUS ? 'Close' : false} theme={theme} type="theme" style={[{ backgroundColor: STYLES.COLORS.CELSIUS, borderWidth: 1 }, theme === THEMES.CELSIUS ? {} : { borderColor: 'transparent' }]} onPress={() => { actions.setAppTheme(THEMES.CELSIUS) }} />
          </View>

          <View>
            <CelButton onPress={() => { actions.navigateTo('Login') }}>Join Celsius</CelButton>
            <CelButton onPress={() => { actions.navigateTo('Register') }} iconRight="IconArrowRight">Create account</CelButton>
            <CelButton onPress={() => { }} loading>Create account</CelButton>
            <CelButton onPress={() => { }} disabled>Disabled</CelButton>
            <CelButton onPress={() => { }} basic>Logout</CelButton>
          </View>
          <View style={{ height: 50 }}>
            <Separator theme={theme} vertical />
          </View>
          <Separator theme={theme} />
          <Separator theme={theme} text="Crazy" />
          <CelInput field="test" placeholder="input" />
          <View style={{ marginTop: 20 }}>
            <ProgressBar steps={5} currentStep={1} />
          </View>

          <Separator theme={theme} text="Crazy" />
          <View style={{ flex: 1 }}>
            <CelInput field="test" placeholder="input" />
            <CelInput field="test" placeholder="input" />
            <CelInput field="test" placeholder="input" />
            <CelInput field="test" placeholder="input" />
            <CelInput field="test" placeholder="input" />
            <CelInput field="test" placeholder="input" />
            <CelInput field="test" placeholder="input" />
            <CelInput field="test" placeholder="input" />
            <CelInput field="test" placeholder="input" />
            <CelInput field="test" placeholder="input" />
            <CelInput field="test" placeholder="input" />
            <CelInput field="test" placeholder="input" />
            <CelInput field="test" placeholder="input" />
            <CelInput field="test" placeholder="input" />
          </View>
        </View>
      </RegularLayout>
    );
  }
}

export default Home;
