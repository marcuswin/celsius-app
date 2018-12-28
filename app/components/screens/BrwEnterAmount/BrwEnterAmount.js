import React, {Component} from 'react';
import { Text, Slider } from "react-native";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import CelButton from '../../atoms/CelButton/CelButton';
import CelInput from "../../atoms/CelInput/CelInput";
import CelForm from "../../atoms/CelForm/CelForm";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import { LOAN_ELIGIBLE_COINS } from "../../../config/constants/common";
import Steps from "../../molecules/Steps/Steps";

@connect(
  state => ({
    eligibleCurrencies: state.wallet.currencies.filter(wc => LOAN_ELIGIBLE_COINS.indexOf(wc.currency.short.toUpperCase()) !== -1),
    callsInProgress: state.api.callsInProgress,
    formData: state.ui.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)

class BRWEnterAmount extends Component {
  render() {
    const { formData, actions, eligibleCurrencies } = this.props;
    const maxAmount = eligibleCurrencies.reduce((max, element) => element.amount > max ? element.amount : max, 0) / 2;

    return (
      <SimpleLayout
        animatedHeading={{ text: 'Enter the amount'}}
      >
        <Steps current={1} totalSteps={5} />
        <CelForm margin="20 0 0 0">
          <Text style={globalStyles.normalText}>How much do you want to borrow?</Text>

          <Text style={globalStyles.normalText}>Max amount: { maxAmount }</Text>

          <CelInput
            theme="white"
            type="number"
            labelText="$10,000"
            value={formData.amount ? formData.amount.toString() : ''}
            field="currentPassword"
          />

          <Slider
            minimumValue={5000}
            maximumValue={50000}
            value={formData.amount}
            step={1}
            onValueChange={(value) => actions.updateFormField('amount', value)}
          />
        </CelForm>

        <CelButton
          margin="40 0 0 0"
          color="blue"
          onPress={() => actions.navigateTo('BRWChooseCollateral')}
        >
          Choose a collateral
        </CelButton>
      </SimpleLayout>
    );
  }
}

export default BRWEnterAmount;
