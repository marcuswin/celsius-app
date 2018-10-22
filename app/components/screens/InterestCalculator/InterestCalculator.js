import React, {Component} from 'react';
import {Text, View} from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { hook } from 'cavy';

import EarnInterestLayout from "../../layouts/EarnInterestLayout/EarnInterestLayout";
import Loader from "../../atoms/Loader/Loader";
import CelInput from "../../atoms/CelInput/CelInput";
import Separator from "../../atoms/Separator/Separator";
import CelButton from "../../atoms/CelButton/CelButton";
import {GLOBAL_STYLE_DEFINITIONS as globalStyles} from "../../../config/constants/style";
import * as appActions from "../../../redux/actions";
import InterestCalculatorStyle from './InterestCalculator.styles';
import formatter from "../../../utils/formatter";
import CelForm from "../../atoms/CelForm/CelForm";
import CurrencyInterestRateInfo from "../../molecules/CurrencyInterestRateInfo/CurrencyInterestRateInfo";
import { INTEREST_ELIGIBLE_COINS, KYC_STATUSES } from "../../../config/constants/common";
import CelSelect from "../../molecules/CelSelect/CelSelect";

@connect(
  state => ({
    formData: state.ui.formData,
    user: state.users.user,
    interestRates: state.interest.rates,
    interestRatesDisplay: state.interest.ratesDisplay,
    supportedCurrencies: state.generalData.supportedCurrencies,
    activeScreen: state.nav.routes[state.nav.index].routeName,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class InterestCalculatorScreen extends Component {
  constructor(props) {
    super(props);

  const pickerItems = INTEREST_ELIGIBLE_COINS.map(ec => {
    const currency = props.supportedCurrencies.filter(sc => sc.short === ec)[0];
    const currencyName = currency.name[0].toUpperCase() + currency.name.slice(1);
    return {
      label: `${currencyName} (${ec})`,
      value: ec.toUpperCase()
    };
  });
    this.state = {
      pickerItems,
    };
  }

  componentDidMount() {
    const { actions, interestRates } = this.props;

    if (!interestRates) actions.getInterestRates();

    actions.initForm({
      interestCurrency: 'BTC',
      interestAmount: 0,
      interestPeriod: 6,
    })
  }

  componentWillReceiveProps(nextProps) {
    const {activeScreen} = this.props;

    if ((activeScreen !== nextProps.activeScreen && nextProps.activeScreen === "InterestCalculator")) {
      this.componentDidMount();
    }
  }

  render() {
    const { formData, interestRates, interestRatesDisplay, actions, user } = this.props;
    const { pickerItems } = this.state;

    if (!interestRates) return (
      <EarnInterestLayout>
        <Loader/>
      </EarnInterestLayout>
    );

    const displayInterestRate = `${interestRatesDisplay[formData.interestCurrency]}%`;
    const interest = formData.interestAmount * interestRates[formData.interestCurrency];
    const interestPerWeek = interest / 52;
    const interestPerMonth = interest / 12;
    const interestPer6Months = interest / 2;



    return (
      <EarnInterestLayout>
        <View   ref={this.props.generateTestHook('InterestCalculatorScreen.exist')}
                style={{ paddingTop: 30 }}>
          <CelSelect field="interestCurrency"
                     items={pickerItems}
                     labelText="Select a currency"
                     value={formData.interestCurrency}
                     margin="10 0 20 0"
                     theme={'white'}
          />

          <Text style={globalStyles.normalText}>Deposit {formData.interestCurrency} to your wallet now to start earning at these rates:</Text>
          <CurrencyInterestRateInfo currency={formData.interestCurrency} rate={displayInterestRate}/>

          <Text style={[globalStyles.normalText, { marginBottom: 10 }]}>
            How much do you plan to deposit?
          </Text>

          <CelForm>
            <CelInput
              theme="white"
              field="interestAmount"
              type="number"
              placeholder={`Enter amount in USD`}
              margin="0 0 25 0"
              value={formData.interestAmount}
            />
          </CelForm>

          <Text style={[globalStyles.normalText, { marginTop: 15, marginBottom: 15 }]}>
            Estimated interest
            <Text style={globalStyles.boldText}> per week </Text>
            at { displayInterestRate } APR:
          </Text>
          <View style={InterestCalculatorStyle.amountBox}>
            <Text ref={this.props.generateTestHook('InterestCalculatorScreen.perWeek')} style={InterestCalculatorStyle.amountText}>
              { formatter.usd(interestPerWeek) }
            </Text>
          </View>

          <Text style={[globalStyles.normalText, { marginTop: 15, marginBottom: 15 }]}>
            Estimated interest
            <Text style={globalStyles.boldText}> per month:</Text>
          </Text>
          <View style={InterestCalculatorStyle.amountBox}>
            <Text ref={this.props.generateTestHook('InterestCalculatorScreen.perMonth')} style={InterestCalculatorStyle.amountText}>
              { formatter.usd(interestPerMonth) }
            </Text>
          </View>

          <Text style={[globalStyles.normalText, { marginTop: 15, marginBottom: 15 }]}>
            Estimated total interest
            <Text style={globalStyles.boldText}> for 6 months:</Text>
          </Text>
          <View style={InterestCalculatorStyle.amountBox}>
            <Text ref={this.props.generateTestHook('InterestCalculatorScreen.per6Months')} style={InterestCalculatorStyle.amountText}>
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

          <Text style={globalStyles.heading}>Withdraw your crypto deposits...</Text>
          <Text style={[globalStyles.normalText, { textAlign: 'center'}]}>
            You can get your crypto deposits whenever you need them with no fees or penalties.
          </Text>

          <Separator margin="35 0 25 0"/>

          {(!!user.kyc && user.kyc.status === KYC_STATUSES.passed) && <CelButton
            inverse
            onPress={() => actions.navigateTo('AddFunds', { currency: formData.interestCurrency.toLowerCase() })}
          >
            Deposit coins
          </CelButton>}
        </View>
      </EarnInterestLayout>
    );
  }
}

// export default InterestCalculatorScreen;
const TestHook = hook(InterestCalculatorScreen)
export default TestHook;