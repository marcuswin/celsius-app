import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import ProgressBar from "../../atoms/ProgressBar/ProgressBar";
import Card from "../../atoms/Card/Card";
import formatter from "../../../utils/formatter";

@connect(
  state => ({
    formData: state.forms.formData,
    ltv: state.loans.ltvs,
    currencyRates: state.currencies.currencyRatesShort,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class BorrowLoanOption extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {
      header: {
        title: "BorrowLoanOption Screen",
        left: "back",
        right: "info"
      },
    };
  }

  setLoanOption = (interest, monthlyPayment, amountCollateralUsd, amountCollateralCrypto, loanToValue) => {
    const {actions} = this.props;

    actions.updateFormFields({
      interest,
      monthlyPayment,
      amountCollateralCrypto,
      amountCollateralUsd,
      ltv: loanToValue
    });

    actions.navigateTo("BorrowLoanTerm")
  };

  renderInterestCard = (ltv) => {
    const {formData, currencyRates} = this.props;

    const crypto = currencyRates[formData.coin.toLowerCase()];
    const monthlyPayment = formData.loanAmount * ltv.interest / 12;
    const amountCollateralUsd = formData.loanAmount / ltv.percent;
    const amountCollateralCrypto = (amountCollateralUsd / crypto);
    const interest = formatter.percentage(ltv.interest);
    const loanToValue = ltv.percent;

    // ToDo:(ns) add opacity on card if ineligible for LTV option

      return (
          <View key={ltv.interest}>
            <Card onPress={() => this.setLoanOption(ltv.interest, monthlyPayment, amountCollateralUsd, amountCollateralCrypto, loanToValue) }
                  padding="15 15 15 15"
                  margin="15 20 15 20"
            >
              <CelText weight={"300"} type={"H6"}>{`$${formatter.round(monthlyPayment)} per month`}</CelText>
              <CelText weight={"600"} type={"H3"}>{`${interest}% interest rate`}</CelText>
              <CelText weight={"300"} type={"H6"}>{`Locking ${formatter.crypto(amountCollateralCrypto)} ${formData.coin} as collateral`}</CelText>
            </Card>
          </View>
    )
  };

  render() {
    const { header } = this.state;
    const { ltv } = this.props;

    return (
      <RegularLayout header={header}>
        <ProgressBar steps={6} currentStep={3}/>
        <CelText weight={"300"} margin={"20 0 20 0"}>Choose your loan option:</CelText>
        {ltv.map(this.renderInterestCard)}
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(BorrowLoanOption);
