import React, { Component } from 'react';
import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import RegisterStyle from "./Register.styles";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import CelInput from '../../atoms/CelInput/CelInput';
import CelButton from '../../atoms/CelButton/CelButton';
import Separator from '../../atoms/Separator/Separator';

@connect(
  state => ({
    style: RegisterStyle(state.ui.theme),
    formData: state.forms.formData
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class Register extends Component {

  render() {
    const { formData, actions } = this.props;
    const theme = 'light'
    const header = {
      title: "",
      transparent: true,
      statusBarTheme: theme,
      right: "login"
    }
    return (
      <RegularLayout header={header}>
        <View>
          <CelText type="H1" align="center">Join Celsius</CelText>
          <CelInput type="text" field="firstname" placeholder="First name" />
          <CelInput type="text" field="lastname" placeholder="Last name" />
          <CelInput type="text" field="email" placeholder="E-mail" />
          <CelInput type="password" field="password" placeholder="Password" value={formData.password} />
          <CelButton onPress={() => { actions.navigateTo('Register') }} iconRight="IconArrowRight">Create account</CelButton>
          <Separator theme={theme} text="or Register with social media" />
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(Register);
