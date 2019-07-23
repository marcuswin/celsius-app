import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import PaymentListItem from "../../atoms/PaymentListItem/PaymentListItem";

@connect(
  state => ({
    activeLoan: state.loans.activeLoan,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)

class LoanPaymentHistory extends Component {
  static propTypes = {};
  static defaultProps = {}

  static navigationOptions = () => ({
    title: "Payment History",
    right: "profile"
  });

  constructor(props) {
    super(props);

    const { navigation, actions } = props;
    const loanId = navigation.getParam("id");
    actions.setActiveLoan(loanId)
  }

  render() {
    const { activeLoan } = this.props

    if (!activeLoan) return null;

    const paymentHistory = activeLoan.amortization_table.filter(p => p.isPaid)

    return (
      <RegularLayout>
        <View style={{ marginHorizontal: 15 }}>
          <CelText weight='500' type='H6'>Payment History</CelText>
          <View style={{ marginTop: 15 }}>
            { paymentHistory.map((p, i) => (
              <PaymentListItem payment={p} key={`${p.dueDate}${i}`} />
            )) }
          </View>
        </View>
      </RegularLayout>
    );
  }
}

export default LoanPaymentHistory
