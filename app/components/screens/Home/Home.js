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
import CelModal from "../../organisms/CelModal/CelModal";
import CelSelect from "../../molecules/CelSelect/CelSelect";
import Spinner from "../../atoms/Spinner/Spinner";
import CelDatePicker from "../../organisms/CelDatePicker/CelDatePicker";
import Card from "../../atoms/Card/Card";
import InfoBox from "../../atoms/InfoBox/InfoBox"
import formatter from "../../../utils/formatter";

import UI, { THEMES } from "../../../constants/UI";

@connect(
  state => ({
    style: HomeStyle(state.ui.theme),
    theme: state.ui.theme,
    appInitialized: state.app.appInitialized,
    formData: state.forms.formData
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
    actions.getAllTransactions();
    actions.loginUser({ email: 'filip.jovakaric+wlt@mvpworkshop.co', password: 'filip123' })
  }

  render() {
    const { actions, theme, formData } = this.props;

    return (
      <RegularLayout header={{
        title: "Home"
      }}>
        <CelText color="red">Welcome to Home Screen</CelText>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <CircleButton icon={theme === THEMES.LIGHT ? 'Close' : false} theme={theme} type="theme" style={[{ backgroundColor: '#fff' }, theme === THEMES.LIGHT ? {} : { borderColor: 'transparent' }]} onPress={() => { actions.setAppTheme(THEMES.LIGHT) }} />
          <CircleButton icon={theme === THEMES.DARK ? 'Close' : false} theme={theme} type="theme" style={[{ backgroundColor: STYLES.COLORS.DARK_BACKGROUND }, theme === THEMES.DARK ? {} : { borderColor: 'transparent' }]} onPress={() => { actions.setAppTheme(THEMES.DARK) }} />
          <CircleButton icon={theme === THEMES.CELSIUS ? 'Close' : false} theme={theme} type="theme" style={[{ backgroundColor: STYLES.COLORS.CELSIUS }, theme === THEMES.CELSIUS ? {} : { borderColor: 'transparent' }]} onPress={() => { actions.setAppTheme(THEMES.CELSIUS) }} />
        </View>

        <View style={{ flexDirection: "row" }}>
          <Card size="half" margin="10 5 10 5">
            <CelText>Bitcoin</CelText>
            <CelText type="H2">{formatter.usd(3000)}</CelText>
          </Card>
          <Card size="half" margin="10 5 10 5">
            <CelText>Ethereum</CelText>
            <CelText type="H2">{formatter.usd(1200)}</CelText>
          </Card>
        </View>

        <Card margin="10 5 10 5">
          <CelText>Ripple</CelText>
          <CelText type="H2">{formatter.usd(500)}</CelText>
        </Card>

        <View>
          <InfoBox>
            <CelText>Info here!</CelText>
            <CelText>Info here!</CelText>
            <CelText>Info here!</CelText>
            <CelText>Info here!</CelText>
            <CelText>Info here!</CelText>
          </InfoBox>
        </View>

        <View>
          <CelButton onPress={() => { actions.openModal(UI.MODALS.BASIC_MODAL) }}>Open Modal</CelButton>
          <CelButton onPress={() => { actions.navigateTo('Login') }}>Join Celsius</CelButton>
          <CelButton onPress={() => { actions.navigateTo('Register') }} iconRight="IconArrowRight">Create account</CelButton>
          <CelButton onPress={() => { }} loading>Create account</CelButton>
          <CelButton onPress={() => { }} disabled>Disabled</CelButton>
          <CelButton onPress={() => { }} basic>Logout</CelButton>
          <CelButton onPress={() => { actions.showMessage('info', 'Hello World!') }} margin="8 0 8 0">Show info Message</CelButton>
          <CelButton onPress={() => { actions.showMessage('warning', 'Hello World! Very long message Very long message Very long message Very long message Very long message Very long message Very long message Very long message Very long message Very long message Very long message Very long message Very long message') }} margin="8 0 8 0">Show long warning Message</CelButton>
          <CelButton onPress={() => { actions.showMessage('success', 'Hello World!') }} margin="8 0 8 0">Show success Message</CelButton>
          <CelButton onPress={() => { actions.showMessage('error', 'Hello World!') }} margin="8 0 8 0">Show error Message</CelButton>
          <CelButton onPress={() => { actions.navigateTo('Login') }} margin="8 0 8 0">Join Celsius</CelButton>
          <CelButton onPress={() => { actions.navigateTo('Register') }} margin="8 0 8 0" iconRight="IconArrowRight">Create account</CelButton>
          <CelButton onPress={() => { }} margin="8 0 8 0" loading>Create account</CelButton>
          <CelButton onPress={() => { }} margin="8 0 8 0" disabled>Disabled</CelButton>
          <CelButton onPress={() => { }} margin="8 0 8 0" basic>Logout</CelButton>
          <View style={{ alignSelf: 'center' }}>
            <Spinner />
          </View>
        </View>
        <View style={{ height: 50 }}>
          <Separator theme={theme} vertical />
        </View>
        <Separator theme={theme} />
        <Separator theme={theme} text="Crazy" />
        {/* <CelInput field="test" placeholder="input" /> */}
        <View style={{ marginTop: 20 }}>
          <ProgressBar steps={5} currentStep={1} />
        </View>
        <View>
          <CelModal
            name={UI.MODALS.BASIC_MODAL}
            picture={require('../../../../assets/images/OfflineMode/deer-tangled3x.png')}
          >
            <CelText bold type="H2">Hello Wrold</CelText>
            <CelText>Some explanation text.</CelText>
            <CelButton onPress={() => actions.closeModal()}>Close</CelButton>
          </CelModal>
        </View>

        <Separator theme={theme} text="Crazy" />
        <View style={{ flex: 1 }}>
          <CelInput field="test" placeholder="input" value={formData.text} />
          <CelInput field="test" placeholder="input" value={formData.text} />
          <CelInput field="test" placeholder="input" value={formData.text} />
          <CelInput field="test" placeholder="input" value={formData.text} />
          <CelInput field="test" placeholder="input" value={formData.text} />
          <CelInput field="test" placeholder="input" value={formData.text} />
        </View>
        <CelDatePicker field={"date"} />
        <View style={{ flex: 1 }}>
          <CelInput field="phone" type="phone" placeholder="Phone number" value={formData.phone} />
          <CelSelect field="country" type="country" labelText="Country" value={formData.country && formData.country.name || ""} />
          <CelSelect field="gender" type="gender" labelText="Gender" value={formData.gender} />
        </View>
        <View style={{ flex: 1 }}>
          <CelInput field="test" placeholder="input" value={formData.text} />
          <CelInput field="test" placeholder="input" value={formData.text} />
          <CelInput field="test" placeholder="input" value={formData.text} />
          <CelInput field="test" placeholder="input" value={formData.text} />
        </View>
      </RegularLayout>
    );
  }
}

export default Home;
