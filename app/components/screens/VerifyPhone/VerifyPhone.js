import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import VerifyPhoneStyle from "./VerifyPhone.styles";
import CelText from '../../atoms/CelText/CelText';
import AuthLayout from '../../layouts/AuthLayout/AuthLayout';
import CelInput from '../../atoms/CelInput/CelInput';
import CelButton from '../../atoms/CelButton/CelButton';
import ProgressBar from '../../atoms/ProgressBar/ProgressBar';

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
    const { actions } = this.props;
    const header = {
      left: "back",
      children: <ProgressBar steps={5} currentStep={3} />
    }
    return (
      <AuthLayout header={header}>
        <CelText margin="0 0 14 0" type="H1" align="center">Verify your phone number</CelText>
        <CelText margin="0 0 30 0" type="H4" align="center">We have sent you an SMS with a code.</CelText>
        <CelInput type="text" field="sixCode" placeholder="Enter six digit code" />
        <CelButton margin="10 0 40 0" onPress={() => { actions.navigateTo('CreatePin') }} basic>Resend code</CelButton>
      </AuthLayout>
    );
  }
}

export default testUtil.hookComponent(VerifyPhone);
