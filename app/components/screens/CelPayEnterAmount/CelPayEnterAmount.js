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

@connect(
  state => ({
    walletSummary: state.wallet.summary,
    celpayCompliance: state.user.compliance.celpay,
    currencyRatesShort: state.currencies.currencyRatesShort,
    currencies: state.currencies.rates,
    formData: {
      ...state.forms.formData,
      friend: {
        first_name: 'Pera',
        last_name: 'Detlic',
      }
    },
    activeScreen: state.nav.activeScreen,
    withdrawalAddresses: state.wallet.withdrawalAddresses,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class CelPayEnterAmount extends Component {
  static propTypes = {};
  static defaultProps = {}

  constructor(props) {
    super(props);
    const { currencies, celpayCompliance, formData } = this.props;

    const coinSelectItems = currencies
      .filter(c => celpayCompliance.coins.includes(c.short))
      .map(c => ({ label: `${c.displayName} - ${c.short}`, value: c.short }))

    const screenTitle = formData.friend ? `Send to ${formData.friend.first_name} ${formData.friend.last_name[0]}` : 'Enter Amount'

    this.state = {
      header: {
        title: screenTitle,
        left: "back",
      },
      coinSelectItems,
    };


    props.actions.updateFormField('coin', 'BTC')
  }


  getNumberOfDecimals(value) {
    const splitValue = value.split('.')
    const numberOfDecimals = splitValue[1] ? splitValue[1].length : 0;
    return numberOfDecimals;
  }

  getAllowedDecimals = (currency) => currency === 'USD' ? 2 : 5

  getButtonCopy = () => {
    const { formData } = this.props;

    if (formData.amountUsd && formData.amountUsd > 0) {
      return formData.friend ? 'Add a note' : 'Send';
    }
    return 'Enter amount above';
  }

  setCurrencyDecimals(value, currency) {
    if (!this.hasEnoughDecimals(value, currency)) return value;
    // remove last digit
    const numberOfDecimals = this.getNumberOfDecimals(value)
    const allowedDecimals = this.getAllowedDecimals(currency);

    return value.slice(0, allowedDecimals - numberOfDecimals);
  }

  hasEnoughDecimals(value = '', currency) {
    const numberOfDecimals = this.getNumberOfDecimals(value)
    const allowedDecimals = this.getAllowedDecimals(currency);

    return numberOfDecimals > allowedDecimals;
  }

  handleAmountChange = (newValue) => {
    const { formData, currencyRatesShort, actions, walletSummary } = this.props
    const coinRate = currencyRatesShort[formData.coin.toLowerCase()]

    const balanceUsd = walletSummary.coins.filter(c => c.short === formData.coin.toUpperCase())[0].amount_usd;

    let amountCrypto;
    let amountUsd;

    if (formData.isUsd) {
      amountUsd = this.setCurrencyDecimals(newValue, 'USD');
      amountCrypto = amountUsd / coinRate;
    } else {
      amountCrypto = this.setCurrencyDecimals(newValue);
      amountUsd =  amountCrypto * coinRate;
    }

    if (amountUsd > balanceUsd) {
      return actions.showMessage('warning', 'Insufficient funds!')
    }
    if (amountUsd > 2000) {
      return actions.showMessage('warning', 'Daily CelPay limit is $2,000!')
    }

    actions.updateFormFields({
      amountCrypto: amountCrypto.toString(),
      amountUsd: amountUsd.toString(),
    })
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
        // TODO create CelPay link and Share
        onSuccess: () => actions.navigateTo('WalletLanding')
      })
    }
  }

  render() {
    const { header, coinSelectItems } = this.state;
    const { formData, actions, walletSummary, activeScreen } = this.props;
    const style = CelPayEnterAmountStyle();
    if (!formData.coin) return null;

    const coinData = walletSummary.coins.filter(c => c.short === formData.coin.toUpperCase())[0];

    return (
      <RegularLayout header={header}>
        <View style={style.container}>
          <View style={style.wrapper}>
            <BalanceView opacity={0.65} coin={formData.coin} crypto={coinData.amount} usd={coinData.amount_usd}/>

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
                onAmountPress={() => actions.toggleKeypad()}
                amountUsd={formData.amountUsd}
                amountCrypto={formData.amountCrypto}
                isUsd={formData.isUsd}
                coin={formData.coin}
              />
            </View>

            <CelButton
              margin="50 0 0 0"
              disabled={!(formData.amountUsd && Number(formData.amountUsd) > 0)}
              onPress={this.handleNextStep}
            >
              { this.getButtonCopy() }
            </CelButton>
          </View>

          { activeScreen === 'CelPayEnterAmount' && (
            <CelNumpad
              field={formData.isUsd ? "amountUsd" : "amountCrypto" }
              value={formData.isUsd ? formData.amountUsd : formData.amountCrypto}
              updateFormField={actions.updateFormField}
              setKeypadInput={actions.setKeypadInput}
              toggleKeypad={actions.toggleKeypad}
              onPress={this.handleAmountChange}
              purpose={KEYPAD_PURPOSES.CELPAY}
            />
          )}
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(CelPayEnterAmount);
