import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
// import EnterPhoneStyle from "./EnterPhone.styles";
import CelText from '../../atoms/CelText/CelText';
import ProgressBar from '../../atoms/ProgressBar/ProgressBar';
import CelInput from '../../atoms/CelInput/CelInput';
import AuthLayout from '../../layouts/AuthLayout/AuthLayout';
import CelButton from '../../atoms/CelButton/CelButton';

@connect(
  state => ({
    formData: state.forms.formData
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class RegisterEnterPhone extends Component {

  static navigationOptions = () => (
    {
      right: 'login',
      customCenterComponent: <ProgressBar steps={5} currentStep={2}/>
    }
  )

  render() {
    const { actions, formData } = this.props;

    return (
      <AuthLayout>
        <CelText margin="0 0 30 0" type="H1" align="center">Enter your phone number</CelText>
        <CelInput type="phone" field="phone" placeholder="Phone number" value={formData.phone} />

        <CelButton margin="10 0 40 0" onPress={() => { actions.navigateTo('RegisterVerifyPhone') }} iconRight="IconArrowRight">Verify phone number</CelButton>
      </AuthLayout>
    );
  }
}

export default testUtil.hookComponent(RegisterEnterPhone);
