import React, { Component } from 'react';
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { View } from 'react-native'


import * as appActions from "../../../redux/actions";
// import BorrowLoanTermStyle from "./BorrowLoanTerm.styles";
import formatter from "../../../utils/formatter";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import CelButton from '../../atoms/CelButton/CelButton';
import VerticalSlider from '../../atoms/VerticalSlider/VerticalSlider';
import STYLES from '../../../constants/STYLES';
import HeadingProgressBar from '../../atoms/HeadingProgressBar/HeadingProgressBar';
import {LOAN_TYPES} from '../../../constants/DATA'

@connect(
  (state) => ({
    formData: state.forms.formData,
    loanCompliance: state.compliance.loan
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class BorrowLoanTerm extends Component {
  static propTypes = {};
  static defaultProps = {}

  static navigationOptions = () => ({
    title: "Term of loan",
    right: "profile"
  });

  constructor(props) {
    super(props);
    props.actions.updateFormField('termOfLoan', 6)
  }

  changeSelectedLoan = (selectedStep) => {
    const { actions } = this.props;
    actions.updateFormField('termOfLoan', selectedStep)
  }

  renderButton () {
    const { actions, formData } = this.props
    if (formData.loanType === LOAN_TYPES.STABLE_COIN_LOAN ) {
      return (
        <CelButton
          margin="50 0 30 0"
          onPress={() => actions.navigateTo('ConfirmYourLoan')}
          iconRight="IconArrowRight"
        >
          Continue
        </CelButton>
      )
    }
    return (
      <CelButton margin="50 0 30 0" onPress={() => actions.navigateTo('BorrowBankAccount')} iconRight="IconArrowRight">
        Bank account
      </CelButton>
    )
  }

  render() {
    const { actions, formData } = this.props;

    const sliderItems = [
      { value: 6, label: <><CelText type='H6' weight="semi-bold" color={formData.termOfLoan === 6 ? STYLES.COLORS.CELSIUS_BLUE : null}>6 MONTHS</CelText><CelText type='H6'>Total interest: {formatter.usd(Number(formData.monthlyPayment * 6)) }  USD </CelText></>},
      { value: 12, label: <><CelText type='H6' weight="semi-bold" color={formData.termOfLoan === 12 ? STYLES.COLORS.CELSIUS_BLUE : null}>12 MONTHS</CelText><CelText type='H6'>Total interest: {formatter.usd(Number(formData.monthlyPayment * 12)) }  USD</CelText></>},
      { value: 18, label: <><CelText type='H6' weight="semi-bold" color={formData.termOfLoan === 18 ? STYLES.COLORS.CELSIUS_BLUE : null}>18 MONTHS</CelText><CelText type='H6'>Total interest: {formatter.usd(Number(formData.monthlyPayment * 18)) }  USD</CelText></>},
      { value: 24, label: <><CelText type='H6' weight="semi-bold" color={formData.termOfLoan === 24 ? STYLES.COLORS.CELSIUS_BLUE : null}>24 MONTHS</CelText><CelText type='H6'>Total interest: {formatter.usd(Number(formData.monthlyPayment * 24)) }  USD</CelText></>},
      { value: 30, label: <><CelText type='H6' weight="semi-bold" color={formData.termOfLoan === 30 ? STYLES.COLORS.CELSIUS_BLUE : null}>30 MONTHS</CelText><CelText type='H6'>Total interest: {formatter.usd(Number(formData.monthlyPayment * 30)) } USD</CelText></>},
      { value: 36, label: <><CelText type='H6' weight="semi-bold" color={formData.termOfLoan === 36 ? STYLES.COLORS.CELSIUS_BLUE : null}>36 MONTHS</CelText><CelText type='H6'>Total interest: {formatter.usd(Number(formData.monthlyPayment * 36)) }  USD</CelText></>},
    ]

    return (
      <View style={{flex: 1}}>
        <HeadingProgressBar steps={6} currentStep={4} />
        <RegularLayout
          fabType={'hide'}
        >
          <View style={{ paddingTop: 10, alignItems: 'center'}}>
            <CelText margin={"0 0 30 0"} weight={"300"}>How long would you like to borrow {formatter.usd(formData.loanAmount)}?</CelText>
          </View>
          <View>
            <VerticalSlider
              items={sliderItems}
              field="termOfLoan"
              value={formData.termOfLoan}
              updateFormField={actions.updateFormField}
            />

          </View>

          {this.renderButton()}

        </RegularLayout>
      </View>

    );
  }
}

export default BorrowLoanTerm
