import React, { Component } from 'react';
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import VerifyPhoneStyle from "./VerifyPhone.styles";
import CelText from '../../atoms/CelText/CelText';
import AuthLayout from '../../layouts/AuthLayout/AuthLayout';

@connect(
  state => ({
    style: VerifyPhoneStyle(state.ui.theme),
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class VerifyPhone extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const header = {
      left: "back",
      right: "profile"
    }
    return (
      <AuthLayout header={header}>
        <CelText>Hello VerifyPhone</CelText>
      </AuthLayout>
    );
  }
}

export default testUtil.hookComponent(VerifyPhone);
