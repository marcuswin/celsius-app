import React, { Component } from 'react';
import { View, TouchableOpacity, Platform, Switch } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
// import SecuritySettingsStyle from "./SecuritySettings.styles";
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import IconButton from '../../organisms/IconButton/IconButton';
import CelButton from '../../atoms/CelButton/CelButton';
import CelModal from '../../organisms/CelModal/CelModal'
import { MODALS } from '../../../constants/UI'
import CelText from '../../atoms/CelText/CelText'
import STYLES from '../../../constants/STYLES'

@connect(
  state => ({
    is2FAEnabled: state.user.profile.two_factor_enabled,
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

  rightSwitch = () => {
    const { is2FAEnabled } = this.props
    const isIos = Platform.OS === 'ios'
    const falseColor = isIos ? "transparent" : STYLES.COLORS.DARK_GRAY3;
    return (
      <Switch value={is2FAEnabled} disabled thumbColor={STYLES.COLORS.WHITE} ios_backgroundColor={STYLES.COLORS.DARK_GRAY3} trackColor={{ false: falseColor, true: STYLES.COLORS.GREEN }} />
    )
  }

  removeTwoFactor = async () => {
    const { actions } = this.props;
    await actions.closeModal()

    actions.navigateTo('VerifyProfile', { onSuccess: actions.disableTwoFactor })
  }

  render() {
    const { actions, is2FAEnabled, user } = this.props;
    return (
      <RegularLayout>
        <IconButton margin={"20 0 20 0"} right={this.rightSwitch()} hideIconRight onPress={() => {
          if (is2FAEnabled) {
            actions.openModal(MODALS.REMOVE_AUTHAPP_MODAL)
          } else {
            actions.navigateTo('VerifyProfile', {
              onSuccess: () => actions.navigateTo('TwoFactorSettings')
            })
          }
        }}>
          Two-Factor Verification
        </IconButton>

        {!is2FAEnabled && (
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
          <IconButton margin="0 0 30 0" onPress={() => actions.navigateTo('ChangePassword')}>Change password</IconButton>
        )}

        <TouchableOpacity onPress={() => actions.navigateTo('SecurityOverview')}> 
        <View>
        <CelText type='H2' align='center' weight='bold' margin='30 0 30 0'> 
        Security screen overview
         </CelText>
         </View>
        </TouchableOpacity>

        <CelButton onPress={this.logoutUser}>Log out from all devices</CelButton>

        <CelModal name={MODALS.REMOVE_AUTHAPP_MODAL}>
          <CelText type='H2' align='center' weight='bold' margin='30 0 0 0'>Remove Auth App</CelText>
          <CelText type='H4' align='center' weight='extra-light' margin='16 0 0 0'>If you remove authentication application you will lose a second step of verification. Are you sure you want to proceed?</CelText>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <CelButton margin="30 0 20 0" onPress={this.removeTwoFactor}>
              Remove
              </CelButton>
            <CelButton  margin="0 0 20 0" onPress={() => actions.closeModal()} basic>
              Cancel
              </CelButton>
          </View>
        </CelModal>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(SecuritySettings);
