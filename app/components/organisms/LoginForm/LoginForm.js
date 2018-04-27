import React, {Component} from 'react';
import {Form, View} from "native-base";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import API from '../../../config/constants/API';
import apiUtil from '../../../utils/api-util';
import LoginFormStyles from './LoginForm.styles'
import PrimaryInput from "../../atoms/Inputs/PrimaryInput";
import {PrimaryButton} from "../../atoms/Buttons/Button/Button";
import * as actions from "../../../redux/actions";

@connect(
  state => ({
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class LoginForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    customWrapperButtonStyles: PropTypes.instanceOf(Object),
    customButtonStyles: PropTypes.instanceOf(Object),
    buttonText: PropTypes.string.isRequired
  };

  constructor() {
    super();

    this.state = {
      email: '',
      password: ''
    };
  }

  onChangeEmail = (text) => {
    this.setState({email: text})
  };

  onChangePassword = (text) => {
    this.setState({password: text})
  };

  onSubmit = () => {
    const {onSubmit} = this.props;
    const {email, password} = this.state;

    onSubmit({email, password})
  };

  render() {
    const {email, password} = this.state;
    const {customWrapperButtonStyles, customButtonStyles, buttonText, callsInProgress} = this.props;

    const isLoading = apiUtil.areCallsInProgress([API.REGISTER_USER, API.LOGIN_BORROWER], callsInProgress);

    return (
      <View style={LoginFormStyles.wrapper}>
        <Form>
          <PrimaryInput labelText={'E-mail'} keyboardType='email-address' value={email} onChange={this.onChangeEmail}/>
          <PrimaryInput labelText={'Password'} secureTextEntry value={password} onChange={this.onChangePassword}/>
        </Form>
        <View style={[LoginFormStyles.buttonWrapper, customWrapperButtonStyles]}>
          <PrimaryButton disabled={!email || !password} loading={isLoading}
                         customStyles={customButtonStyles} onPress={() => this.onSubmit()} title={buttonText}/>
        </View>
      </View>
    );
  }
}

export default LoginForm;
