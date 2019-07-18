import React, { Component } from 'react';
import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import LoanPaymentListStyle from "./LoanPaymentList.styles";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import Separator from '../../atoms/Separator/Separator';
import STYLES from '../../../constants/STYLES';
import Card from '../../atoms/Card/Card';

@connect(
  state => ({
    coins: state.compliance.loan.coins,
    walletCoins: state.wallet.summary.coins,
    loans: [
      {
        amountToPay: 1000,
        amountPaid: 1000,
        type: 'PaymentType.MONTHLY_INTEREST',
        dueDate: '12.3.5004',
      },
      {
        amountToPay: 2000,
        amountPaid: 2000,
        type: 'PaymentType.MONTHLY_INTEREST',
        dueDate: '12.4.5000',
      },
      {
        amountToPay: 2000,
        amountPaid: 1000,
        type: 'PaymentType.MONTHLY_INTEREST',
        dueDate: '12.5.5000',
      },
      {
        amountToPay: 3000,
        amountPaid: 500,
        type: 'PaymentType.MONTHLY_INTEREST',
        dueDate: '12.6.5000',
      },
      {
        amountToPay: 1000,
        amountPaid: 0,
        type: 'PaymentType.MONTHLY_INTEREST',
        dueDate: '12.7.5001',
      },
      {
        amountToPay: 1000,
        amountPaid: 0,
        type: 'PaymentType.MONTHLY_INTEREST',
        dueDate: '12.8.5001',
      },
      {
        amountToPay: 1000,
        amountPaid: 0,
        type: 'PaymentType.MONTHLY_INTEREST',
        dueDate: '12.9.5001',
      },
      {
        amountToPay: 1000,
        amountPaid: 0,
        type: 'PaymentType.MONTHLY_INTEREST',
        dueDate: '12.8.5001',
      },
      {
        amountToPay: 1000,
        amountPaid: 0,
        type: 'PaymentType.MONTHLY_INTEREST',
        dueDate: '12.9.5001',
      },
      {
        amountToPay: 1000,
        amountPaid: 0,
        type: 'PaymentType.MONTHLY_INTEREST',
        dueDate: '12.10.5001',
      },
      {
        amountToPay: "last payment",
        amountPaid: 12,
        type: 'PaymentType.MONTHLY_INTEREST',
        dueDate: '12.11.5000',
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

  // isPaid represents difference between amountPaid and amoutToPay 
  renderFuturePayments = () => {
    const { loans } = this.props
    const style = LoanPaymentListStyle()
    const futurePayments = loans.slice(0, -1)
    // const nextPayment = loans[0]

    const isNotPaid = futurePayments.filter(p => p.amountPaid < p.amountToPay).map((p, index) => (
      <View style={{ height: 50, marginVertical: 0, backgroundColor: index === 0 ? STYLES.COLORS.MEDIUM_GRAY3 : STYLES.COLORS.LIGHT_GRAY, borderRadius: 8 }}>
        <View style={style.upcomintPayment}>
          <CelText weight='600' type='H3'>{p.amountToPay}</CelText>
          <CelText weight='300' type='H6'>{p.dueDate}</CelText>
        </View>
        {index === 0 || index === futurePayments.length - 3 ? null :
          <Separator />}
      </View>
      )
      )
      return (
      <View>
          <View style={style.nextPayment}>
            <CelText align='center' type='H6'>Next payment</CelText>
          </View>
          <View>
            {isNotPaid}
          </View>
        </View>
        )
      }
    
  renderPayments = () => {
    const {loans} = this.props
        const style = LoanPaymentListStyle()
        const principalPayout = loans[loans.length - 1]
    
        return (
      <View>
          {this.renderFuturePayments()}
          <View style={style.principalPayment}>
            <CelText align='center' type='H6'>Principal payout</CelText>
          </View>
          <Card color={STYLES.COLORS.GREEN} >
            <View style={style.lastPayment}>
              <CelText color='white' weight='600' type='H3'>{principalPayout.amountToPay}</CelText>
              <CelText color='white' weight='300' type='H6'>{principalPayout.dueDate}</CelText>
            </View>
          </Card>

        </View>
        )
      }
    
  render() {
    // const style = LoanPaymentListStyle();
    return (
      <RegularLayout>
          <View style={{ marginHorizontal: 15 }}>
            <CelText weight='500' type='H6'>Upcoming Payments</CelText>
            <View style={{ marginTop: 15 }}>
              {this.renderPayments()}
            </View>
          </View>
        </RegularLayout>
        );
      }
    }
    
    export default LoanPaymentList
