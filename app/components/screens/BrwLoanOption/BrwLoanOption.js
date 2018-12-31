import React, {Component} from 'react';
import { Text, TouchableOpacity } from "react-native";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import { COLORS, GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import Card from "../../atoms/Card/Card";
import Steps from "../../molecules/Steps/Steps";
import formatter from '../../../utils/formatter';

const LTVs = [
  { percent: 0.2, interest: 0.05 },
  { percent: 0.33, interest: 0.09 },
  { percent: 0.5, interest: 0.12 }
];

@connect(
  state => ({
    currencyRatesShort: state.generalData.currencyRatesShort,
    formData: state.ui.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)

class BRWLoanOption extends Component {
  selectOption = (ltv) => {
    const { actions, formData } = this.props;
    const { collateralAmountUSD, collateralAmountCrypto, isOptionAvailable } = this.calculateAmounts(ltv)

    if (!isOptionAvailable) return actions.navigateTo('AddFunds', { currency: formData.coin.toLowerCase() });

    actions.updateFormField('ltv', ltv)
    actions.updateFormField('collateralAmountUSD', collateralAmountUSD)
    actions.updateFormField('collateralAmountCrypto', collateralAmountCrypto)
    actions.navigateTo('BRWTermOfLoan')
  }

  calculateAmounts = (ltv) => {
    const { formData, currencyRatesShort } = this.props;
    console.log({ formData })
    const collateralAmountUSD = Number(formData.amount) / ltv.percent;
    const collateralAmountCrypto = collateralAmountUSD / currencyRatesShort[formData.coin.toLowerCase()];
    const isOptionAvailable = collateralAmountUSD < formData.totalAmount

    return { collateralAmountUSD, collateralAmountCrypto, isOptionAvailable };
  }

  renderCard = (ltv, i) => {
    const { formData } = this.props;

    const { collateralAmountCrypto, isOptionAvailable } = this.calculateAmounts(ltv);
    const displayAmount = formatter.crypto(collateralAmountCrypto, formData.coin, { precision: 5 })
    return (
      <TouchableOpacity key={ltv.percent} onPress={() => this.selectOption(ltv)}>
        <Card style={{ marginVertical: 10, padding: 20, opacity: isOptionAvailable ? 1 : 0.5 }}>
          <Text style={globalStyles.normalText}>Loan option { i + 1 }</Text>
          <Text style={[ globalStyles.heading, { textAlign: 'left'}]}>{ ltv.interest * 100}%</Text>
          <Text style={globalStyles.normalText}>Locking { displayAmount } as collateral</Text>
        </Card>
        { !isOptionAvailable && <Text style={[globalStyles.normalText, { color: COLORS.blue }]}>Deposit more funds</Text> }
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <SimpleLayout
        animatedHeading={{ text: 'Loan option'}}
      >
        <Steps current={3} totalSteps={5} />
        <Text style={[globalStyles.normalText, { marginVertical: 15 }]}>Choose your loan option:</Text>

        {LTVs.map(this.renderCard)}
      </SimpleLayout>
    );
  }
}

export default BRWLoanOption;
