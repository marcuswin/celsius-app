import React, {Component} from 'react';
import {Image} from 'react-native';
import {View, Text} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import {STYLES} from "../../../config/constants/style";
import VerifyPhoneNumberStyle from "./VerifyPhoneNumber.styles";
import SimpleLayout from "../../../components/layouts/SimpleLayout/SimpleLayout";
import CelButton from "../../../components/atoms/CelButton/CelButton";
import API from "../../../config/constants/API";
import apiUtil from "../../../utils/api-util";
import CelForm from "../../atoms/CelForm/CelForm";
import CelInput from "../../atoms/CelInput/CelInput";
import testUtil from "../../../utils/test-util";

@connect(
  state => ({
    formData: state.ui.formData,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class VerifyPhoneNumber extends Component {
  // lifecycle methods
  // event hanlders
  onChange = (field, code) => {
    const { formData, actions } = this.props;
    formData.verification_code = code;
    actions.updateFormField(field, formData.verification_code)
  }

  verifyCode = async () => {
    const { actions } = this.props;
    actions.finishKYCVerification();
  }

  resendCode = async () => {
    const { actions } = this.props;
    await actions.sendVerificationSMS();
    actions.showMessage('info', 'SMS sent!')
    actions.updateFormField('verificationCode', '')
  }
  // rendering methods

  render() {
    const { callsInProgress, formData } = this.props;

    const pinValue = formData.verificationCode;
    const isLoading = apiUtil.areCallsInProgress([API.VERIFY_SMS], callsInProgress);

    return (
      <SimpleLayout
        animatedHeading={{ text : ''}}
        background={STYLES.PRIMARY_BLUE}
      >
        <View>
          <Text style={VerifyPhoneNumberStyle.title}>
            Verify phone number
          </Text>
          <Image source={require('../../../../assets/images/phone_doggirl3x.png')} style={VerifyPhoneNumberStyle.image}/>
          <Text style={VerifyPhoneNumberStyle.text}>
            Phone number enables you 2-factor authentication. Please enter the SMS code we've sent you.
          </Text>
          <CelForm disabled={isLoading}>
            <CelInput testSelector={`VerifyPhoneNumber.sms`}
                      {...this.props}
                      type="pin"
                      field="verificationCode"
                      value={pinValue}
                      showDigits
                      digits={4}
                      onChange={this.onChange}/>
          </CelForm>
          <CelButton
            ref={testUtil.generateTestHook(this, 'VerifyPhoneNumber.finish')}
            margin='20 0 0 0'
            white
            onPress={this.verifyCode}
            loading={isLoading}
            disabled={isLoading}
          >
            Finish
          </CelButton>

          <CelButton
            style={VerifyPhoneNumberStyle.resendButton}
            transparent
            margin="15 0 0 0"
            size="small"
            onPress={this.resendCode}
          >
            Resend code
          </CelButton>
        </View>
      </SimpleLayout>
    );
  }
}

export default testUtil.hookComponent(VerifyPhoneNumber);