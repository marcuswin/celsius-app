import React, { Component } from 'react';
import { Text, View } from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Constants } from "expo";

import * as appActions from "../../../redux/actions";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import CelButton from '../../atoms/CelButton/CelButton';
import CelInput from "../../atoms/CelInput/CelInput";
import CelForm from "../../atoms/CelForm/CelForm";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import Steps from "../../molecules/Steps/Steps";
import CelSlider from "../../molecules/CelSlider/CelSlider";
import formatter from '../../../utils/formatter';
import testUtil from "../../../utils/test-util";
import EmptyState from '../../atoms/EmptyState/EmptyState';

const { MIN_LOAN_AMOUNT } = Constants.manifest.extra;

@connect(
  state => ({
    eligibleCurrencies: state.wallet.currencies.filter(wc => state.users.compliance.loan.coins.indexOf(wc.currency.short.toUpperCase()) !== -1),
    callsInProgress: state.api.callsInProgress,
    formData: state.ui.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)

class BRWEnterAmount extends Component {
  constructor(props) {
    super(props)

    const { eligibleCurrencies } = props;
    this.state = {
      maxAmount: eligibleCurrencies.reduce((max, element) => element.total > max ? element.total : max, 0) / 2,
    }
  }
  submitAmount = () => {
    const { formData, actions } = this.props;
    const { maxAmount } = this.state;

    if (!formData.amount) return actions.showMessage('error', 'Please enter an amount you wish to borrow')
    if (Number(formData.amount) < MIN_LOAN_AMOUNT) return actions.showMessage('warning', `Minimum loan starts at ${formatter.usd(MIN_LOAN_AMOUNT)}`)
    if (Number(formData.amount) > maxAmount) return actions.showMessage('warning', 'Insufficient funds')

    actions.navigateTo('BRWChooseCollateral')
  }

  render() {
    const { formData, actions } = this.props;
    const { maxAmount } = this.state;

    if (maxAmount < MIN_LOAN_AMOUNT) {
      return (
        <SimpleLayout
          animatedHeading={{ text: 'Enter the amount' }}
        >
          <EmptyState purpose={"NotEnoughForLoan"} />
          <View style={{ marginTop: 20 }}>
            <CelButton
              ref={testUtil.generateTestHook(this, 'WalletTransactions.AddFunds')}
              onPress={() => actions.navigateTo("AddFunds")}
            >
              Add Funds
          </CelButton>
          </View>
        </SimpleLayout>
      )
    }

    return (
      <SimpleLayout
        animatedHeading={{ text: 'Enter the amount' }}
      >
        <Steps current={1} totalSteps={5} />
        <CelForm margin="20 0 0 0">
          <Text style={[globalStyles.normalText, { marginVertical: 15 }]}>How much do you want to borrow?</Text>

          <CelInput
            theme="white"
            type="number"
            labelText={`${formatter.usd(MIN_LOAN_AMOUNT)}`}
            value={formData.amount ? formData.amount.toString() : ''}
            field="amount"
          />

          <CelSlider
            minimumValue={MIN_LOAN_AMOUNT}
            maximumValue={maxAmount}
            step={100}
            value={formData.amount}
            field={'amount'}
            items={[{ label: formatter.usd(MIN_LOAN_AMOUNT) }, { label: formatter.usd(maxAmount) }]}
          />
        </CelForm>

        <CelButton
          margin="40 0 0 0"
          color="blue"
          onPress={this.submitAmount}
        >
          Choose a collateral
        </CelButton>
      </SimpleLayout>
    );
  }
}

export default testUtil.hookComponent(BRWEnterAmount);
