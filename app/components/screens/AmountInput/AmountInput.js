import React, { Component } from "react";
import { Text, View, TouchableOpacity} from "react-native";
import {Content} from 'native-base';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import * as appActions from "../../../redux/actions";
import AmountInputStyle from "./AmountInput.styles";
import CelButton from "../../../components/atoms/CelButton/CelButton";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import {MainHeader} from "../../molecules/MainHeader/MainHeader";
import CelHeading from "../../atoms/CelHeading/CelHeading";
import Icon from "../../atoms/Icon/Icon";
import formatter from '../../../utils/formatter';
import { ELIGIBLE_COINS } from "../../../config/constants/common";

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
        { label: '1', action: this.onPressNumber },
        { label: '2', action: this.onPressNumber },
        { label: '3', action: this.onPressNumber },
        { label: '4', action: this.onPressNumber },
        { label: '5', action: this.onPressNumber },
        { label: '6', action: this.onPressNumber },
        { label: '7', action: this.onPressNumber },
        { label: '8', action: this.onPressNumber },
        { label: '9', action: this.onPressNumber },
        { label: '.', action: this.onPressDecimal },
        { label: '0', action: this.onPressNumber },
        { label: '\u2190', action: this.onPressErase },
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

  onPressNumber = (number) => {
    const { formData, actions } = this.props;
    const decimal = formData.inUsd ? 2 : 5;

    const amount = formData.amount + number;
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
    this.updateAmount(formData.amount.substring(0, formData.amount.length - 1));
  }

  /**
   * @param {string} purpose
   * @param {string} currency
   * @returns {string}
   */
  getHeadingText = (purpose, currency) => {
    if (purpose === 'send') {
      return `Send ${currency ? currency.toUpperCase() : ''}`;
    }

    return `Withdraw ${currency ? currency.toUpperCase() : ''}`;
  };

  /**
   * @param {string} purpose
   * @returns {string}
   */
  getMainButtonText = (purpose) => {
    if (purpose === 'send') {
      return `Choose recipient`;
    }

    return `Withdraw`;
  };

  switchCurrencies = () => {
    const { formData, actions } = this.props;
    actions.updateFormField('inUsd', !formData.inUsd);

    let newAmount = formData.inUsd ? formData.amountCrypto.toFixed(5).toString() : formData.amountUsd.toFixed(2).toString();

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
    const amountCrypto = !formData.inUsd ? Number(amount) : Number(amount) / formData.rateUsd;
    actions.updateFormField('amountCrypto', amountCrypto);
  }

  handleMainButtonClick = (purpose) => {
    if (purpose === 'send') {
      return this.chooseRecipient;
    }

    return this.confirmTransaction;
  };

  chooseRecipient = () => {
    const { formData: {amountCrypto, currency}, actions, navigation } = this.props;

    const purpose = navigation.getParam("purpose");

    actions.navigateTo('EnterPasscode', {
      amountCrypto,
      currency,
      purpose,
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
    const { formData, actions, screenHeight, navigation } = this.props;

    const purpose = navigation.getParam("purpose");

    if (!formData.currency) return null;

    const mainAmountText = formData.inUsd ? `$${formData.amount || '0.00'}` : `${formData.amount || '0.00000'} ${formData.currency.toUpperCase()}`;
    const secondaryAmountText = !formData.inUsd ? formatter.usd(formData.amountUsd) : formatter.crypto(formData.amountCrypto, formData.currency.toUpperCase(), { precision: 5 });

    const balanceCrypto = formData.balance - formData.amountCrypto;
    const balanceUsd = balanceCrypto * formData.rateUsd;

    const displayBalanceCrypto = formatter.crypto(balanceCrypto, formData.currency.toUpperCase(), { precision: 5 });
    const displayBalanceUsd = formatter.usd(balanceUsd);

    return (
      <BasicLayout
        bottomNavigation={false}
      >
        <MainHeader
          backButton
          onPressBackButton={() => actions.navigateTo('WalletDetails', { curency: formData.currency })}
        />
        <CelHeading text={this.getHeadingText(purpose, formData.currency)} />
        <Content bounces={false}>
          <View style={{ height: 0.75 * screenHeight }}>
            <View style={AmountInputStyle.inputWrapper}>
              <Text style={AmountInputStyle.primaryAmount}>
                { mainAmountText }
              </Text>
              <Text style={AmountInputStyle.secondaryAmount}>
                { secondaryAmountText }
              </Text>

              <View style={AmountInputStyle.separator}/>

              <View style={AmountInputStyle.newBalance}>
                <Text style={AmountInputStyle.newBalanceText}> New balance:</Text>
                <Text style={AmountInputStyle.newBalanceText}>{ displayBalanceCrypto } = </Text>
                <Text style={[AmountInputStyle.newBalanceText, globalStyles.boldText]}>{ displayBalanceUsd }</Text>
              </View>
              <TouchableOpacity style={AmountInputStyle.switchIcon} onPress={ this.switchCurrencies }>
                <Icon name='SwitchIcon' width='36' height='36' fill='rgba(61,72,83,0.3)' stroke='white' />
              </TouchableOpacity>
            </View>

            <View style={{ height: 0.55 * screenHeight, marginTop: 0.02 * screenHeight }}>
              <View style={AmountInputStyle.numberContent}>
                {numPad.map(item => (
                  <TouchableOpacity key={item.label} onPress={() => item.action(item.label)}>
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
                disabled={!formData.amountCrypto}
                onPress={this.handleMainButtonClick(purpose)}
                margin='5 36 5 36'
              >
                {this.getMainButtonText(purpose)}
              </CelButton>
            </View>
          </View>
        </Content>
      </BasicLayout>
    );
  }
}

export default AmountInput;
