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
  () => ({}),
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
    await actions.logoutUser();
  }

  render() {
    return (
      <RegularLayout>
        <IconButton>Two-Factor Verification</IconButton>
        <IconButton margin="0 0 20 0">Change PIN</IconButton>
        <IconButton margin="0 0 20 0">Change password</IconButton>
        <CelButton onPress={this.logoutUser}>Logout</CelButton>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(SecuritySettings);
