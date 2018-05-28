import React, {Component} from 'react';
import { View } from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import API from '../../../config/constants/API';
import apiUtil from '../../../utils/api-util';
import Separator from '../../atoms/Separator/Separator';
// import PrimaryInput from "../../atoms/Inputs/PrimaryInput";
import CelButton from "../../atoms/CelButton/CelButton";

import * as actions from "../../../redux/actions";
import {STYLES} from "../../../config/constants/style";
import SignupOneStyle from "./Signup.styles";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
// import PasswordInput from "../../atoms/PasswordInput/PasswordInput";
import ThirdPartyLoginSection from "../../organisms/ThirdPartyLoginSection/ThirdPartyLoginSection";
import CelForm from "../../atoms/CelForm/CelForm";
import CelInput from "../../atoms/CelInput/CelInput";

@connect(
  (state) => ({
    user: state.users.user,
    callsInProgress: state.api.callsInProgress,
    formData: state.ui.formData,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class SignupOne extends Component {
  // lifecycle methods
  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      this.props.navigateTo('SignupTwo');
    }
  }

  onSubmit = () => {
    const { registerUser, formData } = this.props;
    registerUser(formData);
  };

  // rendering methods
  render() {
    const {callsInProgress, formData } = this.props;
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
              <CelInput field="email" labelText="E-mail" keyboardType='email-address' value={formData.email}/>
              <CelInput field="password" type="password" labelText="Password" value={formData.password} />
            </CelForm>
            <View style={SignupOneStyle.formButtonWrapper}>
              <CelButton
                disabled={!email || !password }
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
