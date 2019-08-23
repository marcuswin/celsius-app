import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import { LOAN_PAYMENT_TYPES } from "../../../constants/DATA";
import PaymentListItem from "../../atoms/PaymentListItem/PaymentListItem";

@connect(
  state => ({
    activeLoan: state.loans.activeLoan,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)

class LoanPaymentList extends Component {
  static propTypes = {};
  static defaultProps = {}

  static navigationOptions = () => ({
    title: "Upcoming Payments",
    right: "profile"
  });

  constructor(props) {
    super(props);

    const { navigation, actions } = props;
    const loanId = navigation.getParam("id");
    actions.setActiveLoan(loanId)
  }

  renderFuturePayments = () => {
    const { activeLoan } = this.props

    const upcomingPayments = activeLoan.amortization_table.filter(payment => !payment.isPaid && payment.type === LOAN_PAYMENT_TYPES.MONTHLY_INTEREST)
    return upcomingPayments.map((payment, i) => {
      if (i === 0) {
        return (
          <PaymentListItem
            key={`${payment.dueDate}${i}`}
            payment={payment}
            upperText="Next payment"
            type="highlight"
          />
        )
      }

      return <PaymentListItem payment={payment} key={`${payment.dueDate}${i}`} />
    })
  }

  renderPrincipalPayments = () => {
    const { activeLoan } = this.props
    const principalPayment = activeLoan.amortization_table.find(p => p.type === LOAN_PAYMENT_TYPES.RECEIVING_PRINCIPAL_BACK)

    return principalPayment && (
      <PaymentListItem
        payment={principalPayment}
        type="green"
        upperText="Principal payout"
      />
    )
  }

  render() {
    const { activeLoan } = this.props

    if (!activeLoan) return null;

    return (
      <RegularLayout>
        <View style={{ marginHorizontal: 15 }}>
          <CelText weight='500' type='H6'>Upcoming Payments</CelText>
          <View style={{ marginTop: 15 }}>
            <View>
              {this.renderFuturePayments()}
              {this.renderPrincipalPayments()}
            </View>
          </View>
        </View>
      </RegularLayout>
    );
  }
}

export default LoanPaymentList
