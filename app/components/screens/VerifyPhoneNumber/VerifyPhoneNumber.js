import React, {Component} from 'react';
import {Image} from 'react-native';
import {View, Text} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as actions from "../../../redux/actions";
import {STYLES} from "../../../config/constants/style";
import VerifyPhoneNumberStyle from "./VerifyPhoneNumber.styles";
import SimpleLayout from "../../../components/layouts/SimpleLayout/SimpleLayout";
import CelButton from "../../../components/atoms/CelButton/CelButton";
import CelInput from "../../../components/atoms/CelInput/CelInput";
import API from "../../../config/constants/API";
import apiUtil from "../../../utils/api-util";
import CelForm from "../../atoms/CelForm/CelForm";

@connect(
  state => ({
    formData: state.ui.formData,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class VerifyPhoneNumber extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // initial state

    };
    // binders

  }

  // lifecycle methods
  verifyCode = async () => {
    const { finishKYCVerification } = this.props;
    finishKYCVerification();
  }

  resendCode = async () => {
    const { sendVerificationSMS, showMessage } = this.props;
    await sendVerificationSMS();
    showMessage('info', 'SMS sent!')
  }
  // event hanlders
  // rendering methods
  render() {
    const { formData, callsInProgress } = this.props;

    const isLoading = apiUtil.areCallsInProgress([API.VERIFY_SMS], callsInProgress);

    return (
      <SimpleLayout
        animatedHeading={{ text : ''}}
        bottomNavigation={false}
        background={STYLES.PRIMARY_BLUE}
      >
        <View>
          <Text style={VerifyPhoneNumberStyle.title}>
            Verify phone number
          </Text>
          <Image source={require('../../../../../celsius-app/assets/images/phone_doggirl3x.png')} style={VerifyPhoneNumberStyle.image}/>
          <Text style={VerifyPhoneNumberStyle.text}>
            Phone number enables you 2-factor authentication. Please enter the SMS code we've sent you.
          </Text>
          <CelForm disabled={isLoading}>
            <CelInput
              type='six-digit'
              field="verificationCode"
              value={formData.verificationCode}
            />
          </CelForm>
          <CelButton
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

export default VerifyPhoneNumber;
