import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Platform, Switch, View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'

import testUtil from '../../../utils/test-util'
import * as appActions from '../../../redux/actions'
// import WalletSettingsStyle from "./WalletSettings.styles";
import RegularLayout from '../../layouts/RegularLayout/RegularLayout'
import Separator from '../../atoms/Separator/Separator'
import IconButton from '../../organisms/IconButton/IconButton'
import STYLES from '../../../constants/STYLES'
import apiUtil from '../../../utils/api-util'
import API from '../../../constants/API'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import Spinner from '../../atoms/Spinner/Spinner'
import Card from '../../atoms/Card/Card'
import CelText from '../../atoms/CelText/CelText'
import { getSecureStoreKey, setSecureStoreKey } from '../../../utils/expo-storage'
import { WALLET_LANDING_VIEW_TYPES } from '../../../constants/UI';

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
      defaultView: ''
    }
  }

  async componentDidMount () {
    const { actions } = this.props
    actions.getUserAppSettings()
    const defaultView = await getSecureStoreKey('DEFAULT_VIEW')
    this.setState({ defaultView })
  }

  changeInterestEarn = () => {
    const { actions, appSettings } = this.props
    actions.setUserAppSettings({
      interest_in_cel: !appSettings.interest_in_cel
    })
  }

  rightSwitch = () => {
    const { appSettings, callsInProgress } = this.props
    const isIos = Platform.OS === 'ios'
    const falseColor = isIos ? 'transparent' : STYLES.COLORS.DARK_GRAY3
    const loading = apiUtil.areCallsInProgress(
      [API.SET_APP_SETTINGS],
      callsInProgress
    )
    return loading ? (
      <Spinner size={30} />
    ) : (
      <Switch
        value={appSettings.interest_in_cel}
        disabled
        thumbColor={STYLES.COLORS.WHITE}
        ios_backgroundColor={STYLES.COLORS.DARK_GRAY3}
        trackColor={{ false: falseColor, true: STYLES.COLORS.GREEN }}
      />
    )
  }

  handleViewChange = async view => {
    this.setState({ defaultView: view })
    await setSecureStoreKey('DEFAULT_VIEW', view)
  }

  render () {
    const { callsInProgress, email } = this.props
    const { defaultView } = this.state

    const loading = apiUtil.areCallsInProgress(
      [API.GET_APP_SETTINGS],
      callsInProgress
    )
    if (loading) return <LoadingScreen />
    const disabled =
      !!email.includes('@celsius.network') ||
      !!email.includes('@mvpworkshop.co')

    const filterOptions = [
      { label: WALLET_LANDING_VIEW_TYPES.GRID, value: WALLET_LANDING_VIEW_TYPES.GRID },
      { label: WALLET_LANDING_VIEW_TYPES.LIST, value: WALLET_LANDING_VIEW_TYPES.LIST }
    ]

    return (
      <RegularLayout>
        {/* <IconButton right={<CelText>USD</CelText>}>Default currency</IconButton> */}
        <RNPickerSelect
          placeholder={{ label: 'Chooise default view', color: 'rgba(0,0,0,0.5)' }}
          items={filterOptions}
          onValueChange={this.handleViewChange}
          value={defaultView || null}
          style={{ height: 16, width: 16 }}
        >
          <IconButton margin='0 0 20 0'>Default view</IconButton>
        </RNPickerSelect>
        <Separator text='INTEREST' />

        {disabled ? (
          <IconButton
            margin={'20 0 20 0'}
            right={this.rightSwitch()}
            hideIconRight
            onPress={() => this.changeInterestEarn()}
          >
            Earn interest in CEL
          </IconButton>
        ) : (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Card size={'half'}>
              <CelText align={'center'} weight={'500'} type={'H5'}>
                COMING SOON!
              </CelText>
            </Card>
          </View>
        )}
      </RegularLayout>
    )
  }
}

export default testUtil.hookComponent(WalletSettings)
