import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
// import RegisterStyle from "./Register.styles";
import CelText from '../../atoms/CelText/CelText';
import CelInput from '../../atoms/CelInput/CelInput';
import CelButton from '../../atoms/CelButton/CelButton';
import Separator from '../../atoms/Separator/Separator';
import ProgressBar from '../../atoms/ProgressBar/ProgressBar';
import AuthLayout from '../../layouts/AuthLayout/AuthLayout';

@connect(
  state => ({
    formData: state.forms.formData
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class Register extends Component {

  static navigationOptions = () => (
    {
      right: 'login',
      customCenterComponent: <ProgressBar steps={5} currentStep={1}/>
    }
  )

  render() {
    const { formData, actions } = this.props;

    return (
      <AuthLayout>
        <CelText margin="0 0 30 0" align="center" type="H1">Join Celsius</CelText>
        <CelInput type="text" field="firstname" placeholder="First name" />
        <CelInput type="text" field="lastname" placeholder="Last name" />
        <CelInput type="text" field="email" placeholder="E-mail" />
        <CelInput type="password" field="password" placeholder="Password" value={formData.password} />
        <CelButton margin="10 0 40 0" onPress={() => { actions.navigateTo('RegisterEnterPhone') }} iconRight="IconArrowRight">Create account</CelButton>
        <Separator text="or Register with social media" />
      </AuthLayout>
    );
  }
}

export default testUtil.hookComponent(Register);
