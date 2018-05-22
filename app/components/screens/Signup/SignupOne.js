import React, {Component} from 'react';
import { View, Form } from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import API from '../../../config/constants/API';
import apiUtil from '../../../utils/api-util';
import Separator from '../../atoms/Separator/Separator';
import PrimaryInput from "../../atoms/Inputs/PrimaryInput";
import CelButton from "../../atoms/CelButton/CelButton";

import * as actions from "../../../redux/actions";
import {STYLES} from "../../../config/constants/style";
import SignupOneStyle from "./Signup.styles";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import PasswordInput from "../../atoms/PasswordInput/PasswordInput";
import ThirdPartyLoginSection from "../../organisms/ThirdPartyLoginSection/ThirdPartyLoginSection";

@connect(
  (state) => ({
    user: state.users.user,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class SignupOne extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        email: '',
        password: '',
      },
    };

    // binders
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeField = this.onChangeField.bind(this);
  }

  // lifecycle methods
  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      this.props.navigateTo('SignupTwo');
    }
  }

  onSubmit() {
    const { formData } = this.state;
    const { registerUser } = this.props;

    registerUser(formData);
  };

  onChangeField = (fieldName, text) => {
    this.setState({ formData: { ...this.state.formData, [fieldName]: text }});
  };

  // rendering methods
  render() {
    const {callsInProgress } = this.props;
    const { email, password } = this.state.formData;

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
            <Form>
              <PrimaryInput labelText={'E-mail'} keyboardType='email-address' value={email} onChange={(text) => this.onChangeField('email', text)}/>
              <PasswordInput labelText={'Password'} secureTextEntry value={password} onChange={(text) => this.onChangeField('password', text)}/>
            </Form>
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
