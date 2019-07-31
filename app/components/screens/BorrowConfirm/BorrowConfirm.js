import React, { Component } from 'react';
import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";


import * as appActions from "../../../redux/actions";
import BorrowConfirmStyle from "./BorrowConfirm.styles";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import Separator from '../../atoms/Separator/Separator';
import formatter from '../../../utils/formatter';
import STYLES from '../../../constants/STYLES';
import CelButton from '../../atoms/CelButton/CelButton';

@connect(
  state => ({
    formData: state.forms.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class BorrowConfirm extends Component {
  static propTypes = {};
  static defaultProps = {}

  static navigationOptions = () => ({
    title: "Confirm your loan",
  });

  render() {
    const { formData } = this.props;
    const style = BorrowConfirmStyle();

    return (
      <RegularLayout>
        <View>
          <CelText type="H4" weight="300" align="center">You are about to borrow </CelText>
          <CelText align="center" type="H0" weight="600" style={{ paddingBottom: 10 }}>{formatter.usd(formData.loanAmount, { precision: 0 })}</CelText>
          <View style={style.estimatedCollateral}>
            <CelText type="H6" weight="300" align="center" style={{ paddingBottom: 10 }}>Estimated collateral</CelText>
            <CelText type="H3" weight="600" align="center" style={{ paddingBottom: 10 }}>{formatter.percentage(formData.interest)}%</CelText>
            <View style={style.collateralInnerBox}>
              <CelText type="H6" weight="300" align="left">The exact amount of collateral needed will be determined upon approval. Coins used for collateral will be locked and ineligible to earn interest.</CelText>
            </View>
          </View>

          <View style={style.termLenght}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <CelText type="H6" weight="300" color={STYLES.COLORS.MEDIUM_GRAY} style={{ paddingBottom: 10 }}>Term length</CelText>
              <CelText type="H4" weight="600" >{formData.termOfLoan} months</CelText>
            </View>
            <Separator vertical />
            <View style={{ flex: 1, alignItems: 'center' }}>
              <CelText type="H6" weight="300" color={STYLES.COLORS.MEDIUM_GRAY} style={{ paddingBottom: 10 }}>Annual interest rate</CelText>
              <CelText type="H4" weight="600" >{formatter.percentage(formData.interest)}%</CelText>
            </View>
          </View>

          <View style={style.termLenght}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <CelText type="H6" weight="300" color={STYLES.COLORS.MEDIUM_GRAY} style={{ paddingBottom: 10 }}>Monthly interest</CelText>
              <CelText type="H3" weight="600" align="center">{formatter.usd(formData.monthlyPayment)}</CelText>
            </View>
            <Separator vertical />
            <View style={{ flex: 1, alignItems: 'center' }}>
              <CelText type="H6" weight="300" color={STYLES.COLORS.MEDIUM_GRAY} style={{ paddingBottom: 10 }}>Total interest</CelText>
              <CelText type="H4" weight="600" color={STYLES.COLORS.CELSIUS_BLUE}>{formatter.percentage(formData.interest)}%</CelText>
            </View>
          </View>


          <View style={style.totalOfPayments}>
            <CelText type='H6' weight='300'>Total of Payments</CelText>
            <CelText type='H3' weight='600'>5,450 USDC</CelText>
            <CelText type='H6' weight='300'>(Amount Borrowed + Total Interest)</CelText>
            <Separator margin='10 0 10 0' />
            <CelText type='H6' weight='300'>Number of Payments</CelText>
            <CelText type='H3' weight='600'>12</CelText>
          </View>

          <View style={style.reduceInterest}>

            <View style={{ alignItems: 'center' }}>
              <CelText type="H6" weight="300" color={STYLES.COLORS.LIGHT_GRAY} style={{paddingBottom: 5}}> Reduce your interest rate by</CelText>
              <CelText type="H3" weight="600" color={STYLES.COLORS.LIGHT_GRAY} style={{paddingBottom: 5}}> XX% </CelText>
              <CelText type="H6" weight="300" color={STYLES.COLORS.LIGHT_GRAY}> by paying out in CEL</CelText>

            </View>
            <Separator color={STYLES.COLORS.LIGHT_GRAY} margin='10 0 10 0' />

            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <CelText type="H6" weight="300" color={STYLES.COLORS.LIGHT_GRAY}>Monthly interest</CelText>
                <CelText type="H3" weight="600" color={STYLES.COLORS.LIGHT_GRAY}>XX.X CEL</CelText>
              </View>
              <Separator vertical color={STYLES.COLORS.LIGHT_GRAY} />
              <View style={{ alignItems: 'center' }}>
                <CelText type="H6" weight="300" color={STYLES.COLORS.LIGHT_GRAY}>Monthly interest</CelText>
                <CelText type="H3" weight="600" color={STYLES.COLORS.LIGHT_GRAY}>XX.X CEL</CelText>
              </View>
            </View>


            <View style={style.reduceInterestInnerBox}>
              <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                <CelText type="H6" weight="300" align='center' color={STYLES.COLORS.LIGHT_GRAY} margin='0 0 5 0'>Original Monthly Interest</CelText>
                <CelText type="H3" weight="600" color={STYLES.COLORS.LIGHT_GRAY}>XX.X CEL</CelText>
              </View>

              <Separator vertical color={STYLES.COLORS.LIGHT_GRAY} margin='0 8 0 8' />

              <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                <CelText type="H6" weight="300" align='center' color={STYLES.COLORS.LIGHT_GRAY} margin='0 0 5 0'>Discounted Monthly Interest</CelText>
                <CelText type="H3" weight="600" color={STYLES.COLORS.LIGHT_GRAY}>XX.X CEL</CelText>
              </View>
            </View>

            <View style={style.reduceInterestInnerBox}>
              <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                <CelText type="H6" weight="300" align='center' color={STYLES.COLORS.LIGHT_GRAY} margin='0 0 5 0'>Original Total Interest</CelText>
                <CelText type="H3" weight="600" color={STYLES.COLORS.LIGHT_GRAY}>XX.X CEL</CelText>
              </View>

              <Separator vertical color={STYLES.COLORS.LIGHT_GRAY} margin='0 8 0 8' />

              <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                <CelText type="H6" weight="300" align='center' color={STYLES.COLORS.LIGHT_GRAY} margin='0 0 5 0'>Discounted Total Interest</CelText>
                <CelText type="H3" weight="600" color={STYLES.COLORS.LIGHT_GRAY}>XX.X CEL</CelText>
              </View>
            </View>

            <View>
              <CelText type="H6" weight="300" italic color={STYLES.COLORS.LIGHT_GRAY}>This rate is subject to change based on your loyalty level at the time of payment.</CelText>
            </View>

          </View>
          <View style={style.estimatedCollateral}>
            <CelText type="H6" weight="300" align="center" style={{ paddingBottom: 10 }}>BTC margin call at</CelText>
            <CelText type="H3" weight="600" align="center" style={{ paddingBottom: 10 }}>{formatter.percentage(formData.interest)}%</CelText>
            <View style={style.collateralInnerBox}>
              <CelText type="H6" weight="300" align="left">If BTC drops below $XXX, you will receive a notification to review your borrowing options.</CelText>
            </View>
          </View>

          <View style={style.estimatedCollateral}>
            <CelText type="H6" weight="300" align="center" style={{ paddingBottom: 10 }}>Liquidation at</CelText>
            <CelText type="H3" weight="600" align="center" style={{ paddingBottom: 10 }}>{formatter.percentage(formData.interest)}%</CelText>
            <View style={style.collateralInnerBox}>
              <CelText type="H6" weight="300" align="left">If BTC drops below $xxx we will sell some of your collateral to cover the margin.</CelText>
            </View>
          </View>

          <View style={style.termLenght}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <CelText type="H6" weight="300" color={STYLES.COLORS.MEDIUM_GRAY} style={{ paddingBottom: 10 }}>First payment due</CelText>
              <CelText type="H4" weight="600" >{formData.termOfLoan} months</CelText>
            </View>
            <Separator vertical />
            <View style={{ flex: 1, alignItems: 'center' }}>
              <CelText type="H6" weight="300" color={STYLES.COLORS.MEDIUM_GRAY} style={{ paddingBottom: 10 }}>Maturity date</CelText>
              <CelText type="H4" weight="600" >{formatter.percentage(formData.interest)}%</CelText>
            </View>
          </View>
          <CelButton> Request loan</CelButton>
        </View>
      </RegularLayout>
    );
  }
}

export default BorrowConfirm
