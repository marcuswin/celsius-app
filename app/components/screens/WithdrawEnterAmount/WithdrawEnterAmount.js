import React, { Component } from 'react';
import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import WithdrawEnterAmountStyle from "./WithdrawEnterAmount.styles";
import CelText from '../../atoms/CelText/CelText';
import CelButton from '../../atoms/CelButton/CelButton';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import Card from "../../atoms/Card/Card";
import formatter from "../../../utils/formatter";
import CelNumpad from "../../molecules/CelNumpad/CelNumpad";
import { KEYPAD_PURPOSES } from "../../../constants/UI";
import CoinSwitch from "../../atoms/CoinSwitch/CoinSwitch";
import SimpleSelect from "../../molecules/SimpleSelect/SimpleSelect";

@connect(
  state => ({
    walletSummary: state.wallet.summary,
    currencyRatesShort: state.currencies.currencyRatesShort,
    currencies: state.currencies.rates,
    formData: state.forms.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class WithdrawEnterAmount extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    const { navigation, walletSummary, currencies } = this.props;
    const coin = navigation.getParam('coin') || 'BTC'
    const coinData = walletSummary.coins.filter(c => c.short === coin.toUpperCase())[0];
    const coinSelectItems = currencies.map(c => ({ label: `${c.displayName} - ${c.short}`, value: c.short }))

    this.state = {
      header: {
        title: "Withdraw",
        left: "back",
      },
      coin,
      balanceCrypto: coinData.amount,
      balanceUsd: coinData.amount_usd,
      coinSelectItems,
    };

    props.actions.initForm({
      coin,
    })
  }

  handleAmountChange = (newValue) => {
    const { formData, currencyRatesShort, actions } = this.props
    const coinRate = currencyRatesShort[formData.coin.toLowerCase()]

    if (formData.isUsd) {
      const amountCrypto = Number(newValue) / coinRate;
      actions.updateFormField('amountCrypto', amountCrypto.toString())
    } else {
      const amountUsd = Number(newValue) * coinRate;
      actions.updateFormField('amountUsd', amountUsd.toString())
    }
  }

  render() {
    const { header, balanceCrypto, balanceUsd, coinSelectItems } = this.state;
    const { formData, actions } = this.props;
    const style = WithdrawEnterAmountStyle();
    
    return (
      <RegularLayout header={header}>
        <View style={style.container}>
          <View style={style.wrapper}>
            <Card padding="5 5 5 5">
              <CelText align="center" type="H7">
                Balance: { formatter.crypto(balanceCrypto, formData.coin) } | { formatter.usd(balanceUsd) }
              </CelText>
            </Card>

            <View>
              <View style={style.selectWrapper}>
                <SimpleSelect
                  items={coinSelectItems}
                  field="coin"
                  displayValue={formData.coin}
                  updateFormField={actions.updateFormField}
                />
              </View>

              <CoinSwitch
                updateFormField={actions.updateFormField}
                amountUsd={formData.amountUsd}
                amountCrypto={formData.amountCrypto}
                isUsd={formData.isUsd}
                coin={formData.coin}
              />
            </View>

            <CelButton
              disabled
              onPress={() => actions.navigateTo('WalletLanding')}
            >
              Enter amount above
            </CelButton>
          </View>

          <CelNumpad
            field={formData.isUsd ? "amountUsd" : "amountCrypto" }
            value={formData.isUsd ? formData.amountUsd : formData.amountCrypto}
            updateFormField={actions.updateFormField}
            onPress={this.handleAmountChange}
            purpose={KEYPAD_PURPOSES.WITHDRAW}
          />
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(WithdrawEnterAmount);
