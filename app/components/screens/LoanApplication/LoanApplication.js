import React, {Component} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import LoanApplicationStyle from "./LoanApplication.styles";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import Separator from "../../atoms/Separator/Separator";
import Loader from "../../atoms/Loader/Loader";
import CelButton from "../../atoms/CelButton/CelButton";
import CelSelect from "../../molecules/CelSelect/CelSelect";
import { ELIGIBLE_COINS, KYC_STATUSES } from "../../../config/constants/common";
import CelInput from "../../atoms/CelInput/CelInput";
import CelScreenContent from "../../atoms/CelScreenContent/CelScreenContent";
import Card from "../../atoms/Card/Card";
import formatter from "../../../utils/formatter";
import apiUtil from "../../../utils/api-util";
import API from "../../../config/constants/API";
import CelForm from "../../atoms/CelForm/CelForm";
import Icon from "../../atoms/Icon/Icon";
import {normalize} from "../../../utils/styles-util";
import testUtil from "../../../utils/test-util";

const LTVs = [
  { percent: 0.2, label: 'two', interest: 0.05 },
  { percent: 0.33, label: 'three', interest: 0.09 },
  { percent: 0.5, label: 'five', interest: 0.12 },
  { percent: 0.75, label: 'seven', interest: 0.15 },
]

@connect(
  state => ({
    supportedCurrencies: state.generalData.supportedCurrencies,
    currencyRatesShort: state.generalData.currencyRatesShort,
    walletCurrencies: state.wallet.currencies,
    formData: state.ui.formData,
    activeScreen: state.nav.routes[state.nav.index].routeName,
    callsInProgress: state.api.callsInProgress,
    hasPassedKYC: state.users.user.kyc && state.users.user.kyc.status === KYC_STATUSES.passed,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class LoanApplication extends Component {
  componentWillMount = () => this.initScreen();

  componentWillReceiveProps(nextProps) {
    if ((this.props.activeScreen !== nextProps.activeScreen && nextProps.activeScreen === 'LoanApplication') ||
        (!this.props.walletCurrencies && nextProps.walletCurrencies)) {

      this.initScreen(nextProps);
    }
  }

  initScreen = (props) => {
    const { actions, walletCurrencies, supportedCurrencies, hasPassedKYC, callsInProgress } = props || this.props;

    let pickerItems;

    if (hasPassedKYC) {
      if (!walletCurrencies) {
        if (!apiUtil.areCallsInProgress([API.GET_WALLET_DETAILS], callsInProgress)) actions.getWalletDetails();
      } else {
        pickerItems = ELIGIBLE_COINS.map(ec => {
          const walletCurrency = walletCurrencies.find(w => w.currency.short === ec)
          const currencyName = walletCurrency.currency.name[0].toUpperCase() + walletCurrency.currency.name.slice(1);
          return { label: `${currencyName} (${ec})`, value: ec.toLowerCase() };
        });
      }
    } else {
      pickerItems = ELIGIBLE_COINS.map(ec => {
        const currency = supportedCurrencies.find(sc => sc.short === ec)
        const currencyName = currency.name[0].toUpperCase() + currency.name.slice(1);
        return { label: `${currencyName} (${ec})`, value: ec.toLowerCase() };
      });
    }

    this.setState({ pickerItems });

    actions.initForm({
      ltv: LTVs[0],
    })
  }

  applyForLoan = () => {
    const { actions, formData } = this.props;
    if (!formData.coin) {
      return actions.showMessage('error', 'Please select a currency')
    }
    if (!formData.amountCollateralUSD) {
      return actions.showMessage('error', 'Please select an amount between $500.00 and $10,000.00')
    }

    if (Number(formData.amountCollateralUSD) < 500) {
      return actions.showMessage('warning', 'Minimum amount for a loan is $500.00')
    }

    actions.applyForALoan();
  }

  updateAmounts = (field, text) => {
    const { actions, currencyRatesShort, formData } = this.props;

    actions.updateFormField('amountCollateralUSD', text);
    const loanAmount = text * formData.ltv.percent;
    actions.updateFormField('loanAmount', loanAmount);
    actions.updateFormField('monthlyRate', loanAmount * formData.ltv.interest / 12);
    if (formData.coin) {
      actions.updateFormField('amountCollateralCrypto', text / currencyRatesShort[formData.coin]);
    }
  }

  clickCard = (ltv) => {
    const { actions, formData } = this.props;

    actions.updateFormField('ltv', ltv);
    const loanAmount = formData.amountCollateralUSD * ltv.percent;
    actions.updateFormField('loanAmount', loanAmount);
    actions.updateFormField('monthlyRate', loanAmount * ltv.interest / 12);
  }

  render() {
    const { formData, callsInProgress, walletCurrencies } = this.props;
    const { pickerItems } = this.state;

    if (!pickerItems || !formData.ltv) {
      return (
        <SimpleLayout
          mainHeader={{ backButton: false }}
          animatedHeading={{ text: 'CelBorrow', textAlign: 'center' }}
        >
          <Loader />
        </SimpleLayout>

      )
    }

    const isLoading = apiUtil.areCallsInProgress([API.APPLY_FOR_LOAN], callsInProgress);
    const walletCurrency = walletCurrencies ? walletCurrencies.find(w => w.currency.short.toLowerCase() === formData.coin) : null;

    return (
      <SimpleLayout
        mainHeader={{ backButton: false }}
        animatedHeading={{ text: 'CelBorrow', textAlign: 'center' }}
      >
        <CelScreenContent padding="15 0 0 0">

          <Text style={[globalStyles.normalText, {fontSize: normalize(18),}]}>
            Celsius Network guarantees the
            <Text style={[globalStyles.boldText]}> lowest interest rates</Text>
            . Submit your application today!
          </Text>

          <Separator margin="20 0 20 0"/>
          <Text style={[globalStyles.normalText, {fontSize: normalize(18),}]}>Choose the coin you would like to use as a collateral:</Text>
          <CelSelect
            field="coin"
            theme="white"
            items={pickerItems}
            labelText="Pick a currency"
            value={formData.coin}
            margin="25 0 22 0"
          />
          { walletCurrency && (
            <Text style={[globalStyles.normalText, { fontFamily: 'inconsolata-regular', textAlign: 'center', fontSize: normalize(18) }]}>
              Balance: { formatter.crypto(walletCurrency.amount, walletCurrency.currency.short, { precision: 5 }) } = { formatter.usd(walletCurrency.total) }
            </Text>
          ) }

          <Separator margin="15 0 24 0"/>
          <Text style={[globalStyles.normalText, {fontSize: normalize(18),}]}>Enter the amount of collateral:</Text>
          <CelForm margin="25 0 0 0">
            <CelInput
              field="amountCollateralUSD"
              theme="white"
              value={formData.amountCollateralUSD}
              placeholder="i.e. $1,500.00"
              type="number"
              onChange={this.updateAmounts}
            />
          </CelForm>
          { formData.amountCollateralCrypto && (
            <Text style={[globalStyles.normalText, { fontFamily: 'inconsolata-regular', textAlign: 'center' }]}>
              Amount: { formatter.crypto(formData.amountCollateralCrypto, formData.coin.toUpperCase(), { precision: 5 }) }
            </Text>
          ) }

          <Separator margin="24 0 24 0"/>
          <Text style={[globalStyles.normalText, LoanApplicationStyle.choose]}>Choose one of these loan amounts:</Text>
          <View style={LoanApplicationStyle.cardWrapper}>
            { LTVs.map((ltv) => (
              <TouchableOpacity ref={testUtil.generateTestHook(this, `LoanApplication.${ltv.label}`)} onPress={() => this.clickCard(ltv)} key={ltv.percent.toString()}>
                <Card
                  style={ltv === formData.ltv ? [LoanApplicationStyle.loanAmountCard, LoanApplicationStyle.loanAmountCardActive] : LoanApplicationStyle.loanAmountCard}
                >
                  <Text
                    style={ltv === formData.ltv ? [LoanApplicationStyle.mainText, { color: 'white' }] : LoanApplicationStyle.mainText}
                  >
                    { formatter.usd(formData.amountCollateralUSD ? formData.amountCollateralUSD * ltv.percent : 0) }
                  </Text>
                  <Text
                    style={ltv === formData.ltv ? [LoanApplicationStyle.subText, { color: 'white' }] : LoanApplicationStyle.subText}
                  >
                    { 100 * ltv.percent }% LTV
                  </Text>

                  { ltv === formData.ltv  && <Icon name='GreenCheck' height='25' width='25' viewBox="0 0 37 37" style={{ position: 'absolute', bottom: 5, right: 5 }}/> }
                </Card>
              </TouchableOpacity>
            )) }
          </View>

          <Separator margin="24 0 24 0"/>

          <Card style={LoanApplicationStyle.bottomCard}>
            <View style={LoanApplicationStyle.leftBox}>
              <Text style={[LoanApplicationStyle.mainText, { width: '80%', textAlign: 'center' }]}>{ formData.ltv.interest * 100 }%</Text>
              <Text style={[LoanApplicationStyle.subText, { width: '80%', textAlign: 'center' }]}>Annual interest rate</Text>
            </View>
            <View style={LoanApplicationStyle.rightBox}>
              <Text style={[LoanApplicationStyle.mainText, { width: '80%', textAlign: 'center' }]}>{ formatter.usd(formData.monthlyRate || 0) }</Text>
              <Text style={[LoanApplicationStyle.subText, { width: '80%', textAlign: 'center' }]}>Monthly interest payment</Text>
            </View>
          </Card>

          <CelButton
            onPress={this.applyForLoan}
            loading={isLoading}
            margin="20 0 0 0"
          >
            Apply for a loan
          </CelButton>
        </CelScreenContent>
      </SimpleLayout>
    );
  }
}

export default testUtil.hookComponent(LoanApplication);
