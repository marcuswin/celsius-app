import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
// import EnterPhoneStyle from "./EnterPhone.styles";
import CelText from '../../atoms/CelText/CelText';
import ProgressBar from '../../atoms/ProgressBar/ProgressBar';
import CelInput from '../../atoms/CelInput/CelInput';
import AuthLayout from '../../layouts/AuthLayout/AuthLayout';
import CelButton from '../../atoms/CelButton/CelButton';

@connect(
  state => ({
    formData: state.forms.formData,
    user: state.user.profile,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class RegisterEnterPhone extends Component {

  static navigationOptions = () => (
    {
      customCenterComponent: <ProgressBar steps={5} currentStep={2}/>
    }
  );

  updateCellphoneNumber = async (phone) => {
    const {actions, formData, user} = this.props;
    const response = await actions.updateProfileInfo({
      cellphone: `${phone.countryCallingCodes[0]}${formData["cellphone.text"]}`
    });
    if (response.success) {
      actions.sendVerificationSMS(user.cellphone);
      actions.navigateTo('RegisterVerifyPhone');
    }
  };

  render() {
    const {formData} = this.props;
    return (
      <AuthLayout>
        <CelText margin="0 0 30 0" type="H1" align="center">Enter your phone number</CelText>
        <CelInput type="phone" field="cellphone" placeholder="Phone number" value={formData.cellphone}/>

        <CelButton margin="10 0 40 0" onPress={() => {
          this.updateCellphoneNumber(formData.cellphone)
        }} iconRight="IconArrowRight">Verify phone number</CelButton>
      </AuthLayout>
    );
  }
}

export default testUtil.hookComponent(RegisterEnterPhone);
