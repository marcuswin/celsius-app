import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import CelPayEnterAmountStyle from "./CelPayEnterAmount.styles";
import CelButton from '../../atoms/CelButton/CelButton';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import CelNumpad from "../../molecules/CelNumpad/CelNumpad";
import { KEYPAD_PURPOSES } from "../../../constants/UI";
import CoinSwitch from "../../atoms/CoinSwitch/CoinSwitch";
import SimpleSelect from "../../molecules/SimpleSelect/SimpleSelect";
import BalanceView from "../../atoms/BalanceView/BalanceView";
import STYLES from "../../../constants/STYLES";

@connect(
  state => ({
    walletSummary: state.wallet.summary,
    celpayCompliance: state.user.compliance.celpay,
    currencyRatesShort: state.currencies.currencyRatesShort,
    currencies: state.currencies.rates,
    formData: state.forms.formData,
    withdrawalAddresses: state.wallet.withdrawalAddresses,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class CelPayEnterAmount extends Component {
  static propTypes = {};
  static defaultProps = {}

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    return {
      title: params && params.title ? params.title : 'Enter Amount',
    }
  };

  constructor(props) {
    super(props);
    const { currencies, celpayCompliance, formData, navigation } = this.props;

    const coinSelectItems = currencies
      .filter(c => celpayCompliance.coins.includes(c.short))
      .map(c => ({ label: `${c.displayName}  (${c.short})`, value: c.short }))

    const names = (formData.friend && formData.friend.name) ? formData.friend.name.split(' ') : undefined;
    const screenTitle = names ? `Send to ${names[0] ? names[0] : ''} ${(!!names[1] && !!names[1][0]) ? names[1][0] : ''}` : 'Enter Amount'

    navigation.setParams({
      title: screenTitle
    })

    this.state = {
      coinSelectItems,
    };

    if (!formData.coin) {
      props.actions.updateFormField('coin', 'BTC')
    }
  }

  // TODO: move to formatter? check WithdrawEnterAmount
  getNumberOfDecimals(value) {
    const splitValue = value.split('.')
    const numberOfDecimals = splitValue[1] ? splitValue[1].length : 0;
    return numberOfDecimals;
  }

  // TODO: move to formatter? check WithdrawEnterAmount
  getAllowedDecimals = (currency) => currency === 'USD' ? 2 : 5

  getButtonCopy = () => {
    const { formData } = this.props;

    if (formData.amountUsd && formData.amountUsd > 0) {
      return formData.friend ? 'Add a note' : 'Send';
    }
    return 'Enter amount above';
  }

  // TODO: move to formatter? check WithdrawEnterAmount
  setCurrencyDecimals(value, currency) {
    if (!this.hasEnoughDecimals(value, currency)) return value;
    // remove last digit
    const numberOfDecimals = this.getNumberOfDecimals(value)
    const allowedDecimals = this.getAllowedDecimals(currency);

    return value.slice(0, allowedDecimals - numberOfDecimals);
  }


   getAmountColor = () => this.isAmountValid() ? STYLES.COLORS.DARK_GRAY : STYLES.COLORS.ORANGE

  handleAmountChange = (newValue) => {
    const { formData, currencyRatesShort, actions } = this.props
    const coinRate = currencyRatesShort[formData.coin.toLowerCase()]

    let amountCrypto;
    let amountUsd;

    if (formData.isUsd) {
      amountUsd = this.setCurrencyDecimals(newValue, 'USD');
      amountCrypto = amountUsd / coinRate;
    } else {
      amountCrypto = this.setCurrencyDecimals(newValue);
      amountUsd = amountCrypto * coinRate;
    }

    actions.updateFormFields({
      amountCrypto: amountCrypto.toString(),
      amountUsd: amountUsd.toString(),
    })
  }

  isAmountValid = () => {
    const { formData, walletSummary } = this.props
    const balanceUsd = walletSummary.coins.filter(c => c.short === formData.coin.toUpperCase())[0].amount_usd;
    const {amountUsd} = formData

    if (amountUsd > balanceUsd) return false
    if (amountUsd > 2000) return false
    return true
  }

  // TODO: move to formatter? check WithdrawEnterAmount
  hasEnoughDecimals(value = '', currency) {
    const numberOfDecimals = this.getNumberOfDecimals(value)
    const allowedDecimals = this.getAllowedDecimals(currency);

    return numberOfDecimals > allowedDecimals;
  }

  handleCoinChange = (field, value) => {
    const { actions } = this.props

    actions.updateFormFields({
      [field]: value,
      amountUsd: undefined,
      amountCrypto: undefined,
    });
  }

  handleNextStep = () => {
    const { actions, formData } = this.props;

    if (formData.friend) {
      actions.navigateTo('CelPayMessage')
    } else {
      actions.navigateTo('VerifyProfile', {
        onSuccess: actions.celPayShareLink
      })
    }
  }

  render() {
    const { coinSelectItems } = this.state;
    const { formData, actions, walletSummary } = this.props;
    const style = CelPayEnterAmountStyle();
    if (!formData.coin) return null;

    const coinData = walletSummary.coins.filter(c => c.short === formData.coin.toUpperCase())[0];

    return (
      <RegularLayout>
        <View style={style.container}>
          <View style={style.wrapper}>
            <BalanceView opacity={0.65} coin={formData.coin} crypto={coinData.amount} usd={coinData.amount_usd} />

            <View>
              <View style={style.selectWrapper}>
                <SimpleSelect
                  items={coinSelectItems}
                  field="coin"
                  displayValue={formData.coin}
                  updateFormField={actions.updateFormField}
                  onChange={this.handleCoinChange}
                />
              </View>

              <CoinSwitch
                updateFormField={actions.updateFormField}
                onAmountPress={actions.toggleKeypad}
                amountUsd={formData.amountUsd}
                amountCrypto={formData.amountCrypto}
                isUsd={formData.isUsd}
                coin={formData.coin}
                amountColor={this.getAmountColor()}
              />
            </View>

            <CelButton
              margin="50 0 0 0"
              disabled={!this.isAmountValid() || !(formData.amountUsd && Number(formData.amountUsd) > 0)}
              onPress={this.handleNextStep}
            >
              {this.getButtonCopy()}
            </CelButton>
          </View>

          <CelNumpad
            field={formData.isUsd ? "amountUsd" : "amountCrypto"}
            value={formData.isUsd ? formData.amountUsd : formData.amountCrypto}
            updateFormField={actions.updateFormField}
            setKeypadInput={actions.setKeypadInput}
            toggleKeypad={actions.toggleKeypad}
            onPress={this.handleAmountChange}
            purpose={KEYPAD_PURPOSES.CELPAY}
          />
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(CelPayEnterAmount);
