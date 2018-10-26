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
          return {
            label: `${currencyName} (${ec})`,
            value: ec.toLowerCase(),
            // image: walletCurrency.currency.image_url,
            // subtext: `${ formatter.crypto(walletCurrency.amount, ec, { precision: 5 }) } = ${ formatter.usd(walletCurrency.total) }`,
          };
        });
      }
    } else {
      pickerItems = ELIGIBLE_COINS.map(ec => {
        const currency = supportedCurrencies.find(sc => sc.short === ec)
        const currencyName = currency.name[0].toUpperCase() + currency.name.slice(1);
        return {
          label: `${currencyName} (${ec})`,
          value: ec.toLowerCase(),
          // image: currency.image_url,
        };
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
      return actions.showMessage('error', 'Please select an amount between %500.00 and $10,000.00')
    }

    if (Number(formData.amountCollateralUSD) < 500) {
      return actions.showMessage('warning', 'Minimum amount for a loan is $500.00')
    }

    actions.applyForALoan();
  }

  render() {
    const { formData, actions, callsInProgress } = this.props;
    const { pickerItems } = this.state;

    if (!pickerItems || !formData.ltv) {
      return (
        <SimpleLayout
          mainHeader={{ backButton: false }}
          animatedHeading={{ text: 'Apply for a Loan', textAlign: 'center' }}
        >
          <Loader />
        </SimpleLayout>

      )
    }

    const isLoading = apiUtil.areCallsInProgress([API.APPLY_FOR_LOAN], callsInProgress);

    return (
      <SimpleLayout
        mainHeader={{ backButton: false }}
        animatedHeading={{ text: 'Apply for a Loan', textAlign: 'center' }}
      >
        <CelScreenContent padding="15 0 0 0">

          <Text style={globalStyles.normalText}>
            Celsius Network offers the
            <Text style={[globalStyles.boldText]}> lowest interest rates</Text>
            . Fill out this form for a member of our sales team to coordinate your loan for you today!
          </Text>

          <Separator margin="20 0 20 0"/>
          <Text style={globalStyles.normalText}>Choose the coin you would like to use as a collateral:</Text>
          <CelSelect
            field="coin"
            theme="white"
            items={pickerItems}
            labelText="Pick a currency"
            value={formData.coin}
            margin="25 0 15 0"
          />

          <Separator margin="20 0 20 0"/>
          <Text style={globalStyles.normalText}>Enter the amount of collateral:</Text>

          <CelForm margin="25 0 0 0">
            <CelInput
              field="amountCollateralUSD"
              theme="white"
              value={formData.amountCollateralUSD}
              placeholder="eg. $1,500.00"
              type="number"
            />
          </CelForm>

          <Separator margin="20 0 20 0"/>
          <Text style={globalStyles.normalText}>Choose one of these loan amounts:</Text>

          <View style={LoanApplicationStyle.cardWrapper}>
            { LTVs.map((ltv) => (
              <TouchableOpacity onPress={() => actions.updateFormField('ltv', ltv)} key={ltv.percent.toString()}>
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
                </Card>
              </TouchableOpacity>
            )) }
          </View>

          <Separator margin="20 0 20 0"/>

          <Card style={LoanApplicationStyle.bottomCard}>
            <View style={LoanApplicationStyle.leftBox}>
              <Text style={[LoanApplicationStyle.mainText, { width: '80%', textAlign: 'center' }]}>{ formData.ltv.interest * 100 }%</Text>
              <Text style={[LoanApplicationStyle.subText, { width: '80%', textAlign: 'center' }]}>Annual interest rate</Text>
            </View>
            <View style={LoanApplicationStyle.rightBox}>
              <Text style={[LoanApplicationStyle.mainText, { width: '80%', textAlign: 'center' }]}>$80</Text>
              <Text style={[LoanApplicationStyle.subText, { width: '80%', textAlign: 'center' }]}>Monthly payment</Text>
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

export default LoanApplication;
