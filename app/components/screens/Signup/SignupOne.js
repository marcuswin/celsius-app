import React, { Component } from 'react';
import { View } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import _ from 'lodash';
import testUtil from "../../../utils/test-util";

import API from '../../../config/constants/API';
import apiUtil from '../../../utils/api-util';
import Separator from '../../atoms/Separator/Separator';
import CelButton from "../../atoms/CelButton/CelButton";

import * as appActions from "../../../redux/actions";
import { STYLES } from "../../../config/constants/style";
import SignupOneStyle from "./Signup.styles";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import ThirdPartyLoginSection from "../../organisms/ThirdPartyLoginSection/ThirdPartyLoginSection";
import CelForm from "../../atoms/CelForm/CelForm";
import CelInput from "../../atoms/CelInput/CelInput";

@connect(
  (state) => ({
    user: state.users.user,
    callsInProgress: state.api.callsInProgress,
    formData: state.ui.formData,
    formErrors: state.ui.formErrors,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class SignupOne extends Component {
  // lifecycle methods
  componentWillReceiveProps(nextProps) {
    const { actions, user } = this.props;
    if (!user && nextProps.user) {
      actions.navigateTo('SignupTwo');
    }
  }

  onSubmit = () => {
    const { actions, formData } = this.props;

    const formErrors = {};
    if (formData.password.length >= 8 && formData.passwordRepeat.length >= 8) {
      if (formData.password === formData.passwordRepeat) {
        actions.registerUser(formData);
      } else {
        formErrors.password_repeat = 'Passwords don\'t match!';
      }
    } else {
      formErrors.password = 'Password must have at least 8 characters!';
    }

    if (!_.isEmpty(formErrors)) {
      actions.setFormErrors(formErrors);
    }
  };

  // rendering methods
  render() {
    const { callsInProgress, formData, formErrors } = this.props;
    const { email, password, passwordRepeat } = formData;

    const isLoading = apiUtil.areCallsInProgress([API.REGISTER_USER], callsInProgress);
    return (
      <SimpleLayout
        mainHeader={{ backButton: false, rightLink: { screen: 'Login', text: 'Log in' } }}
        animatedHeading={{ text: 'Sign up' }}
        background={STYLES.PRIMARY_BLUE}
        ref={testUtil.generateTestHook(this, `SignupOne.screen`)}
      >
        <View>
          <View>
            <ThirdPartyLoginSection type="signup" />
          </View>

          <Separator margin='35 0 -15 0'>OR SIGN UP WITH E-MAIL</Separator>

          <View style={SignupOneStyle.formWrapper}>
            <CelForm disabled={isLoading}>
              <CelInput
                {...this.props} testSelector={'SignupOne.email'}
                error={formErrors.email}
                field="email"
                labelText="E-mail"
                keyboardType='email-address'
                returnKeyType="next"
                value={formData.email}
              />
              <CelInput
                {...this.props} testSelector={'SignupOne.passwordOne'}
                error={formErrors.password}
                field="password"
                type="password"
                labelText="Password"
                returnKeyType="next"
                value={formData.password}
              />
              <CelInput
                {...this.props} testSelector={'SignupOne.passwordTwo'}
                error={formErrors.password_repeat}
                field="passwordRepeat"
                type="password"
                labelText="Repeat password"
                returnKeyType="done"
                value={formData.passwordRepeat}
              />
            </CelForm>
            <View style={SignupOneStyle.formButtonWrapper}>
              <CelButton
                ref={testUtil.generateTestHook(this, 'SignupOne.button')}
                disabled={!email || !password || !passwordRepeat}
                loading={isLoading}
                onPress={this.onSubmit}
                white
                iconRight="IconArrowRight"
              >
                Create account
              </CelButton>
            </View>
          </View>
        </View>
      </SimpleLayout>
    );
  }
}

export default testUtil.hookComponent(SignupOne);
