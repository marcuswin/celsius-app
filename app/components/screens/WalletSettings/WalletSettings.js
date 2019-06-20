import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Platform, Switch } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'


import * as appActions from '../../../redux/actions'
import RegularLayout from '../../layouts/RegularLayout/RegularLayout'
import Separator from '../../atoms/Separator/Separator'
import IconButton from '../../organisms/IconButton/IconButton'
import STYLES from '../../../constants/STYLES'
import apiUtil from '../../../utils/api-util'
import API from '../../../constants/API'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import { WALLET_LANDING_VIEW_TYPES } from '../../../constants/UI'
import { deleteSecureStoreKey } from '../../../utils/expo-storage';

@connect(
  state => ({
    appSettings: state.user.appSettings,
    formData: state.forms.formData,
    callsInProgress: state.api.callsInProgress,
    email: state.user.profile.email
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class WalletSettings extends Component {
  static propTypes = {
    // text: PropTypes.string
  }
  static defaultProps = {}

  static navigationOptions = () => ({
    title: 'Wallet'
  })

  constructor (props) {
    super(props)
    this.state = {
      defaultView: '',
      // interestInCel: props.appSettings && props.appSettings.interest_in_cel || false
      interestInCel: false
    }
  }

  async componentDidMount () {
    const { actions, appSettings } = this.props
    await actions.getUserAppSettings()
    this.setState({
      defaultView: this.props.appSettings.default_wallet_view,
      interestInCel: appSettings.interest_in_cel
    })
  }

  getViewText = defaultView => {
    if (defaultView === WALLET_LANDING_VIEW_TYPES.GRID) {
      return 'Grid'
    }
    return 'List'
  }

  changeInterestEarn = async () => {
    const { actions, appSettings } = this.props
    const changesInterestEarn = !appSettings.interest_in_cel
    if(!changesInterestEarn) await deleteSecureStoreKey('HIDE_MODAL_INTEREST_IN_CEL')
    actions.setUserAppSettings({
      interest_in_cel: changesInterestEarn
    })
    this.setState({ interestInCel: changesInterestEarn })
  }

  rightSwitch = () => {
    const { interestInCel } = this.state
    const isIos = Platform.OS === 'ios'
    const falseColor = isIos ? 'transparent' : STYLES.COLORS.DARK_GRAY3

    return (
      <Switch
        value={interestInCel}
        onValueChange={this.changeInterestEarn}
        thumbColor={STYLES.COLORS.WHITE}
        ios_backgroundColor={STYLES.COLORS.DARK_GRAY3}
        trackColor={{ false: falseColor, true: STYLES.COLORS.GREEN }}
      />
    )
  }

  handleViewChange = async view => {
    const { actions } = this.props
    this.setState({ defaultView: view })
    actions.setUserAppSettings({ default_wallet_view: view })
  }

  render () {
    const { callsInProgress , actions} = this.props
    const { defaultView } = this.state

    const loading = apiUtil.areCallsInProgress(
      [API.GET_APP_SETTINGS],
      callsInProgress
    )
    if (loading) return <LoadingScreen />

    const filterOptions = [
      { label: 'Grid view', value: WALLET_LANDING_VIEW_TYPES.GRID },
      { label: 'List view', value: WALLET_LANDING_VIEW_TYPES.LIST }
    ]

    const Switcher = this.rightSwitch

    return (
      <RegularLayout>
        {/* <IconButton right={<CelText>USD</CelText>}>Default currency</IconButton> */}
        <RNPickerSelect
          placeholder={{
            label: 'Choose default view',
            color: 'rgba(0,0,0,0.5)'
          }}
          items={filterOptions}
          onValueChange={this.handleViewChange}
          value={defaultView || null}
          style={{ height: 16, width: 16 }}
        >
          <IconButton margin='0 0 20 0'>
            Default view: {this.getViewText(defaultView)}
          </IconButton>
        </RNPickerSelect>
          <IconButton
          onPress={() => actions.navigateTo('WithdrawAddressOverview')}
          margin={'0 0 20 0'}
          IconRight
        >
          Withdrawal addresses
        </IconButton>
        <Separator text='INTEREST' />

        <IconButton
          margin={'20 0 20 0'}
          right={<Switcher />}
          hideIconRight
        >
          Earn interest in CEL
        </IconButton>
       
      </RegularLayout>
    )
  }
}

export default WalletSettings
