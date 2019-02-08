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
import CelButton from '../../atoms/CelButton/CelButton';

@connect(
  state => ({
    style: EnterPhoneStyle(),
    formData: state.forms.formData
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
    const { actions, formData } = this.props;
    const header = {
      left: "back",
      children: <ProgressBar steps={5} currentStep={2} />
    }
    return (
      <AuthLayout header={header}>
        <CelText margin="0 0 30 0" type="H1" align="center">Enter your phone number</CelText>
        <CelInput type="phone" field="phone" placeholder="Phone number" value={formData.phone} />

        <CelButton margin="10 0 40 0" onPress={() => { actions.navigateTo('VerifyPhone') }} iconRight="IconArrowRight">Verify phone number</CelButton>
      </AuthLayout>
    );
  }
}

export default testUtil.hookComponent(EnterPhone);
