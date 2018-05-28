import React, {Component} from 'react';
import {Image} from 'react-native';
import {View, Text} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as actions from "../../../../../celsius-app/app/redux/actions";
import {STYLES} from "../../../../../celsius-app/app/config/constants/style";
import VerifyPhoneNumberStyle from "./VerifyPhoneNumber.styles";
import SimpleLayout from "../../../../../celsius-app/app/components/layouts/SimpleLayout/SimpleLayout";
import CelButton from "../../../../../celsius-app/app/components/atoms/CelButton/CelButton";
import CelInput from "../../../../../celsius-app/app/components/atoms/CelInput/CelInput";
import CelInputStyle from "../../../../../celsius-app/app/components/atoms/CelInput/CelInput.styles";



@connect(
  state => ({
    formData: state.ui.formData,
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
  // event hanlders
  // rendering methods
  render() {
    const { formData } = this.props;

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
          <CelInput
            style={CelInputStyle.numberInput}
            type='six-digit'
            field="digit"
            value={formData.digit}
          />
          <CelButton
            margin='20 0 0 0'
            white
            onPress={() => submitForm('')}
          >
            Finish
          </CelButton>
          <CelButton
            style={VerifyPhoneNumberStyle.resendButton}
            transparent
            margin="15 0 0 0"
            onPress={() => submitForm('')}
          >
            Resend code
          </CelButton>
        </View>
      </SimpleLayout>
    );
  }
}

export default VerifyPhoneNumber;
