import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import VerifyProfileStyle from "./VerifyProfile.styles";
import CelText from '../../atoms/CelText/CelText';
import CelNumpad from '../../molecules/CelNumpad/CelNumpad';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import { KEYPAD_PURPOSES } from "../../../constants/UI";
import HiddenField from "../../atoms/HiddenField/HiddenField";
import Spinner from "../../atoms/Spinner/Spinner";

@connect(
  state => ({
    formData: state.forms.formData,
    is2FAEnabled: state.user.profile.two_factor_enabled,
    activeScreen: state.nav.activeScreen,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class VerifyProfile extends Component {
  static propTypes = {};
  static defaultProps = {}

  constructor(props) {
    super(props);
    this.state = {
      header: {
        transparent: true,
        left: "back",
      }
    };
  }

  // onSuccess() {
  //   const { navigation } = this.props;
  //   const onSuccess = navigation.getParam('onSuccess')
  //
  //   onSuccess()
  //   this.setState({ loading: false })
  // }

  handlePINChange = (newValue) => {
    const { actions, navigation } = this.props;
    const onSuccess = navigation.getParam('onSuccess')

    if (newValue.length > 4) return;

    actions.updateFormField('pin', newValue)

    if (newValue.length === 4) {
      // TODO: check pin
      this.setState({ loading: true })
      actions.toggleKeypad()
      actions.checkPIN(onSuccess)
    }
  }

  handle2FAChange = (newValue) => {
    const { actions, navigation } = this.props;
    const onSuccess = navigation.getParam('onSuccess')

    if (newValue.length > 6) return;

    actions.updateFormField('code', newValue)

    if (newValue.length === 6) {
      this.setState({ loading: true })
      actions.toggleKeypad()

      // TODO: check code
      actions.checkPIN(onSuccess)
    }
  }

  render2FA() {
    const { header } = this.state;
    const { actions, formData, activeScreen } = this.props;
    const style = VerifyProfileStyle();

    return (
      <RegularLayout header={header}>
        <View style={style.container}>
          <View style={style.wrapper}>
            <CelText type="H1" bold align="center">Verification required</CelText>
            <CelText color="rgba(61,72,83,0.7)" align="center" margin="10 0 10 0">Please enter your 2FA code to proceed</CelText>

            <TouchableOpacity onPress={() => actions.toggleKeypad() }>
              <HiddenField value={formData.code} length={6} />
            </TouchableOpacity>

            <CelText color="rgba(61,72,83,0.7)" align="center" margin="10 0 0 0">Forgot your Code?</CelText>
            <CelText color="rgba(61,72,83,0.7)" align="center" margin="5 0 10 0">Contact our support for help</CelText>

            { this.state.loading && (
              <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
                <Spinner />
              </View>
            )}
          </View>

          { activeScreen === 'VerifyProfile' && (
            <CelNumpad
              field="code"
              value={formData.code}
              updateFormField={actions.updateFormField}
              setKeypadInput={actions.setKeypadInput}
              toggleKeypad={actions.toggleKeypad}
              onPress={this.handlePINChange}
              purpose={KEYPAD_PURPOSES.VERIFICATION}
            />
          )}
        </View>
      </RegularLayout>
    );
  }

  renderPIN() {
    const { header } = this.state;
    const { actions, formData, activeScreen } = this.props;
    const style = VerifyProfileStyle();

    return (
      <RegularLayout header={header}>
        <View style={style.container}>
          <View style={style.wrapper}>
            <CelText type="H1" bold align="center">Verification required</CelText>
            <CelText color="rgba(61,72,83,0.7)" align="center" margin="10 0 10 0">Please enter your PIN to proceed</CelText>

            <TouchableOpacity onPress={() => actions.toggleKeypad() }>
              <HiddenField value={formData.pin} />
            </TouchableOpacity>

            <CelText color="rgba(61,72,83,0.7)" align="center" margin="10 0 0 0">Forgot your PIN?</CelText>
            <CelText color="rgba(61,72,83,0.7)" align="center" margin="5 0 10 0">Contact our support for help</CelText>

            { this.state.loading && (
              <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
                <Spinner />
              </View>
            )}
          </View>

          { activeScreen === 'VerifyProfile' && (
            <CelNumpad
              field="pin"
              value={formData.pin}
              updateFormField={actions.updateFormField}
              setKeypadInput={actions.setKeypadInput}
              toggleKeypad={actions.toggleKeypad}
              onPress={this.handlePINChange}
              purpose={KEYPAD_PURPOSES.VERIFICATION}
            />
          )}
        </View>
      </RegularLayout>
    );
  }

  render() {
    const { is2FAEnabled } = this.props;

    return is2FAEnabled ? this.renderPIN() : this.renderPIN();
  }
}

export default testUtil.hookComponent(VerifyProfile);
