import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
// import RegisterStyle from "./Register.styles";
import CelText from '../../atoms/CelText/CelText';
import CelInput from '../../atoms/CelInput/CelInput';
import CelButton from '../../atoms/CelButton/CelButton';
import ProgressBar from '../../atoms/ProgressBar/ProgressBar';
import AuthLayout from '../../layouts/AuthLayout/AuthLayout';
import SocialLogin from "../../organisms/SocialLogin/SocialLogin";

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

    const isUsingSocial = formData.googleId || formData.facebookId || formData.twitterId;
    return (
      <AuthLayout>
        <CelText margin="0 0 30 0" align="center" type="H1">Join Celsius</CelText>

        <SocialLogin type="register" actions={actions} />

        <CelInput margin="20 0 20 0" type="text" field="firstName" value={formData.firstName} placeholder="First name" />
        <CelInput type="text" field="lastName" value={formData.lastName} placeholder="Last name" />


        <CelInput editable={!isUsingSocial} type="text" value={formData.email} field="email" placeholder="E-mail" />

        { !isUsingSocial && <CelInput type="password" field="password" placeholder="Password" value={formData.password} /> }

        <CelButton margin="10 0 40 0" onPress={() => { actions.navigateTo('RegisterSetPin') }} iconRight="IconArrowRight">Create account</CelButton>

        <CelText color="rgba(61,72,83,0.5)" type="H4" margin="30 20 0 20" align="center">By creating an account you agree to our Terms of Use</CelText>
      </AuthLayout>
    );
  }
}

export default testUtil.hookComponent(Register);
