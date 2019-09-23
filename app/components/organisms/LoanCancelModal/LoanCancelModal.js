import React from 'react'

import { MODALS } from '../../../constants/UI'
import CelButton from '../../atoms/CelButton/CelButton'
import CelText from '../../atoms/CelText/CelText'
import CelModal from '../CelModal/CelModal'

class LoanCancelModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
    }
  }

  cancelLoan = async () => {
    const {actions } = this.props;
    this.setState({
      isLoading: true
    });
    await actions.cancelLoan();
    await actions.getAllLoans();
    this.setState({
      isLoading: false
    })
  }

  render() {
    const { actions } = this.props
    const { isLoading } = this.state

    return (
      <CelModal name={MODALS.LOAN_CANCEL_MODAL}>
        <CelText align='center' type='H2' weight='bold' margin='0 0 32 0'>
          You are about to cancel your loan request
        </CelText>
        <CelText align='center' type='H4' margin='0 0 24 0'>
          By doing this you won't be receiving any funds and your loan status will change to canceled
        </CelText>

        <CelButton
          onPress={this.cancelLoan}
          margin="5 0 5 0"
          color="red"
          loading={isLoading}
        >
          Cancel loan request
        </CelButton>
        <CelButton basic onPress={actions.closeModal}>
          Close
        </CelButton>
      </CelModal>
    )
  }
}

export default LoanCancelModal
