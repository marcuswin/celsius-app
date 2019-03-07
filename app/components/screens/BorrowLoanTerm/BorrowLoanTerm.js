import React, { Component } from 'react';
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
// import BorrowLoanTermStyle from "./BorrowLoanTerm.styles";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import CelButton from '../../atoms/CelButton/CelButton';
import VerticalSlider from '../../atoms/VerticalSlider/VerticalSlider';
import STYLES from '../../../constants/STYLES';
import ProgressBar from '../../atoms/ProgressBar/ProgressBar';

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class BorrowLoanTerm extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      header: {
        title: "BorrowLoanTerm Screen",
        left: "back",
        right: "profile"
      },
      currentStep: 0
    };
  }

  changeSelectedLoan = (selectedStep) => {
    const { currentStep } = this.state;
    if (selectedStep !== currentStep) this.setState({ currentStep: selectedStep });
  }

  render() {
    const { header, currentStep } = this.state;
    const { actions } = this.props;
    // const style = BorrowLoanTermStyle();
    const terms = [
      <CelText><CelText weight="bold" color={currentStep === 0 ? STYLES.COLORS.CELSIUS_BLUE : 'black'}>6 months</CelText> - Total interest: $450</CelText>,
      <CelText><CelText weight="bold" color={currentStep === 1 ? STYLES.COLORS.CELSIUS_BLUE : 'black'}>12 months</CelText> - Total interest: $450</CelText>,
      <CelText><CelText weight="bold" color={currentStep === 2 ? STYLES.COLORS.CELSIUS_BLUE : 'black'}>18 months</CelText> - Total interest: $450</CelText>,
      <CelText><CelText weight="bold" color={currentStep === 3 ? STYLES.COLORS.CELSIUS_BLUE : 'black'}>24 months</CelText> - Total interest: $450</CelText>,
      <CelText><CelText weight="bold" color={currentStep === 4 ? STYLES.COLORS.CELSIUS_BLUE : 'black'}>30 months</CelText> - Total interest: $450</CelText>,
      <CelText><CelText weight="bold" color={currentStep === 5 ? STYLES.COLORS.CELSIUS_BLUE : 'black'}>38 months</CelText> - Total interest: $450</CelText>
    ]

    return (
      <RegularLayout header={header}>
        <ProgressBar steps={6} currentStep={4} />
        <CelText margin={"30 0 30 0"} weight={"300"}>Select for how long the loan will last:</CelText>
        <VerticalSlider onChange={this.changeSelectedLoan} values={terms} currentStep={currentStep} />
        <CelButton margin="50 0 30 0" onPress={() => actions.navigateTo('BorrowBankAccount')} iconRight="IconArrowRight">
          Bank account
        </CelButton>

      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(BorrowLoanTerm);
