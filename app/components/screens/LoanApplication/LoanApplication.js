import React, {Component} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import LoanApplicationStyle from "./LoanApplication.styles";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import Separator from "../../atoms/Separator/Separator";
import CelButton from "../../atoms/CelButton/CelButton";
import CelSelect from "../../molecules/CelSelect/CelSelect";
import { ELIGIBLE_COINS } from "../../../config/constants/common";
import CelInput from "../../atoms/CelInput/CelInput";
import CelScreenContent from "../../atoms/CelScreenContent/CelScreenContent";
import Card from "../../atoms/Card/Card";
import formatter from "../../../utils/formatter";

const LTVs = [
  { percent: 0.2, interest: 0.05 },
  { percent: 0.33, interest: 0.09 },
  { percent: 0.5, interest: 0.12 },
  { percent: 0.75, interest: 0.15 },
]

@connect(
  state => ({
    supportedCurrencies: state.generalData.supportedCurrencies,
    walletCurrencies: state.wallet.currencies,
    formData: state.ui.formData,
    activeScreen: state.nav.routes[state.nav.index].routeName,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class LoanApplication extends Component {
  componentWillMount = () => this.initScreen();

  componentWillReceiveProps(nextProps) {
    if (this.props.activeScreen !== nextProps.activeScreen && nextProps.activeScreen === 'LoanApplication') this.initScreen();
  }

  initScreen = () => {
    const { actions, walletCurrencies } = this.props;

    const pickerItems = ELIGIBLE_COINS.map(ec => {
      const walletCurrency = walletCurrencies.find(w => w.currency.short === ec)
      const currencyName = walletCurrency.currency.name[0].toUpperCase() + walletCurrency.currency.name.slice(1);
      return {
        label: `${currencyName} (${ec})`,
        value: ec.toLowerCase(),
        image: walletCurrency.currency.image_url,
        subtext: `${ formatter.crypto(walletCurrency.amount, ec, { precision: 5 }) } = ${ formatter.usd(walletCurrency.total) }`,
      };
    });

    this.setState({ pickerItems });

    actions.initForm({
      ltv: LTVs[0],
    })
  }

  applyForLoan = () => {
    const { actions, formData, walletCurrencies } = this.props;
    if (!formData.currency) {
      return actions.showMessage('error', 'Please select a currency')
    }
    if (!formData.loanCollateralUSD) {
      return actions.showMessage('error', 'Please select an amount between %500.00 and $10,000.00')
    }

    const walletCurrency = walletCurrencies.find(w => w.currency.short === formData.currency.toUpperCase())

    if (Number(formData.loanCollateralUSD) < 500) {
      actions.showMessage('warning', 'Minimum amount for a loan is $500.00')
    } else if (Number(formData.loanCollateralUSD) > 10000) {
      actions.showMessage('warning', 'Maximum amount for a loan is $10,000.00')
    } else if (walletCurrency.total < formData.loanCollateralUSD * formData.ltv.percent) {
      actions.showMessage('error', 'Insufficient funds');
    } else {
      console.log({ formData });
      actions.showMessage('success', 'Successfully applied for a loan');
    }
  }

  render() {
    const { formData, actions } = this.props;
    const { pickerItems } = this.state;

    if (!formData.ltv) return null;

    return (
      <SimpleLayout
        mainHeader={{ backButton: false }}
        animatedHeading={{ text: 'Apply for a Loan', textAlign: 'center' }}
      >
        <CelScreenContent padding="15 0 40 0">

          <Text style={globalStyles.normalText}>
            Celsius Network offers the
            <Text style={[globalStyles.boldText]}> lowest interest rates</Text>
            . Fill out this form for a member of our sales team to coordinate your loan for you today!
          </Text>

          <Separator margin="20 0 20 0"/>
          <Text style={globalStyles.normalText}>Choose the coin you would like to use as a collateral:</Text>
          <CelSelect
            field="currency"
            theme="white"
            items={pickerItems}
            labelText="Pick a currency"
            value={formData.currency}
            margin="25 0 15 0"
          />

          <Separator margin="20 0 20 0"/>
          <Text style={globalStyles.normalText}>Enter the amount of collateral:</Text>

          <CelInput
            field="loanCollateralUSD"
            theme="white"
            value={formData.loanCollateralUSD}
            label="$500.00 - $10,000.00"
            placeholder="Amount to borrow"
            type="number"
            margin="25 0 15 0"
          />

          <Separator margin="20 0 20 0"/>
          <Text style={globalStyles.normalText}>Choose one of these loan amounts:</Text>

          <View style={LoanApplicationStyle.cardWrapper}>
            { LTVs.map((ltv) => (
              <TouchableOpacity onPress={() => actions.updateFormField('ltv', ltv)} key={ltv.percent.toString()}>
                <Card
                  style={ltv === formData.ltv ? [LoanApplicationStyle.loanAmountCard, LoanApplicationStyle.loanAmountCardActive] : LoanApplicationStyle.loanAmountCard}
                >
                  <Text
                    style={ltv === formData.ltv ? [LoanApplicationStyle.loanAmountText, { color: 'white' }] : LoanApplicationStyle.loanAmountText}
                  >
                    { formatter.usd(formData.loanCollateralUSD ? formData.loanCollateralUSD * ltv.percent : 0) }
                  </Text>
                  <Text
                    style={ltv === formData.ltv ? [LoanApplicationStyle.loanAmountPercentage, { color: 'white' }] : LoanApplicationStyle.loanAmountPercentage}
                  >
                    { 100 * ltv.percent }% LTV
                  </Text>
                </Card>
              </TouchableOpacity>
            )) }
          </View>

          <Separator margin="20 0 20 0"/>

          <Card style={{ padding: 20, flexDirection: 'row' }}>
            <View style={{ marginHorizontal: 5, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={LoanApplicationStyle.loanAmountText}>{ formData.ltv.interest * 100 }%</Text>
              <Text style={LoanApplicationStyle.loanAmountPercentage}>Annual interest rate</Text>
            </View>
            <View style={{ marginHorizontal: 5, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={LoanApplicationStyle.loanAmountText}>$80</Text>
              <Text style={LoanApplicationStyle.loanAmountPercentage}>Monthly payment</Text>
            </View>
          </Card>

          <CelButton onPress={this.applyForLoan}>
            Apply for a loan
          </CelButton>
        </CelScreenContent>
      </SimpleLayout>
    );
  }
}

export default LoanApplication;
