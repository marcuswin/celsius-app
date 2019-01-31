import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import EnterPhoneStyle from "./EnterPhone.styles";
import CelText from '../../atoms/CelText/CelText';
import ProgressBar from '../../atoms/ProgressBar/ProgressBar';
import CelInput from '../../atoms/CelInput/CelInput';
import AuthLayout from '../../layouts/AuthLayout/AuthLayout';

@connect(
  state => ({
    style: EnterPhoneStyle(state.ui.theme),
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class EnterPhone extends Component {

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
      children: <ProgressBar steps={5} currentStep={2} />
    }
    return (
      <AuthLayout header={header}>
        <CelText type="H1" align="center">Join Celsius</CelText>
        <CelInput type="text" field="firstname" placeholder="First name" />
      </AuthLayout>
    );
  }
}

export default testUtil.hookComponent(EnterPhone);
