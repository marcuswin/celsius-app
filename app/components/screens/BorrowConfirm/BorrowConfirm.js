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
          <CelText type="H5" weight="300" align="center">You are about to borrow </CelText>
          <CelText align="center" type="H1" weight="600" style={{ paddingBottom: 10 }}>{formatter.usd(formData.loanAmount, { precision: 0 })}</CelText>
          <View style={style.estimatedCollateral}>
            <CelText type="H6" weight="300" align="center" style={{ paddingBottom: 10 }}>Estimated collateral</CelText>
            <CelText type="H3" weight="600" align="center" style={{ paddingBottom: 10 }}>{formatter.percentage(formData.interest)}%</CelText>
            <View style={style.collateralInnerBox}>
              <CelText type="H6" weight="300" align="left">The exact amount of collateral needed will be determined upon approval. Coins used for collateral will be locked and ineligible to earn interest.</CelText>
            </View>
          </View>

          <View style={style.termLenght}>
            <View>
              <CelText type="H6" weight="300" color={STYLES.COLORS.MEDIUM_GRAY} style={{ paddingBottom: 10 }}>Term length</CelText>
              <CelText type="H4" weight="600" >{formData.termOfLoan} months</CelText>
            </View>
            <Separator vertical />
            <View>
              <CelText type="H6" weight="300" color={STYLES.COLORS.MEDIUM_GRAY} style={{ paddingBottom: 10 }}>Annual interest rate</CelText>
              <CelText type="H4" weight="600" >{formatter.percentage(formData.interest)}%</CelText>
            </View>
          </View>

          <View style={style.termLenght}>
            <View>
              <CelText type="H6" weight="300" color={STYLES.COLORS.MEDIUM_GRAY} style={{ paddingBottom: 10 }}>Monthly interest</CelText>
              <CelText type="H3" weight="600" align="center">{formatter.usd(formData.monthlyPayment)}</CelText>
            </View>
            <Separator vertical />
            <View>
              <CelText type="H6" weight="300" color={STYLES.COLORS.MEDIUM_GRAY} style={{ paddingBottom: 10 }}>Total interest</CelText>
              <CelText type="H4" weight="600" >{formatter.percentage(formData.interest)}%</CelText>
            </View>
          </View>

          <View style={style.reduceInterest}>

            <View style={{ alignItems: 'center' }}>
              <CelText type="H6" weight="300" color={STYLES.COLORS.LIGHT_GRAY}> Reduce your interest rate by</CelText>
              <CelText type="H6" weight="300" color={STYLES.COLORS.LIGHT_GRAY}> XX% </CelText>
              <CelText type="H6" weight="300" color={STYLES.COLORS.LIGHT_GRAY}> by paying out in CEL</CelText>

            </View>
            <Separator color={STYLES.COLORS.LIGHT_GRAY} margin='10 0 10 0' />

            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <View style={{ flexDirection: 'column',  alignItems: 'center' }}>
                <CelText type="H6" weight="300" color={STYLES.COLORS.LIGHT_GRAY}>Monthly interest</CelText>
                <CelText color={STYLES.COLORS.LIGHT_GRAY}>XX.X CEL</CelText>
              </View>
              <Separator vertical color={STYLES.COLORS.LIGHT_GRAY} />
              <View style={{ alignItems: 'center'}}>
                <CelText type="H6" weight="300" color={STYLES.COLORS.LIGHT_GRAY}>Monthly interest</CelText>
                <CelText color={STYLES.COLORS.LIGHT_GRAY}>XX.X CEL</CelText>
              </View>

            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'whtie' }}>
              <View style={{ flexDirection: 'column',  alignItems: 'center' }}>
                <CelText type="H6" weight="300" color={STYLES.COLORS.LIGHT_GRAY}>Monthly interest</CelText>
                <CelText color={STYLES.COLORS.LIGHT_GRAY}>XX.X CEL</CelText>
              </View>
              <Separator vertical color={STYLES.COLORS.LIGHT_GRAY} />
              <View style={{ alignItems: 'center'}}>
                <CelText type="H6" weight="300" color={STYLES.COLORS.LIGHT_GRAY}>Monthly interest</CelText>
                <CelText color={STYLES.COLORS.LIGHT_GRAY}>XX.X CEL</CelText>
              </View>
            </View>


            <View>
              <CelText type="H6" weight="300" italic color={STYLES.COLORS.LIGHT_GRAY}>This rate is subject to change based on your loyalty level at the time of payment.</CelText>
            </View>


          </View>
        </View>
      </RegularLayout>
    );
  }
}

export default BorrowConfirm
