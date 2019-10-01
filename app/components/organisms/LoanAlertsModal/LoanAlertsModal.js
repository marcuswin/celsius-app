import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { LOAN_ALERTS, MODALS } from "../../../constants/UI";
import * as appActions from "../../../redux/actions";
import InfoModal from "../../molecules/InfoModal/InfoModal";
import formatter from '../../../utils/formatter'


@connect(
  (state) => ({
    allLoans: state.loans.allLoans,
    loanAlerts: state.loans.loanAlerts,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class LoanAlertsModal extends React.Component {
  static getDerivedStateFromProps (nextProps) {
    const activeAlert = nextProps.loanAlerts && nextProps.loanAlerts.length ? nextProps.loanAlerts[0] : null
    const loan = activeAlert && nextProps.allLoans.find(l => l.id === activeAlert.id)

    return { activeAlert, loan }
  }

  constructor(props) {
    super(props)

    const activeAlert = props.loanAlerts && props.loanAlerts.length ? props.loanAlerts[0] : null
    const loan = activeAlert && props.allLoans.find(l => l.id === activeAlert.id)

    this.state = { activeAlert, loan }
  }

  payPrincipal = () => {
    const { loan } = this.state
    const { actions } = this.props

    actions.navigateTo('VerifyProfile', {
      onSuccess: () => actions.payPrincipal(loan.id)
    })
    actions.closeModal()
  }

  renderPrincipalPaymentAlert = () => {
    const { loan } = this.state

    const amountToPay = formatter.crypto(loan.loan_amount, loan.coin_loan_asset, { noPrecision: true })
    const copy = `You have a principal of ${ amountToPay } which you can payout of your wallet.`

    return (
      <InfoModal
        name={MODALS.LOAN_ALERT_MODAL}
        heading="You are almost done with your loan payout!"
        paragraphs={[copy]}
        yesCopy="Payout principal"
        onYes={() => this.payPrincipal()}
      />
    )
  }

  render() {
    const { activeAlert } = this.state
    if (!activeAlert) return null

    switch (activeAlert.type) {
      case LOAN_ALERTS.PRINCIPAL_ALERT:
        return this.renderPrincipalPaymentAlert()
    }
  }
}

export default LoanAlertsModal
