import React, { Component } from 'react';
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
// import SecuritySettingsStyle from "./SecuritySettings.styles";
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import IconButton from '../../organisms/IconButton/IconButton';
import CelButton from '../../atoms/CelButton/CelButton';

@connect(
  (state) => ({
    user: state.user.profile,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class SecuritySettings extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  static navigationOptions = () => ({
    title: "Security"
  });

  logoutUser = async () => {
    const { actions } = this.props;
    await actions.logoutFromAllDevices();
  }

  render() {
    const { actions, user } = this.props;

    return (
      <RegularLayout>
        <IconButton right="OFF" onPress={() => {
          actions.navigateTo('VerifyProfile', {
            onSuccess: () => actions.navigateTo('TwoFactorSettings')
          })
        }}>
          Two-Factor Verification
        </IconButton>

        { true && (
          <IconButton
            margin="0 0 20 0"
            onPress={() => actions.navigateTo('VerifyProfile', {
              onSuccess: () => actions.navigateTo('ChangePin')
            })}
          >
            Change PIN
          </IconButton>
        )}


        { !user.registered_with_social && (
          <IconButton margin="0 0 20 0" onPress={() => actions.navigateTo('ChangePassword')}>Change password</IconButton>
        )}

        <CelButton onPress={this.logoutUser}>Log out from all devices</CelButton>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(SecuritySettings);
