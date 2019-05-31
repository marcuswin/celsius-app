import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import testUtil from '../../../utils/test-util'
import * as appActions from '../../../redux/actions'
import CelModal from '../CelModal/CelModal'
import { MODALS } from '../../../constants/UI'
import CelButton from '../../atoms/CelButton/CelButton'
import CelText from '../../atoms/CelText/CelText'
import InterestCalculator from '../InterestCalculator/InterestCalculator'

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class InterestCalculatorModal extends Component {
  render () {
    const { actions } = this.props
    return (
      <CelModal name={MODALS.INTEREST_CALCULATOR_MODAL} padding='0 0 0 0'>
        <CelText weight='bold' type='H2' align={'center'}>
          Interest calculator
        </CelText>
        <CelText align={'center'} margin='4 0 20 0'>
          How much do you plan to deposit?
        </CelText>

        <InterestCalculator />

        <CelButton
          onPress={() => {
            actions.navigateTo('Deposit')
            actions.closeModal()
          }}
          margin='15 0 15 0'
        >
          Deposit coins
        </CelButton>
      </CelModal>
    )
  }
}

export default testUtil.hookComponent(InterestCalculatorModal)
