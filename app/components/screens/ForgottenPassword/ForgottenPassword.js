import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text} from 'native-base';
import {bindActionCreators} from 'redux';

import Styles from "./ForgottenPassword.styles";
import * as appActions from "../../../redux/actions";
import {STYLES} from "../../../config/constants/style";
import CelButton from "../../atoms/CelButton/CelButton";
import {KEYBOARD_TYPE} from "../../../config/constants/common";
import apiUtil from "../../../utils/api-util";
import API from "../../../config/constants/API";
import CelInput from "../../atoms/CelInput/CelInput";
import CelForm from "../../atoms/CelForm/CelForm";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import testUtil from "../../../utils/test-util";

@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    lastCompletedCall: state.api.lastCompletedCall,
    callsInProgress: state.api.callsInProgress,
    formData: state.ui.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class ForgottenPassword extends Component {
  onSubmit = () => {
    const { formData, actions } = this.props;
    actions.sendResetLink(formData.email);
  };

  render() {
    const { callsInProgress, formData } = this.props;
    const { email } = formData;

    const isLoading = apiUtil.areCallsInProgress([API.SEND_RESET_LINK], callsInProgress);

    return (
      <SimpleLayout
        mainHeader={{ backButton: true }}
        animatedHeading={{ text: 'Password forgotten' }}
        background={ STYLES.PRIMARY_BLUE }
      >
        <Text style={Styles.description}>
          Enter the email address you used to sign in to Celsius.
        </Text>

        <CelForm disabled={isLoading} margin="30 0 20 0">
          <CelInput
            labelText={'Email'}
            keyboardType={KEYBOARD_TYPE.EMAIL}
            value={email}
            field="email"
          />
        </CelForm>

        <CelButton
          ref={testUtil.generateTestHook(this, 'ForgottenPassword.getResetLink')}
          loading={isLoading}
          white
          onPress={() => this.onSubmit()}
        >
          Get reset link
        </CelButton>
      </SimpleLayout>
    );
  }
}

export default testUtil.hookComponent(ForgottenPassword);
