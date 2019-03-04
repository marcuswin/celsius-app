import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
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
    is2FAEnabled: state.user.profile.two_factor_enabled
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
        left: "back"
      },
      value: ''
    };
  }

  componentDidMount = () => {

  }


  onCheckSuccess = () => {
    const { navigation } = this.props;
    const onSuccess = navigation.getParam('onSuccess')

    onSuccess()
    this.setState({ loading: false })
  }

  onCheckError = () => this.setState({ loading: false, value: '' });

  handlePINChange = (newValue) => {
    const { actions } = this.props;

    if (newValue.length > 4) return;

    actions.updateFormField('pin', newValue)
    this.setState({ value: newValue })

    if (newValue.length === 4) {
      // TODO: check pin
      this.setState({ loading: true })
      actions.toggleKeypad()
      actions.checkPIN(this.onCheckSuccess, this.onCheckError);
    }
  }

  handle2FAChange = (newValue) => {
    const { actions } = this.props;

    if (newValue.length > 6) return;

    actions.updateFormField('code', newValue)
    this.setState({ value: newValue })

    if (newValue.length === 6) {
      this.setState({ loading: true })
      actions.toggleKeypad()

      // TODO: check code
      actions.checkTwoFactor(this.onCheckSuccess, this.onCheckError);
    }
  }

  render2FA() {
    const { loading, value } = this.state;
    const { actions } = this.props;
    const style = VerifyProfileStyle();

    return (
      <View style={style.wrapper}>
        <CelText type="H1" bold align="center">Verification required</CelText>
        <CelText color="rgba(61,72,83,0.7)" align="center" margin="10 0 10 0">Please enter your 2FA code to proceed</CelText>

        <TouchableOpacity onPress={actions.toggleKeypad}>
          <HiddenField value={value} length={6} />
        </TouchableOpacity>

        <CelText color="rgba(61,72,83,0.7)" align="center" margin="10 0 0 0">Forgot your Code?</CelText>
        <CelText color="rgba(61,72,83,0.7)" align="center" margin="5 0 10 0">Contact our support for help</CelText>

        {loading && (
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
            <Spinner />
          </View>
        )}
      </View>
    );
  }

  renderPIN() {
    const { loading, value } = this.state;
    const { actions } = this.props;
    const style = VerifyProfileStyle();

    return (
      <View style={style.wrapper}>
        <CelText type="H1" bold align="center">Verification required</CelText>
        <CelText color="rgba(61,72,83,0.7)" align="center" margin="10 0 10 0">Please enter your PIN to proceed</CelText>

        <TouchableOpacity onPress={actions.toggleKeypad}>
          <HiddenField value={value} />
        </TouchableOpacity>

        <CelText color="rgba(61,72,83,0.7)" align="center" margin="10 0 0 0">Forgot your PIN?</CelText>
        <CelText color="rgba(61,72,83,0.7)" align="center" margin="5 0 10 0">Contact our support for help</CelText>

        {loading && (
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
            <Spinner />
          </View>
        )}
      </View>
    );
  }

  render() {
    const { header, value } = this.state;
    const { is2FAEnabled, actions } = this.props;

    const field = is2FAEnabled ? "code" : "pin";
    const onPressFunc = is2FAEnabled ? this.handle2FAChange : this.handlePINChange;
    const style = VerifyProfileStyle();

    return (
      <RegularLayout padding="0 0 0 0" header={header}>
        <View style={style.container}>
          {is2FAEnabled ? this.render2FA() : this.renderPIN()}
          <CelNumpad
            field={field}
            value={value}
            updateFormField={actions.updateFormField}
            setKeypadInput={actions.setKeypadInput}
            toggleKeypad={actions.toggleKeypad}
            onPress={onPressFunc}
            purpose={KEYPAD_PURPOSES.VERIFICATION}
          />
        </View>
      </RegularLayout>
    )
  }
}

export default testUtil.hookComponent(VerifyProfile);
