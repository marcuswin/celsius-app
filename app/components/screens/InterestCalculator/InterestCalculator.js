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
import CelSlider from "../../molecules/CelSlider/CelSlider";

const interestRates = {
  BTC: 3.75,
  ETH: 3.25,
}

const interestPeriods = [
  { value: '6m', label: '6 months' },
  { value: '12m', label: '12 months' },
  { value: '18m', label: '18 months' },
  { value: '24m', label: '24 months' },
]

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
    })
  }

  render() {
    const { formData } = this.props;

    const interest = formData.interestAmount * interestRates[formData.interestCurrency] / 100;

    return (
      <EarnInterestLayout>
        <View style={{ paddingTop: 30, paddingBottom: 30 }}>
          <Text style={[globalStyles.normalText, { marginBottom: 35 }]}>
            Calculate how much interest you are eligible to earn. Choose which currency you are thinking to deposit (BTC or ETH) and then enter the amount in USD:
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            <RadioButtons
              theme="grey"
              field='interestCurrency'
              items={[{ label: 'Bitcoin', value: 'BTC'}, { label: 'Ethereum', value: 'ETH'} ]}
              value={formData.interestCurrency}
            />
          </View>

          <Text style={[globalStyles.normalText, { marginBottom: 10 }]}>
            How much do you plan to deposit?
          </Text>

          <CelInput
            theme="white"
            field="interestAmount"
            type="number"C
            placeholder={`${formData.interestCurrency} Amount in USD`}
            margin="0 0 25 0"
            value={formData.interestAmount}
          />

          <Text style={globalStyles.normalText}>For how long would you like to keep your coins deposited?</Text>

          <CelSlider field="interestPeriod" items={interestPeriods} value={formData.interestPeriod} />

          <Text style={[globalStyles.normalText, { marginTop: 15, marginBottom: 15 }]}>
            Interest per week (at 4.75% APR):
          </Text>
          <View style={InterestCalculatorStyle.amountBox}>
            <Text style={InterestCalculatorStyle.amountText}>
              $XX.XX
            </Text>
          </View>

          <Text style={[globalStyles.normalText, { marginTop: 15, marginBottom: 15 }]}>
            Estimated interest per month:
          </Text>
          <View style={InterestCalculatorStyle.amountBox}>
            <Text style={InterestCalculatorStyle.amountText}>
              $XX.XX
            </Text>
          </View>

          <Text style={[globalStyles.normalText, { marginTop: 15, marginBottom: 15 }]}>
            Total interest for 6 months:
          </Text>
          <View style={InterestCalculatorStyle.amountBox}>
            <Text style={InterestCalculatorStyle.amountText}>
              $XX.XX
            </Text>
          </View>

          <Separator margin="35 0 25 0"/>

          <Text style={globalStyles.heading}>
            Up to { interestRates[formData.interestCurrency] }% interest
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
