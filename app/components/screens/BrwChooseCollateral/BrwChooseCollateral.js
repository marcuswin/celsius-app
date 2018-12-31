import React, {Component} from 'react';
import { Image, Text, TouchableOpacity, View } from "react-native";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import CelButton from '../../atoms/CelButton/CelButton';
import { GLOBAL_STYLE_DEFINITIONS as globalStyles, COLORS } from "../../../config/constants/style";
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
  onSelectCoin(walletCurrency) {
    const { actions } = this.props;

    actions.updateFormField('coin', walletCurrency.currency.short);
    actions.updateFormField('totalAmount', walletCurrency.total);
    actions.navigateTo('BRWLoanOption');
  }

  capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  renderCoin = (walletCurrency) => {
    const { formData } = this.props;
    const { currency } = walletCurrency;

    const isCoinAvailable = Number(formData.amount) * 2 < walletCurrency.total;
    const wrapperStyle = isCoinAvailable ? SelectCoinStyle.coinWrapper : [SelectCoinStyle.coinWrapper, { opacity: 0.2 }];
    const textStyle = !isCoinAvailable ? { color: COLORS.red } : {}
    const onPress = isCoinAvailable ? () => this.onSelectCoin(walletCurrency) : () => {};
    return (
      <View key={currency.id} style={wrapperStyle}>
        <TouchableOpacity ref={testUtil.generateTestHook(this, `ChooseCollateral.${currency.short}`)} key={currency.id} style={SelectCoinStyle.button} onPress={onPress}>
          <Image key={currency.id} source={{ uri: currency.image_url }} style={SelectCoinStyle.coin}/>
        </TouchableOpacity>
        <Text style={SelectCoinStyle.coinName}>{this.capitalize(currency.name)}</Text>
        <Text style={[SelectCoinStyle.amountTextUSD, textStyle]}>{formatter.crypto(walletCurrency.amount, currency.short, { precision: 5 })}</Text>
        <Text style={[SelectCoinStyle.amountText, textStyle]}>{formatter.usd(walletCurrency.total)}</Text>
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
        <Text style={[globalStyles.normalText, { marginVertical: 15 }]}>Choose a coin to use as collateral</Text>

        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          { eligibleCurrencies.map(this.renderCoin)}
        </View>

        <CelButton
          margin="40 0 0 0"
          color="blue"
          onPress={() => actions.navigateTo('AddFunds')}
        >
          Deposit more funds
        </CelButton>
      </SimpleLayout>
    );
  }
}

export default BRWChooseCollateral;
