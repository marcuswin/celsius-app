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
// import Separator from "../../atoms/Separator/Separator";
import CelInput from "../../atoms/CelInput/CelInput";
import CelModal from "../../organisms/CelModal/CelModal";

import UI from "../../../constants/UI";

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
  state = {
    progress: 0.
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
        <React.Fragment>
          <CelText color="red">Welcome to Home Screen</CelText>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <CircleButton icon={theme === 'light' ? 'Close' : false} theme={theme} type="theme" style={[{ backgroundColor: '#fff', borderWidth: 1 }, theme === 'light' ? {} : { borderColor: 'transparent' }]} onPress={() => { actions.setAppTheme('light') }} />
            <CircleButton icon={theme === 'dark' ? 'Close' : false} theme={theme} type="theme" style={[{ backgroundColor: STYLES.COLORS.DARK_BACKGROUND, borderWidth: 1 }, theme === 'dark' ? {} : { borderColor: 'transparent' }]} onPress={() => { actions.setAppTheme('dark') }} />
            <CircleButton icon={theme === 'celsius' ? 'Close' : false} theme={theme} type="theme" style={[{ backgroundColor: STYLES.COLORS.CELSIUS, borderWidth: 1 }, theme === 'celsius' ? {} : { borderColor: 'transparent' }]} onPress={() => { actions.setAppTheme('celsius') }} />
          </View>

          <View>
            <CelButton onPress={() => { actions.openModal(UI.MODALS.BASIC_MODAL) }}>Open Modal</CelButton>
            <CelButton onPress={() => { actions.navigateTo('Login') }}>Join Celsius</CelButton>
            <CelButton onPress={() => { actions.navigateTo('Register') }} iconRight="IconArrowRight">Create account</CelButton>
            <CelButton onPress={() => { }} loading>Create account</CelButton>
            <CelButton onPress={() => { }} disabled>Disabled</CelButton>
            <CelButton onPress={() => { }} basic>Logout</CelButton>
          </View>
          {/* <View style={{ height: 50 }}>
            <Separator theme={theme} vertical />
          </View>
          <Separator theme={theme} />
          <Separator theme={theme} text="Crazy" /> */}
          <CelInput field="test" placeholder="input" />
          <View style={{ marginTop: 20 }}>
            <ProgressBar
              steps={5}
              currentStep={1}
            />
          </View>
          <View>
              <CelModal
                name={UI.MODALS.BASIC_MODAL}
                picture={require('../../../../assets/images/illustrations-v3/PolarBearFistUp3x.png')}
              >
                <CelText bold type="H2">Hello Wrold</CelText>
                <CelText>Some explanation text.</CelText>
                <CelButton onPress={() => actions.closeModal()}>Close</CelButton>
              </CelModal>
          </View>
        

        </React.Fragment>
      </RegularLayout>
    );
  }
}

export default Home;
