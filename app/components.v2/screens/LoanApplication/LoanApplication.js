import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import LoanApplicationStyle from "./LoanApplication.styles";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import Separator from "../../atoms/Separator/Separator";
import Loader from "../../atoms/Loader/Loader";
import CelButton from "../../atoms/CelButton/CelButton";
import CelSelect from "../../molecules/CelSelect/CelSelect";
import { LOAN_ELIGIBLE_COINS, KYC_STATUSES } from "../../../config/constants/common";
import CelInput from "../../atoms/CelInput/CelInput";
import CelScreenContent from "../../atoms/CelScreenContent/CelScreenContent";
import Card from "../../atoms/Card/Card";
import formatter from "../../../utils/formatter";
import apiUtil from "../../../utils/api-util";
import API from "../../../config/constants/API";
import CelForm from "../../atoms/CelForm/CelForm";
import Icon from "../../atoms/Icon/Icon";
import { normalize } from "../../../utils/styles-util";
import LtvModal from "../../organisms/LtvModal/LtvModal";
import { heightPercentageToDP } from "../../../utils/scale";
import testUtil from "../../../utils/test-util";
import EmptyState from "../../atoms/EmptyState/EmptyState";

const LTVs = [
  { percent: 0.2, interest: 0.05 },
  { percent: 0.33, interest: 0.09 },
  { percent: 0.5, interest: 0.12 }
];

@connect(
  state => ({
    supportedCurrencies: state.generalData.supportedCurrencies,
    currencyRatesShort: state.generalData.currencyRatesShort,
    walletCurrencies: state.wallet.currencies,
    formData: state.ui.formData,
    activeScreen: state.nav.routes[state.nav.index].routeName,
    callsInProgress: state.api.callsInProgress,
    hasPassedKYC: state.users.user.kyc && state.users.user.kyc.status === KYC_STATUSES.passed,
    appSettings: state.users.appSettings
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class LoanApplication extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amountError: false,
    };
  }

  componentWillMount = () => this.initScreen();

  componentWillReceiveProps(nextProps) {
    if ((this.props.activeScreen !== nextProps.activeScreen && nextProps.activeScreen === "LoanApplication") ||
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
        pickerItems = LOAN_ELIGIBLE_COINS.map(ec => {
          const walletCurrency = walletCurrencies.find(w => w.currency.short === ec);
          const currencyName = walletCurrency.currency.name[0].toUpperCase() + walletCurrency.currency.name.slice(1);
          return { label: `${currencyName} (${ec})`, value: ec.toLowerCase() };
        });
      }
    } else {
      pickerItems = LOAN_ELIGIBLE_COINS.map(ec => {
        const currency = supportedCurrencies.find(sc => sc.short === ec);
        const currencyName = currency.name[0].toUpperCase() + currency.name.slice(1);
        return { label: `${currencyName} (${ec})`, value: ec.toLowerCase() };
      });
    }

    this.setState({ pickerItems });

    actions.initForm({
      ltv: LTVs[0]
    });

    };

  applyForLoan = () => {
    const { actions, formData, currencyRatesShort } = this.props;
    if (!formData.coin) {
      return actions.showMessage("error", "Please select a currency");
    }
    if (!formData.amountCollateralUSD) {
      return actions.showMessage("error", "Please select an amount more than $10,000.00");
    }

    if (Number(formData.amountCollateralUSD) < 10000) {
      this.setState({
        amountError: true,
      });
      return actions.showMessage("warning", "Minimum amount for a loan is $10,000.00");
    }

    if (!formData.amountCollateralCrypto) {
      actions.updateFormField("amountCollateralCrypto", formData.amountCollateralUSD / currencyRatesShort[formData.coin])
    }
    actions.applyForALoan();
  };

  updateAmounts = (field, text) => {
    const { actions, currencyRatesShort, formData } = this.props;

    actions.updateFormField("amountCollateralUSD", text);
    const loanAmount = text * formData.ltv.percent;
    actions.updateFormField("loanAmount", loanAmount);
    actions.updateFormField("monthlyRate", loanAmount * formData.ltv.interest / 12);
    if (formData.coin) {
      actions.updateFormField("amountCollateralCrypto", text / currencyRatesShort[formData.coin]);
    }
  };

  clickCard = (ltv) => {
    const { actions, formData } = this.props;

    actions.updateFormField("ltv", ltv);
    const loanAmount = formData.amountCollateralUSD * ltv.percent;
    actions.updateFormField("loanAmount", loanAmount);
    actions.updateFormField("monthlyRate", loanAmount * ltv.interest / 12);
  };

  renderCard(ltv) {
    const { formData } = this.props;
    let direction;

    if (Number(formData.amountCollateralUSD) > 999999999) {
      direction = { flexDirection: "column", justifyContent: "center" };
    }

    return (
      <TouchableOpacity onPress={() => this.clickCard(ltv)} key={ltv.percent.toString()}
        style={{ marginTop: heightPercentageToDP("1.23%") }}>
        <Card
          style={ltv === formData.ltv ? [LoanApplicationStyle.loanAmountCard, LoanApplicationStyle.loanAmountCardActive, direction] : [LoanApplicationStyle.loanAmountCard, direction]}
        >

          <View style={{ marginLeft: 15, marginRight: 15 }}>
            <Text
              style={ltv === formData.ltv ? [LoanApplicationStyle.mainText, { color: "white" }] : LoanApplicationStyle.mainText}
            >
              {formatter.usd(formData.amountCollateralUSD ? formData.amountCollateralUSD * ltv.percent : 0)}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginRight: 15, alignItems: "center" }}>
            <Text
              style={ltv === formData.ltv ? [LoanApplicationStyle.subText, { color: "white" }] : LoanApplicationStyle.subText}
            >
              {100 * ltv.interest}% interest
            </Text>


            {ltv === formData.ltv &&
              <Icon name='WhiteCheck' height='20' width='20' viewBox="0 0 37 37" />}
          </View>
        </Card>
      </TouchableOpacity>
    );
  }


  render() {
    const { formData, callsInProgress, walletCurrencies, appSettings } = this.props;
    const { pickerItems, amountError } = this.state;

    if (appSettings.declineAccess) {
      return (
        <SimpleLayout
          mainHeader={{ backButton: false }}
          animatedHeading={{ text: "Borrow Dollars" }}
        >
          <EmptyState purpose={"NycBlackout"}/>
        </SimpleLayout>
      );
    }

    if (!pickerItems || !formData.ltv) {
      return (
        <SimpleLayout
          mainHeader={{ backButton: false }}
          animatedHeading={{ text: "Borrow Dollars" }}
        >
          <Loader />
        </SimpleLayout>

      );
    }

    const error = amountError ? "The loan amount should be $10,000 or higher." : null;

    const isLoading = apiUtil.areCallsInProgress([API.APPLY_FOR_LOAN], callsInProgress);
    const walletCurrency = walletCurrencies ? walletCurrencies.find(w => w.currency.short.toLowerCase() === formData.coin) : null;

    const ltvType = formData.coin === "xrp" || formData.coin === "ltc";

    const ltvArray = LTVs.slice(0,1);

    const loanAmountText = ltvType ? "Click on loan amount:" : "Choose one of these loan amounts:";

    return (
      <SimpleLayout
        mainHeader={{ backButton: false }}
        animatedHeading={{ text: "Borrow Dollars" }}
      >
        <CelScreenContent padding="15 0 0 0" scrollDisabled>

          <Text style={[globalStyles.normalText, { fontSize: normalize(18) }]}>
            Celsius Network guarantees the
            <Text style={[globalStyles.boldText]}> lowest interest rates</Text>
            . Submit your application today!
          </Text>

          <Separator margin="15 0 24 0" />
          <Text style={[globalStyles.normalText, { fontSize: normalize(18) }]}>Enter the amount of collateral:</Text>
          <CelForm margin="25 0 0 0">
            <CelInput
              field="amountCollateralUSD"
              theme="white"
              value={formData.amountCollateralUSD}
              placeholder="$10,000.00 is minimal amount"
              type="number"
              onChange={this.updateAmounts}
              error={error}
            />
          </CelForm>

          <Separator margin="20 0 20 0" />
          <Text style={[globalStyles.normalText, { fontSize: normalize(18) }]}>Choose the coin you would like to use as
            a collateral:</Text>
          <CelSelect
            field="coin"
            theme="white"
            items={pickerItems}
            labelText="Pick a currency"
            value={formData.coin}
            margin="25 0 22 0"
          />
          {walletCurrency && (
            <Text style={[globalStyles.normalText, {
              fontFamily: "inconsolata-regular",
              textAlign: "left",
              fontSize: normalize(18)
            }]}>
              Balance: {formatter.crypto(walletCurrency.amount, walletCurrency.currency.short, { precision: 5 })} = {formatter.usd(walletCurrency.total)}
            </Text>
          )}

          {formData.amountCollateralCrypto && (
            <Text style={[globalStyles.normalText, { fontFamily: "inconsolata-regular", textAlign: "left" }]}>
              Amount: {formatter.crypto(formData.amountCollateralCrypto, formData.coin.toUpperCase(), { precision: 5 })}
            </Text>
          )}

          <Separator margin="24 0 24 0" />
          <Text style={[globalStyles.normalText, LoanApplicationStyle.choose]}>{loanAmountText}</Text>
          <View style={LoanApplicationStyle.cardWrapper}>
            {ltvType ? ltvArray.map((ltv) => (
              this.renderCard(ltv)
            )) : LTVs.map((ltv) => (
              this.renderCard(ltv)
            ))}
          </View>

          <Separator margin="24 0 24 0" />

          <Card style={LoanApplicationStyle.bottomCard}>
            <View style={LoanApplicationStyle.leftBox}>
              <Text style={[LoanApplicationStyle.mainText, {
                width: "80%",
                textAlign: "center"
              }]}>{formData.ltv.interest * 100}%</Text>
              <Text style={[LoanApplicationStyle.subText, { width: "80%", textAlign: "center" }]}>Annual interest
                rate</Text>
            </View>
            <View style={LoanApplicationStyle.rightBox}>
              <Text style={[LoanApplicationStyle.mainText, {
                width: "80%",
                textAlign: "center"
              }]}>{formatter.usd(formData.monthlyRate || 0)}</Text>
              <Text style={[LoanApplicationStyle.subText, { width: "80%", textAlign: "center" }]}>Monthly interest
                payment</Text>
            </View>
          </Card>

          <CelButton
            onPress={this.applyForLoan}
            loading={isLoading}
            margin="20 0 0 0"
            disabled={!formData.amountCollateralUSD}
          >
            Apply for a loan
          </CelButton>
        </CelScreenContent>
        <LtvModal />
      </SimpleLayout>
    );
  }
}

export default testUtil.hookComponent(LoanApplication);
