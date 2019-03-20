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
import Separator from "../../atoms/Separator/Separator";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";

@connect(
  state => ({
    formData: state.forms.formData,
    formErrors: state.forms.formErrors,
    callsInProgress: state.api.callsInProgress
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

  isFormValid = () => {
    const { actions, formData } = this.props;

    const errors = {}
    const isUsingSocial = formData.googleId || formData.facebookId || formData.twitterId;

    if (!formData.firstName) errors.firstName = 'First name is required!'
    if (!formData.lastName) errors.lastName = 'Last name is required!'
    if (!formData.email) errors.email = 'Email is required!'
    if (!isUsingSocial && !formData.password) errors.password = 'Password is required!'

    if (Object.keys(errors).length) {
      actions.setFormErrors(errors);
      return false
    }

    return true;
  }

  submitForm = () => {
    const { actions } = this.props;
    const isFormValid = this.isFormValid()

    if (isFormValid) {
      actions.createAccount()
    }
  }

  render() {
    const { formData, actions, callsInProgress, formErrors } = this.props;

    const isUsingSocial = formData.googleId || formData.facebookId || formData.twitterId;

    const registerLoading = apiUtil.areCallsInProgress([
      API.REGISTER_USER,
      API.REGISTER_USER_FACEBOOK,
      API.REGISTER_USER_GOOGLE,
      API.REGISTER_USER_TWITTER,
    ], callsInProgress);

    return (
      <AuthLayout>
        <CelText margin="0 0 30 0" align="center" type="H1">Join Celsius</CelText>

        <SocialLogin type="register" actions={actions} />

        <Separator allCaps text="Create your account" margin="20 0 20 0"/>

        <CelInput
          disabled={registerLoading}
          type="text"
          field="firstName"
          value={formData.firstName}
          error={formErrors.firstName}
          placeholder="First name"
        />
        <CelInput
          disabled={registerLoading}
          type="text"
          field="lastName"
          value={formData.lastName}
          error={formErrors.lastName}
          placeholder="Last name"
        />

        <CelInput
          disabled={!!isUsingSocial || registerLoading}
          type="text"
          value={formData.email}
          error={formErrors.email}
          field="email"
          placeholder="E-mail"
        />

        { !isUsingSocial && (
          <CelInput
            disabled={registerLoading}
            type="password"
            field="password"
            placeholder="Password"
            value={formData.password}
            error={formErrors.password}
          />
        ) }

        <CelButton
          margin="10 0 40 0"
          onPress={this.submitForm}
          iconRight="IconArrowRight"
          loading={registerLoading}
        >
          Create account
        </CelButton>

        <CelText color="rgba(61,72,83,0.5)" type="H4" margin="30 20 0 20" align="center">By creating an account you agree to our Terms of Use</CelText>
      </AuthLayout>
    );
  }
}

export default testUtil.hookComponent(Register);
