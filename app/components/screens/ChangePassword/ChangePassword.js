import React, {Component} from 'react';
import {View} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as actions from "../../../redux/actions";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import CelButton from '../../atoms/CelButton/CelButton';
import API from "../../../config/constants/API";
import apiUtil from "../../../utils/api-util";
import PasswordInput from "../../atoms/PasswordInput/PasswordInput";

@connect(
  state => ({
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animatedHeading: {
        text: 'Change Password'
      },
      formData: {
        currentPassword: '',
        newPassword: '',
      }
    };
    // binders
    this.onChangeField = this.onChangeField.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  onChangeField = (fieldName, text) => {
    this.setState({ formData: { ...this.state.formData, [fieldName]: text }});
  }


  // lifecycle methods
  // event handlers
  handleChangePassword() {
    const { currentPassword, newPassword } = this.state.formData;
    const { resetPassword } = this.props;

    resetPassword(currentPassword, newPassword);
  }

  // rendering methods
  render() {
    const {animatedHeading, formData} = this.state;
    const {callsInProgress} = this.props;

    const isLoading = apiUtil.areCallsInProgress([API.RESET_PASSWORD], callsInProgress);

    return (
      <SimpleLayout
        animatedHeading={animatedHeading}
      >
        <PasswordInput
          type="secondary"
          labelText={"Current password"}
          value={formData.currentPassword}
          onChange={text => this.onChangeField('currentPassword', text)}
        />

        <PasswordInput
          type="secondary"
          labelText={"New password"}
          value={formData.newPassword}
          onChange={text => this.onChangeField('newPassword', text)}
        />

        <View style={{marginTop: 40, marginBottom: 30}}>
          <CelButton
            color="blue"
            loading={isLoading}
            onPress={this.handleChangePassword}
          >Change password</CelButton>
        </View>

      </SimpleLayout>
    );
  }
}

export default ChangePassword;
