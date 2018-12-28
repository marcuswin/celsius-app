import React, {Component} from 'react';
import { Image, Text, TouchableOpacity, View } from "react-native";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import CelButton from '../../atoms/CelButton/CelButton';
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import { LOAN_ELIGIBLE_COINS } from "../../../config/constants/common";
import SelectCoinStyle from "../SelectCoin/SelectCoin.styles";
import testUtil from "../../../utils/test-util";
import formatter from "../../../utils/formatter";
import Steps from "../../molecules/Steps/Steps";

@connect(
  state => ({
    eligibleCurrencies: state.wallet.currencies.filter(wc => LOAN_ELIGIBLE_COINS.indexOf(wc.currency.short.toUpperCase()) !== -1),
    callsInProgress: state.api.callsInProgress,
    formData: state.ui.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class BRWChooseCollateral extends Component {
  capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  renderCoin = (walletCurrency) => {
    const { currency } = walletCurrency;

    const wrapperStyle = Number(walletCurrency.total.toFixed(2)) ? SelectCoinStyle.coinWrapper : [SelectCoinStyle.coinWrapper, { opacity: 0.2 }];
    return (
      <View key={currency.id} style={wrapperStyle}>
        <TouchableOpacity ref={testUtil.generateTestHook(this, `SelectCoin.${currency.short}`)} key={currency.id} style={SelectCoinStyle.button} onPress={() => this.onSelectCoin(currency)}>
          <Image key={currency.id} source={{ uri: currency.image_url }} style={SelectCoinStyle.coin}/>
        </TouchableOpacity>
        <Text style={SelectCoinStyle.coinName}>{this.capitalize(currency.name)}</Text>
        <Text
          style={SelectCoinStyle.amountTextUSD}>{formatter.crypto(walletCurrency.amount, currency.short, { precision: 5 })}</Text>
        <Text style={SelectCoinStyle.amountText}>{formatter.usd(walletCurrency.total)}</Text>
      </View>
    );
  };

  render() {
    const { actions, eligibleCurrencies } = this.props;

    return (
      <SimpleLayout
        animatedHeading={{ text: 'Choose a collateral'}}
      >
        <Steps current={2} totalSteps={5} />
        <Text style={globalStyles.normalText}>Choose a coin to use as collateral</Text>

        <View style={{ flexDirection: 'row' }}>
          { eligibleCurrencies.map(this.renderCoin)}
        </View>

        <CelButton
          margin="40 0 0 0"
          color="blue"
          onPress={() => actions.navigateTo('BRWLoanOption')}
        >
          Deposit more funds
        </CelButton>
      </SimpleLayout>
    );
  }
}

export default BRWChooseCollateral;
