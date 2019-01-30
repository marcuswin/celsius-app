import React, { Component } from 'react';
import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import LoginStyle from "./Login.styles";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import CelInput from '../../atoms/CelInput/CelInput';
import CelButton from '../../atoms/CelButton/CelButton';
import Separator from '../../atoms/Separator/Separator';

@connect(
  state => ({
    style: LoginStyle(state.ui.theme),
    formData: state.forms.formData
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class Login extends Component {

  render() {
    const { formData } = this.props;
    const theme = 'light'
    const header = {
      title: "",
      transparent: true,
      statusBarTheme: theme,
      right: "signup"
    }
    return (
      <RegularLayout header={header}>
        <View>
          <CelText type="H1">Welcome back</CelText>
          <CelInput type="text" field="email" placeholder="E-mail" />
          <CelInput type="password" field="password" placeholder="Password" value={formData.password} />
          <CelButton onPress={() => { }}>Log in</CelButton>
          <Separator theme={theme} text="or login with social media" />
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(Login);
