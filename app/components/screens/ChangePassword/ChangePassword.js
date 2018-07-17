import React, {Component} from 'react';
import {View} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import CelButton from '../../atoms/CelButton/CelButton';
import API from "../../../config/constants/API";
import apiUtil from "../../../utils/api-util";
import CelInput from "../../atoms/CelInput/CelInput";
import CelForm from "../../atoms/CelForm/CelForm";

@connect(
  state => ({
    callsInProgress: state.api.callsInProgress,
    formData: state.ui.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animatedHeading: {
        text: 'Change Password'
      },
    };
  }

  // lifecycle methods
  // event handlers
  handleChangePassword = () => {
    const { formData, actions } = this.props;
    const { currentPassword, newPassword } = formData;

    actions.resetPassword(currentPassword, newPassword);
  }

  // rendering methods
  render() {
    const {animatedHeading} = this.state;
    const {callsInProgress, formData} = this.props;

    const isLoading = apiUtil.areCallsInProgress([API.RESET_PASSWORD], callsInProgress);

    return (
      <SimpleLayout
        animatedHeading={animatedHeading}
      >
        <CelForm disabled={isLoading} margin="20 0 0 0">
          <CelInput
            theme="white"
            type="password"
            labelText="Current password"
            value={formData.currentPassword}
            field="currentPassword"
          />

          <CelInput
            theme="white"
            type="password"
            labelText="New password"
            value={formData.newPassword}
            field="newPassword"
          />
        </CelForm>

        <View style={{marginTop: 40, marginBottom: 30}}>
          <CelButton
            color="blue"
            loading={isLoading}
            onPress={this.handleChangePassword}
          >
            Change password
          </CelButton>
        </View>

      </SimpleLayout>
    );
  }
}

export default ChangePassword;
