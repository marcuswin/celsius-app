import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import LoginStyle from "./Login.styles";
import CelText from '../../atoms/CelText/CelText';
import CelInput from '../../atoms/CelInput/CelInput';
import CelButton from '../../atoms/CelButton/CelButton';
import Separator from '../../atoms/Separator/Separator';
import AuthLayout from '../../layouts/AuthLayout/AuthLayout';

@connect(
  state => ({
    style: LoginStyle(),
    formData: state.forms.formData
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class Login extends Component {

  render() {
    const { formData } = this.props;
    const header = {
      right: "signup"
    }
    return (
      <AuthLayout header={header}>
        <CelText margin="0 0 30 0" align="center" type="H1">Welcome back</CelText>
        <CelInput type="text" field="email" placeholder="E-mail" value={formData.email} />
        <CelInput type="password" field="password" placeholder="Password" value={formData.password} />
        <CelButton margin="10 0 40 0" onPress={() => { }} >Log in</CelButton>
        <Separator text="or login with social media" />
      </AuthLayout>
    );
  }
}

export default testUtil.hookComponent(Login);
