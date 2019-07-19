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
import { THEMES } from "../../../constants/UI";

@connect(
  state => ({
    allLoans: state.loans.allLoans,
    theme: state.user.appSettings.theme,
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

  // isNot1Paid represents difference between amountPaid and amoutToPay 
  renderFuturePayments = () => {
    const { theme, allLoans } = this.props
    const style = LoanPaymentListStyle()
    const fillBackgroundColor = theme === THEMES.LIGHT ? STYLES.COLORS.LIGHT_GRAY : STYLES.COLORS.DARK_BACKGROUND
    const futurePayments = allLoans[1].amortizationTable.slice(0, -1)

    // console.log(futurePa1yments.fil)


    const isNotPaid = futurePayments.filter(p => p.isPaid === false).map((p, index, key) => (
      <View style={{backgroundColor: index === 0 ? STYLES.COLORS.MEDIUM_GRAY3 : (fillBackgroundColor), borderRadius: 8 }}>
        <View key={key} style={style.upcomintPayment}>
          <CelText  weight='600' type='H3'>{p.amountToPay}</CelText>
          <CelText weight='300' type='H6'>{p.dueDate}</CelText>
        </View>
        {index === 0 ? null :
          <Separator />}
      </View>
    )
    )
    return (
      <View>
        <View style={style.nextPayment}>
          <CelText color={STYLES.COLORS.MEDIUM_GRAY} align='center' type='H6'>Next payment</CelText>
        </View>
        <View>
          {isNotPaid}
        </View>
      </View>
    )
  }

  renderPrincipalPayments = () => {
    const { allLoans } = this.props
    const style = LoanPaymentListStyle()
    const futurePayments = allLoans[1].amortizationTable

    const principalPayout = futurePayments.filter(p => p.type === 'RECEIVING_PRINCIPAL_BACK')

    return (
      <View>
        <View style={style.principalPayment}>
          <CelText color={STYLES.COLORS.MEDIUM_GRAY} align='center' type='H6'>Principal payout</CelText>
        </View>
        <Card color={STYLES.COLORS.GREEN}>
          <View style={style.lastPayment}>
            <CelText color='white' weight='600' type='H3'>{principalPayout[0].amountToPay}</CelText>
            <CelText color='white' weight='300' type='H6'>{principalPayout[0].dueDate}</CelText>
          </View>
        </Card>
      </View>
    )
  }

  render() {
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
