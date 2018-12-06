import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { GLOBAL_STYLE_DEFINITIONS as globalStyles, COLORS } from "../../../config/constants/style";
import * as appActions from "../../../redux/actions";
import AmountInputStyle from "./AmountInput.styles";
import CelButton from "../../../components/atoms/CelButton/CelButton";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import { MainHeader } from "../../molecules/MainHeader/MainHeader";
import CelHeading from "../../atoms/CelHeading/CelHeading";
import Icon from "../../atoms/Icon/Icon";
import formatter from '../../../utils/formatter';
import { ELIGIBLE_COINS } from "../../../config/constants/common";
import CelScreenContent from "../../atoms/CelScreenContent/CelScreenContent";
import testUtil from "../../../utils/test-util";

const predefinedAmounts = ["20", "50", "100", "All"];

@connect(
  state => {
    const balances = {};
    const rates = {};

    ELIGIBLE_COINS.forEach(ec => {
      balances[`${ec.toLowerCase()}Balance`] = state.wallet.currencies.filter(c => c.currency.short === ec)[0].amount;
      rates[`${ec.toLowerCase()}Usd`] = state.generalData.supportedCurrencies.filter(c => c.short === ec)[0].market.quotes.USD.price;
    })

    return {
      balances,
      rates,
      formData: state.ui.formData,
      screenHeight: state.ui.dimensions.screenHeight,
      screenWidth: state.ui.dimensions.screenWidth,
    }
  },
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class AmountInput extends Component {
  constructor(props) {
    super(props);

    const currency = props.formData.currency;
    this.state = {
      numPad: [
        { label: '1', testLabel: 'one', action: this.onPressNumber },
        { label: '2', testLabel: 'two', action: this.onPressNumber },
        { label: '3', testLabel: 'three', action: this.onPressNumber },
        { label: '4', testLabel: 'four', action: this.onPressNumber },
        { label: '5', testLabel: 'five', action: this.onPressNumber },
        { label: '6', testLabel: 'six', action: this.onPressNumber },
        { label: '7', testLabel: 'seven',action: this.onPressNumber },
        { label: '8', testLabel: 'eight', action: this.onPressNumber },
        { label: '9', testLabel: 'nine', action: this.onPressNumber },
        { label: '.', testLabel: 'period',action: this.onPressDecimal },
        { label: '0', testLabel: 'zero', action: this.onPressNumber },
        { label: '\u2190', testLabel: 'backslash', action: this.onPressErase },
      ],
    };

    props.actions.initForm({
      amount: '',
      inUsd: true,
      amountUsd: 0,
      amountCrypto: 0,
      currency,
      rateUsd: props.rates[`${currency}Usd`],
      balance: props.balances[`${currency}Balance`],
    })
  }

  onPressPredefinedAmount = (number) => {
    const { formData, actions } = this.props;
    let amount;

    if (number === 'All') {
      amount = formData.inUsd ? (formData.balance * formData.rateUsd).toString() : formData.balance;
    } else {
      amount = formData.inUsd ? number : (Number(number) / formData.rateUsd).toString()
    }

    const amountUsd = Number(amount);
    const amountCrypto = Number(number) / formData.rateUsd;
    if (amountUsd > 20000) {
      actions.showMessage('info', 'Maximum amount to withdraw is $20,000.00');
    } else if (amountCrypto > formData.balance) {
      actions.showMessage('info', 'Insufficient funds');
    } else {
      this.updateAmount(amount);
    }
  }

  onPressNumber = (number) => {
    const { formData, actions } = this.props;
    const decimal = formData.inUsd ? 2 : 5;

    const amount = formData.amount ? formData.amount + number : number;
    const amountUsd = formData.inUsd ? Number(amount) : Number(amount) * formData.rateUsd
    const amountCrypto = !formData.inUsd ? Number(amount) : Number(amount) / formData.rateUsd
    if (amountUsd > 20000) {
      actions.showMessage('info', 'Maximum amount to withdraw is $20,000.00');
    } else if (amountCrypto > formData.balance) {
      actions.showMessage('info', 'Insufficient funds');
    } else if (amount.indexOf('.') === -1 || amount.length - amount.indexOf('.') <= decimal + 1) {
      this.updateAmount(amount);
    }
  }

  onPressDecimal = () => {
    const { formData } = this.props;
    if (formData.amount.indexOf('.') === -1) {
      this.updateAmount(`${formData.amount}.`);
    }
  }

  onPressErase = () => {
    const { formData } = this.props;
    const decimal = formData.inUsd ? 2 : 5;
    let amount = formData.amount;
    if (formData.amount.indexOf('.') > 0 && amount.length - amount.indexOf('.') > decimal + 1) {
      amount = amount.substring(0, amount.length - (amount.length - amount.indexOf('.') - decimal));
    } else {
      amount = amount.substring(0, amount.length - 1);
    }
    if (amount.length - 1 === amount.indexOf('.')) {
      amount = amount.substring(0, amount.length - 1);
    }
    this.updateAmount(amount);
  }

  /**
   * @param {string} purpose
   * @param {string} currency
   * @returns {string}
   */
  getHeadingText = (purpose, currency) => {
    if (purpose === 'send' || purpose === 'confirm-send') {
      return `CelPay ${currency ? currency.toUpperCase() : ''}`;
    }

    return `Withdraw ${currency ? currency.toUpperCase() : ''}`;
  };

  /**
   * @param {string} purpose
   * @returns {string}
   */
  getMainButtonText = (purpose) => {
    if (purpose === 'send' || purpose === 'confirm-send') {
      return `Choose recipient`;
    }

    return "Check Wallet Address";
  };

  switchCurrencies = () => {
    const { formData, actions } = this.props;
    actions.updateFormField('inUsd', !formData.inUsd);

    let newAmount = formData.inUsd ? formData.amountCrypto.toString() : formData.amountUsd.toString();

    if (Number(newAmount) === 0) {
      newAmount = '';
    }

    actions.updateFormField('amount', newAmount);
  };

  updateAmount = (amount) => {
    const { formData, actions } = this.props;

    actions.updateFormField('amount', amount);
    const amountUsd = formData.inUsd ? Number(amount) : Number(amount) * formData.rateUsd;
    actions.updateFormField('amountUsd', amountUsd);
    const amountCrypto = !formData.inUsd ? amount : Number(amount) / formData.rateUsd;
    actions.updateFormField('amountCrypto', amountCrypto);
  }

  handleMainButtonClick = (purpose) => {
    if (purpose === 'send') {
      return this.chooseRecipient;
    }

    return this.confirmTransaction;
  };

  goToSendScreen = async (verificationCode) => {
    const { formData, actions } = this.props;

    actions.navigateTo('AmountInput', { purpose: 'confirm-send' });
    try {
      actions.createBranchTransfer(formData.amountCrypto, formData.amountUsd, formData.currency, verificationCode);
    } catch (e) {
      return true;
    }
  };

  chooseRecipient = () => {
    const { actions } = this.props;

    actions.navigateTo("VerifyIdentity", {
      actionLabel: 'withdraw',
      verificationCallback: this.goToSendScreen,
    });
  };

  confirmTransaction = () => {
    const { formData, actions } = this.props;
    const amountUsd = formData.inUsd ? Number(formData.amount) : Number(formData.amount) * formData.rateUsd;

    if (amountUsd < 1) {
      actions.showMessage('info', 'Oops, you\'ve got to withdraw a minimum of $1 worth of crypto from your wallet');
    } else {
      actions.navigateTo('TransactionConfirmation');
    }
  }

  render() {
    const { numPad } = this.state;
    const { formData, screenHeight, navigation } = this.props;

    const purpose = navigation.getParam("purpose");

    if (!formData.currency) return null;

    const mainAmountText = formData.inUsd ? formatter.usd(formData.amountUsd || '0.00') : formatter.crypto(formData.amountCrypto || '0.00000', formData.currency.toUpperCase(), { precision: 5 });
    const secondaryAmountText = !formData.inUsd ? formatter.usd(formData.amountUsd) : formatter.crypto(formData.amountCrypto, formData.currency.toUpperCase(), { precision: 5 });

    const balanceCrypto = formData.balance - formData.amountCrypto;
    const balanceUsd = balanceCrypto * formData.rateUsd;

    const displayBalanceCrypto = formatter.crypto(balanceCrypto, formData.currency.toUpperCase(), { precision: 5 });
    const displayBalanceUsd = formatter.usd(balanceUsd);

    return (
      <BasicLayout
      >
        <MainHeader backButton ref={testUtil.generateTestHook(this, `AmountInput.back`)} />
        <CelHeading text={this.getHeadingText(purpose, formData.currency)} />
        <CelScreenContent padding='0 0 0 0'>
          <View style={{ height: 0.75 * screenHeight }}>
            <View style={AmountInputStyle.inputWrapper}>
              <Text style={AmountInputStyle.primaryAmount}>
                {mainAmountText}
              </Text>
              <Text style={AmountInputStyle.secondaryAmount}>
                {secondaryAmountText}
              </Text>

              <View style={[AmountInputStyle.buttonsWrapper, { flexDirection: "row" }]}>
                {predefinedAmounts.map(predefinedAmount =>
                  (Number(predefinedAmount) / formData.rateUsd > formData.balance && predefinedAmount !== 'All') ?
                    <View
                      key={predefinedAmount}
                      style={[AmountInputStyle.periodButtonDisabled, this.state.activePeriod === predefinedAmount ? { backgroundColor: COLORS.gray } : null]}
                    >
                      <Text style={AmountInputStyle.periodButtonText}>{predefinedAmount !== "All" ? `$${predefinedAmount}` : "All"}</Text>
                    </View>
                    :
                    <TouchableOpacity
                      key={predefinedAmount}
                      style={[AmountInputStyle.periodButton, this.state.activePeriod === predefinedAmount ? { backgroundColor: COLORS.gray } : null]}
                      onPress={() => this.onPressPredefinedAmount(`${predefinedAmount}`)}
                    >
                      <Text style={AmountInputStyle.periodButtonText}>{predefinedAmount !== "All" ? `$${predefinedAmount}` : "All"}</Text>
                    </TouchableOpacity>
                )
                }
              </View>
              <TouchableOpacity ref={testUtil.generateTestHook(this, 'AmountInput.switch')} style={AmountInputStyle.switchIcon} onPress={ this.switchCurrencies }>
                <Icon name='SwitchIcon' width='36' height='36' fill='rgba(61,72,83,0.3)' stroke='white' />
              </TouchableOpacity>
            </View>

            <View style={{ height: 0.55 * screenHeight, marginTop: 0.02 * screenHeight }}>

              <View style={AmountInputStyle.newBalance}>
                <Text style={AmountInputStyle.newBalanceText}> New balance:</Text>
                <Text style={AmountInputStyle.newBalanceText}>{displayBalanceCrypto} = </Text>
                <Text style={[AmountInputStyle.newBalanceText, globalStyles.boldText]}>{displayBalanceUsd}</Text>
              </View>

              <View style={AmountInputStyle.numberContent}>
                {numPad.map(item => (
                  <TouchableOpacity ref={testUtil.generateTestHook(this, `AmountInput.${item.testLabel}`)} key={item.label} onPress={() => item.action(item.label)}>
                    <View style={AmountInputStyle.button}>
                      <Text style={AmountInputStyle.text}>
                        {item.label}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )
                )}
              </View>

              <CelButton
                ref={testUtil.generateTestHook(this, `AmountInput.send`)}
                disabled={!formData.amountCrypto}
                onPress={this.handleMainButtonClick(purpose)}
                margin='10 36 5 36'
              >
                {this.getMainButtonText(purpose)}
              </CelButton>
            </View>
          </View>
        </CelScreenContent>
      </BasicLayout>
    );
  }
}

export default testUtil.hookComponent(AmountInput);
