import React, {Component} from 'react';
import { View } from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import API from '../../../config/constants/API';
import apiUtil from '../../../utils/api-util';
import Separator from '../../atoms/Separator/Separator';
import CelButton from "../../atoms/CelButton/CelButton";

import * as appActions from "../../../redux/actions";
import {STYLES} from "../../../config/constants/style";
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
    actions.registerUser(formData);
  };

  // rendering methods
  render() {
    const {callsInProgress, formData, formErrors } = this.props;
    const { email, password } = formData;

    const isLoading = apiUtil.areCallsInProgress([API.REGISTER_USER], callsInProgress);

    return (
      <SimpleLayout
        mainHeader={{ back: true, rightLink: { screen: 'Login', text: 'Log in' }}}
        animatedHeading={{ text: 'Sign up' }}
        bottomNavigation={ false }
        background={STYLES.PRIMARY_BLUE}
      >
        <View>
          <View>
            <ThirdPartyLoginSection type="signup"/>
          </View>

          <Separator margin='35 0 -15 0'>OR SIGN UP WITH E-MAIL</Separator>

          <View style={SignupOneStyle.formWrapper}>
            <CelForm disabled={isLoading}>
              <CelInput
                error={formErrors.email}
                field="email"
                labelText="E-mail"
                keyboardType='email-address'
                returnKeyType="next"
                value={formData.email}
              />
              <CelInput
                error={formErrors.password}
                field="password"
                type="password"
                labelText="Password"
                returnKeyType="done"
                value={formData.password}
              />
            </CelForm>
            <View style={SignupOneStyle.formButtonWrapper}>
              <CelButton
                disabled={!email || !password || password.length < 8 }
                loading={ isLoading }
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

export default SignupOne;
