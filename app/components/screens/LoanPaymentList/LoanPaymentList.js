import React, { Component } from 'react';
import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";


import * as appActions from "../../../redux/actions";
// import LoanPaymentListStyle from "./LoanPaymentList.styles";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import Separator from '../../atoms/Separator/Separator';
import STYLES from '../../../constants/STYLES';

@connect(
  state => ({
    coins: state.compliance.loan.coins,
    walletCoins: state.wallet.summary.coins,
    loans: [
      {
        amountToPay: 'fist payment',
        amountPaid: 12,
        type: 'PaymentType.MONTHLY_INTEREST',
        dueDate: '12.3.5000',
      },
      {
        amountToPay: 1241,
        amountPaid: 12,
        type: 'PaymentType.MONTHLY_INTEREST',
        dueDate: '12.3.5000',
      },
      {
        amountToPay: "last payment",
        amountPaid: 12,
        type: 'PaymentType.MONTHLY_INTEREST',
        dueDate: '12.3.5000',
      }
    ]
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

  renderPayments = () => {
    const { loans } = this.props
    const nextPayment = loans.map(p => p)[0]
    // console.log(nextPayment)
    // console.log(loans)
    return (
      <View>
        <View style={{ backgroundColor: STYLES.COLORS.MEDIUM_GRAY1, borderRadius: 8, height: 56}}>
          <View style={{ flexDirection: 'row', paddingHorizontal: 10 ,justifyContent: 'space-between', alignItems:'center'}}>
            <CelText weight='600' type='H3'>{nextPayment.amountToPay}</CelText>
            <CelText weight='300' type='H6'>{nextPayment.dueDate}</CelText>
          </View>
        </View>

        {loans.map(p => (
          <View style={{ marginVertical: 10, }}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-between', alignItems: 'center', }}>
              <CelText  weight='600' type='H3'>{p.amountToPay}</CelText>
              <CelText  weight='300' type='H6'>{p.dueDate}</CelText>

            </View>
            <Separator margin='20 0 0 0' />
          </View>
        ))}
      </View>
    )
  }

  render() {
    // const { walletCoins } = this.props
    // const style = LoanPaymentListStyle();
    return (
      <RegularLayout>
        <View style={{marginHorizontal: 15}}>
        <CelText weight='500' type='H6'>Upcoming Payments</CelText>
        <View style={{ marginTop: 30 }}>
          {this.renderPayments()}
        </View>
        </View>
      </RegularLayout>
    );
  }
}

export default LoanPaymentList
