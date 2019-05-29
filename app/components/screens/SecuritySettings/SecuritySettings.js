import React, { Component } from 'react'
import { View, Platform, Switch } from 'react-native'
// import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import testUtil from '../../../utils/test-util'
import * as appActions from '../../../redux/actions'
// import SecuritySettingsStyle from "./SecuritySettings.styles";
import RegularLayout from '../../layouts/RegularLayout/RegularLayout'
import IconButton from '../../organisms/IconButton/IconButton'
import CelButton from '../../atoms/CelButton/CelButton'
import CelModal from '../../organisms/CelModal/CelModal'
import { MODALS } from '../../../constants/UI'
import CelText from '../../atoms/CelText/CelText'
import STYLES from '../../../constants/STYLES'
import { KYC_STATUSES } from '../../../constants/DATA'

@connect(
  state => ({
    is2FAEnabled: state.user.profile.two_factor_enabled,
    user: state.user.profile,
    kycStatus: state.user.profile.kyc,
    formData: state.forms.formData
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class SecuritySettings extends Component {
  static propTypes = {
    // text: PropTypes.string
  }
  static defaultProps = {}

  static navigationOptions = () => ({
    title: 'Security'
  })

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.is2FAEnabled !== prevState.is2FAEnabled) {
      return {
        is2FAEnabled: nextProps.is2FAEnabled
      }
    }
    return null
  }

  constructor (props) {
    super(props)

    this.state = {
      is2FAEnabled: false
    }
  }

  componentDidMount () {
    const { actions } = this.props
    actions.getProfileInfo()
  }

  logoutUser = async () => {
    const { actions } = this.props
    await actions.logoutFromAllDevices()
  }

  rightSwitch = () => {
    const { is2FAEnabled } = this.state
    const isIos = Platform.OS === 'ios'
    const falseColor = isIos ? 'transparent' : STYLES.COLORS.DARK_GRAY3
    return (
      <Switch
        onValueChange={this.handleSwitchChange}
        value={is2FAEnabled}
        thumbColor={STYLES.COLORS.WHITE}
        ios_backgroundColor={STYLES.COLORS.DARK_GRAY3}
        trackColor={{ false: falseColor, true: STYLES.COLORS.GREEN }}
      />
    )
  }

  handleSwitchChange = () => {
    const { is2FAEnabled } = this.state
    const { actions } = this.props

    if (is2FAEnabled) {
      actions.openModal(MODALS.REMOVE_AUTHAPP_MODAL)
    } else {
      actions.navigateTo('VerifyProfile', {
        onSuccess: async () => {
          const { formData } = this.props
          const secret = await actions.getTwoFactorSecret(formData.pin)
          if (secret) {
            actions.navigateTo('TwoFactorSettings', { secret })
          } else {
            actions.navigateBack()
          }
        }
      })
    }
  }
  removeTwoFactor = async () => {
    const { actions } = this.props
    await actions.closeModal()

    actions.navigateTo('VerifyProfile', { onSuccess: actions.disableTwoFactor })
  }

  render () {
    const { actions, is2FAEnabled, user, kycStatus } = this.props
    const Switcher = this.rightSwitch

    return (
      <RegularLayout>
        <IconButton margin={'20 0 20 0'} right={<Switcher />} hideIconRight>
          Two-Factor Verification
        </IconButton>

        {!is2FAEnabled && (
          <IconButton
            margin='0 0 20 0'
            onPress={() =>
              actions.navigateTo('VerifyProfile', {
                onSuccess: () => actions.navigateTo('ChangePin')
              })
            }
          >
            Change PIN
          </IconButton>
        )}

        {!user.registered_with_social && (
          <IconButton
            margin='0 0 30 0'
            onPress={() => actions.navigateTo('ChangePassword')}
          >
            Change password
          </IconButton>
        )}

        {kycStatus && kycStatus.status === KYC_STATUSES.passed ? (
          <CelButton
            margin='0 0 30 0'
            basic
            onPress={() => actions.navigateTo('SecurityOverview')}
          >
            Security screen overview
          </CelButton>
        ) : null}

        <CelButton onPress={this.logoutUser}>
          Log out from all devices
        </CelButton>

        <CelModal name={MODALS.REMOVE_AUTHAPP_MODAL}>
          <CelText type='H2' align='center' weight='bold' margin='30 0 0 0'>
            Remove Auth App
          </CelText>
          <CelText
            type='H4'
            align='center'
            weight='extra-light'
            margin='16 0 0 0'
          >
            If you remove authentication application you will lose a second step
            of verification. Are you sure you want to proceed?
          </CelText>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <CelButton margin='30 0 20 0' onPress={this.removeTwoFactor}>
              Remove
            </CelButton>
            <CelButton margin='0 0 20 0' onPress={actions.closeModal} basic>
              Cancel
            </CelButton>
          </View>
        </CelModal>
      </RegularLayout>
    )
  }
}

export default testUtil.hookComponent(SecuritySettings)
