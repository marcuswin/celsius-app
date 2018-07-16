import React, { Component } from "react";
import { Text, View, TouchableOpacity} from "react-native";
import {Content} from 'native-base';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "../../../redux/actions";
import AmountInputStyle from "./AmountInput.styles";
import CelButton from "../../../components/atoms/CelButton/CelButton";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import {MainHeader} from "../../molecules/MainHeader/MainHeader";
import CelHeading from "../../atoms/CelHeading/CelHeading";
import Icon from "../../atoms/Icon/Icon";
import formatter from '../../../utils/formatter';
import Message from "../../atoms/Message/Message";

const decimalForCurrency = {
  usd: 2,
  btc: 5,
  eth: 5,
  cel: 5,
};

@connect(
  state => ({
    ethBalance: state.wallet.currencies.filter(c => c.currency.short === 'ETH')[0].amount,
    btcBalance: state.wallet.currencies.filter(c => c.currency.short === 'BTC')[0].amount,
    celBalance: state.wallet.currencies.filter(c => c.currency.short === 'CEL')[0].amount,
    ethUsd: state.generalData.supportedCurrencies.filter(c => c.short === 'ETH')[0].market.quotes.USD.price,
    btcUsd: state.generalData.supportedCurrencies.filter(c => c.short === 'BTC')[0].market.quotes.USD.price,
    celUsd: state.generalData.supportedCurrencies.filter(c => c.short === 'CEL')[0].market.quotes.USD.price,
    formData: state.ui.formData,
  }),
  dispatch => bindActionCreators(actions, dispatch)
)
class AmountInput extends Component {
  constructor(props) {
    super(props);

    const currency = props.navigation.getParam('currency');
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
      decimal: decimalForCurrency.usd,
    };

    props.initForm({
      amount: '',
      inUsd: true,
      amountUsd: 0,
      amountCrypto: 0,
      currency: this.props.navigation.getParam('currency'),
      rateUsd: props[`${currency}Usd`],
      balance: props[`${currency}Balance`],
    })
  }

  onPressNumber = (number) => {
    const { formData, showMessage } = this.props;
    const { decimal } = this.state;

    const amount = formData.amount + number;
    const amountUsd = formData.inUsd ? Number(amount) : Number(amount) * formData.rateUsd
    const amountCrypto = !formData.inUsd ? Number(amount) : Number(amount) / formData.rateUsd
    if (amountUsd > 20000) {
      showMessage('info', 'Maximum amount to withdraw is $20,000.00');
    } else if (amountCrypto > formData.balance) {
      showMessage('info', 'Insufficient funds');
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

  switchCurrencies = () => {
    const { formData, updateFormField } = this.props;
    updateFormField('inUsd', !formData.inUsd);

    let newAmount = formData.inUsd ? formData.amountCrypto.toFixed(5).toString() : formData.amountUsd.toFixed(2).toString();

    if (Number(newAmount) === 0) {
      newAmount = '';
    }

    updateFormField('amount', newAmount);
    this.setState({
      decimal: formData.inUsd ? decimalForCurrency[formData.currency] : decimalForCurrency.usd,
    })
  }

  updateAmount = (amount) => {
    const { formData, updateFormField } = this.props;

    updateFormField('amount', amount);
    const amountUsd = formData.inUsd ? Number(amount) : Number(amount) * formData.rateUsd;
    updateFormField('amountUsd', amountUsd);
    const amountCrypto = !formData.inUsd ? Number(amount) : Number(amount) / formData.rateUsd;
    updateFormField('amountCrypto', amountCrypto);
  }

  render() {
    const { numPad } = this.state;
    const { formData, navigateTo } = this.props;

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
          onPressBackButton={() => navigateTo('WalletDetails', { curency: formData.currency })}
        />
        <CelHeading text={`Withdraw ${formData.currency ? formData.currency.toUpperCase() : ''}`} />
        <Message />
        <Content>
        <View style={AmountInputStyle.inputWrapper}>
          <Text style={AmountInputStyle.fiatAmount}>
            { mainAmountText }
          </Text>
          <Text style={AmountInputStyle.cryptoAmount}>
            { secondaryAmountText }
          </Text>

          <View style={AmountInputStyle.separator}/>

          <View style={AmountInputStyle.newBalance}>
            <Text style={AmountInputStyle.newBalanceText}> New balance:</Text>
            <Text style={AmountInputStyle.newBalanceText}>{ displayBalanceCrypto } = </Text>
            <Text style={AmountInputStyle.newBalanceText}>{ displayBalanceUsd }</Text>
          </View>
          <TouchableOpacity style={AmountInputStyle.switchIcon} onPress={ this.switchCurrencies }>
            <Icon name='SwitchIcon' width='36' height='36' fill='rgba(61,72,83,0.3)' stroke='white' />
          </TouchableOpacity>
        </View>
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
          onPress={() => navigateTo('TransactionConfirmation')}
          margin='10 36 45 36'
        >
          Withdraw
        </CelButton>
        </Content>
      </BasicLayout>
    );
  }
}

export default AmountInput;
