import React, {Component} from 'react';
import {Text, View} from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import EarnInterestLayout from "../../layouts/EarnInterestLayout/EarnInterestLayout";
import RadioButtons from "../../atoms/RadioButtons/RadioButtons";
import CelInput from "../../atoms/CelInput/CelInput";
import Separator from "../../atoms/Separator/Separator";
import CelButton from "../../atoms/CelButton/CelButton";
import {GLOBAL_STYLE_DEFINITIONS as globalStyles} from "../../../config/constants/style";
import * as appActions from "../../../redux/actions";
import InterestCalculatorStyle from './InterestCalculator.styles';
import formatter from "../../../utils/formatter";
import CelForm from "../../atoms/CelForm/CelForm";
import CurrencyInterestRateInfo from "../../molecules/CurrencyInterestRateInfo/CurrencyInterestRateInfo";

const interestRates = {
  BTC: 3.75,
  ETH: 3.25,
}

@connect(
  state => ({
    formData: state.ui.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class InterestCalculatorScreen extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.initForm({
      interestCurrency: 'BTC',
      interestAmount: 0,
      interestPeriod: 6,
    })
  }

  render() {
    const { formData } = this.props;

    const displayInterestRate = `${interestRates[formData.interestCurrency]}%`;
    const interest = formData.interestAmount * interestRates[formData.interestCurrency] / 100;
    const interestPerWeek = interest / 52;
    const interestPerMonth = interest / 12;
    const interestPer6Months = interest / 2;

    return (
      <EarnInterestLayout>
        <View style={{ paddingTop: 30, paddingBottom: 30 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            <RadioButtons
              theme="grey"
              field='interestCurrency'
              items={[{ label: 'Bitcoin', value: 'BTC'}, { label: 'Ethereum', value: 'ETH'} ]}
              value={formData.interestCurrency}
            />
          </View>

          <Text style={globalStyles.normalText}>Deposit {formData.interestCurrency} to your wallet now to start earning at this rate:</Text>
          <CurrencyInterestRateInfo currency={formData.interestCurrency} rate={displayInterestRate}/>

          <Text style={[globalStyles.normalText, { marginBottom: 10 }]}>
            How much do you plan to deposit?
          </Text>

          <CelForm>
            <CelInput
              theme="white"
              field="interestAmount"
              type="number"C
              placeholder={`${formData.interestCurrency} Amount in USD`}
              margin="0 0 25 0"
              value={formData.interestAmount}
            />
          </CelForm>

          <Text style={[globalStyles.normalText, { marginTop: 15, marginBottom: 15 }]}>
            Interest per week (at { displayInterestRate } APR):
          </Text>
          <View style={InterestCalculatorStyle.amountBox}>
            <Text style={InterestCalculatorStyle.amountText}>
              { formatter.usd(interestPerWeek) }
            </Text>
          </View>

          <Text style={[globalStyles.normalText, { marginTop: 15, marginBottom: 15 }]}>
            Estimated interest per month:
          </Text>
          <View style={InterestCalculatorStyle.amountBox}>
            <Text style={InterestCalculatorStyle.amountText}>
              { formatter.usd(interestPerMonth) }
            </Text>
          </View>

          <Text style={[globalStyles.normalText, { marginTop: 15, marginBottom: 15 }]}>
            Total interest for 6 months:
          </Text>
          <View style={InterestCalculatorStyle.amountBox}>
            <Text style={InterestCalculatorStyle.amountText}>
              { formatter.usd(interestPer6Months) }
            </Text>
          </View>

          <Separator margin="35 0 25 0"/>

          <Text style={globalStyles.heading}>
            Up to { displayInterestRate } interest
          </Text>
          <Text style={[globalStyles.normalText, { textAlign: 'center'}]}>
            On a { formatter.usd(formData.interestAmount) } deposit of { formData.interestCurrency } you would get about { formatter.usd(interest) } a year in interest.
          </Text>

          <Separator margin="35 0 25 0"/>

          <Text style={globalStyles.heading}>No Term Lengths</Text>
          <Text style={[globalStyles.normalText, { textAlign: 'center'}]}>
            You can get your crypto deposits whenever you need them with no fees or penalties.
          </Text>

          <Separator margin="35 0 25 0"/>

          <CelButton
            inverse
            onPress={console.log}
          >
            Deposit coins
          </CelButton>
        </View>
      </EarnInterestLayout>
    );
  }
}

export default InterestCalculatorScreen;
