import React, {Component} from 'react';
import {View} from "native-base";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import API from '../../../config/constants/API';
import apiUtil from '../../../utils/api-util';
import LoginFormStyles from './LoginForm.styles'
import CelInput from "../../atoms/CelInput/CelInput";
import CelButton from "../../atoms/CelButton/CelButton";
import * as actions from "../../../redux/actions";
import CelForm from "../../atoms/CelForm/CelForm";

@connect(
  state => ({
    callsInProgress: state.api.callsInProgress,
    formData: state.ui.formData,
    formErrors: state.ui.formErrors,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class LoginForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    customWrapperButtonStyles: PropTypes.instanceOf(Object),
    customButtonStyles: PropTypes.instanceOf(Object),
    buttonText: PropTypes.string.isRequired
  };

  onSubmit = () => {
    const {onSubmit, formData} = this.props;

    onSubmit(formData);
  };

  render() {
    const {callsInProgress, formData, formErrors} = this.props;

    const isLoading = apiUtil.areCallsInProgress([API.REGISTER_USER, API.LOGIN_BORROWER], callsInProgress);

    return (
      <View style={LoginFormStyles.wrapper}>
        <CelForm disabled={isLoading}>
          <CelInput error={formErrors.email} field="email" labelText="E-mail" keyboardType='email-address' value={formData.email}/>
          <CelInput error={formErrors.password} field="password" type="password" labelText="Password" value={formData.password} />
        </CelForm>

        <CelButton
          onPress={() => this.onSubmit()}
          disabled={!formData.email || !formData.password || formData.password.length < 8}
          loading={isLoading}
          white
          iconRight="IconArrowRight"
        >
          Login
        </CelButton>
      </View>
    );
  }
}

export default LoginForm;
