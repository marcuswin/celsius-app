import React, {Component} from 'react'
import {Platform, Switch} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import * as appActions from '../../../redux/actions'
import RegularLayout from '../../layouts/RegularLayout/RegularLayout'
import IconButton from '../../organisms/IconButton/IconButton'
import STYLES from '../../../constants/STYLES'
import {getTheme} from '../../../utils/styles-util'
import Card from "../../atoms/Card/Card";
import CelText from "../../atoms/CelText/CelText";

@connect(
  state => ({
    is2FAEnabled: state.user.profile.two_factor_enabled,
    user: state.user.profile,
    kycStatus: state.user.profile.kyc,
    formData: state.forms.formData
  }),
  dispatch => ({actions: bindActionCreators(appActions, dispatch)})
)
class PrincipalPayment extends Component {
  static propTypes = {
    // text: PropTypes.string
  }
  static defaultProps = {}

  static navigationOptions = () => ({
    title: 'Principal payout',
    right: "profile"
  })

  constructor(props) {
    super(props)

    this.state = {
      payOutPrincipalFromCollateral: false
    }
  }

  componentDidMount() {
    const {actions} = this.props
    actions.getProfileInfo()
  }

  rightSwitch = () => {
    const {payOutPrincipalFromCollateral} = this.state
    const isIos = Platform.OS === 'ios'
    const falseColor = isIos ? 'transparent' : STYLES.COLORS.DARK_GRAY3
    const theme = getTheme()
    return (
      <Switch
        onValueChange={this.handleSwitchChange}
        value={payOutPrincipalFromCollateral}
        thumbColor={theme === 'light' ? STYLES.COLORS.WHITE : STYLES.COLORS.DARK_TOGGLE_FOREGROUND}
        ios_backgroundColor={theme === 'light' ? STYLES.COLORS.DARK_GRAY3 : STYLES.COLORS.DARK_TOGGLE_BACKGROUND}
        trackColor={{false: falseColor, true: STYLES.COLORS.GREEN}}
      />
    )
  }

  handleSwitchChange = () => {
    const {payOutPrincipalFromCollateral} = this.state
    // const {actions} = this.props
    this.setState({payOutPrincipalFromCollateral: !payOutPrincipalFromCollateral})

    if (payOutPrincipalFromCollateral) {
      // console.log('switch deactivated')
    } else {
      // console.log('switch activated')
    }
  }

  render() {
    const Switcher = this.rightSwitch

    return (
      <RegularLayout>
        <IconButton margin={'10 0 10 0'} right={<Switcher/>} hideIconRight>
          Payout Principal From Collateral
        </IconButton>

        <Card color={STYLES.COLORS.ORANGE}>
          <CelText
            weight='300'
            alignItems='center'
            color='#FFFFFF'
          >
            Paying out your principal from the collateral will be automatically completed upon maturity date.
          </CelText>
        </Card>

        <IconButton
          margin='10 0 10 0'
          // onPress={() => actions.navigateTo('ChangePassword')}
          // onPress={() => console.log('on press principal payment type')}
        >
          Change Principal Payment Type
        </IconButton>

      </RegularLayout>
    )
  }
}

export default PrincipalPayment
