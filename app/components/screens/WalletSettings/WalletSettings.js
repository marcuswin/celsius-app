import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import testUtil from '../../../utils/test-util'
import * as appActions from '../../../redux/actions'
// import WalletSettingsStyle from "./WalletSettings.styles";
import RegularLayout from '../../layouts/RegularLayout/RegularLayout'
import Separator from '../../atoms/Separator/Separator'
import IconButton from '../../organisms/IconButton/IconButton'
import SimpleSelect from '../../molecules/SimpleSelect/SimpleSelect'
import STYLES from '../../../constants/STYLES'

@connect(
  state => ({
    appSettings: state.user.appSettings,
    formData: state.forms.formData
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

  componentDidMount () {
    const { actions } = this.props
    actions.getUserAppSettings()
  }

  changeInterestEarn = (field, item) => {
    const { actions } = this.props
    actions.updateFormField(field, item)
    // field, item
    actions.setUserAppSettings({ interest_in_cel: item === 'cel' })
  }

  render () {
    const interestSelectData = [
      { label: 'CEL', value: 'cel' },
      { label: 'Other coins', value: 'other' }
    ]
    const { appSettings, formData } = this.props
    let interestEarn = formData && formData.interestEarnIn
    if (!interestEarn) {
      interestEarn = appSettings.interest_in_cel ? 'cel' : 'other'
    }
    return (
      <RegularLayout>
        {/* <IconButton right={<CelText>USD</CelText>}>Default currency</IconButton>
        <IconButton margin='0 0 20 0'>Default view</IconButton> */}
        <Separator text='INTEREST' />
        <IconButton
          hideIconRight
          right={
            <SimpleSelect
              style={{ color: STYLES.COLORS.MEDIUM_GRAY3, fontSize: 18 }}
              fillColor={STYLES.COLORS.MEDIUM_GRAY3}
              iconName='IconChevronDown'
              iconWidth={14}
              items={interestSelectData}
              field='interestEarnIn'
              displayValue={interestEarn}
              onChange={this.changeInterestEarn}
            />
          }
        >
          Earn interest in
        </IconButton>
      </RegularLayout>
    )
  }
}

export default testUtil.hookComponent(WalletSettings)
