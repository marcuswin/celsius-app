import React, {Component} from 'react';
import { View, Text, Image } from "react-native";
import {connect} from "react-redux";

import CurrencyInterestRateInfoStyle from './CurrencyInterestRateInfo.styles';

@connect(
  state => ({
    walletCurrencies: state.wallet.currencies,
  }),
)
class CurrencyInterestRateInfo extends Component {
  capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  render() {
    const {currency, rate, walletCurrencies} = this.props;

    if (!currency || !walletCurrencies || !walletCurrencies.length) {
      return null;
    }

    const currencyInfo = walletCurrencies.find(wallet => wallet.currency.short.toUpperCase() === currency.toUpperCase()).currency;

    return (
      <View style={CurrencyInterestRateInfoStyle.mainWrapper}>
        <View style={CurrencyInterestRateInfoStyle.imageWrapper}>
          <Image
            source={{ uri: currencyInfo.image_url }}
            style={CurrencyInterestRateInfoStyle.currencyImage}
          />
        </View>
        <View style={CurrencyInterestRateInfoStyle.infoWrapper}>
          <Text style={CurrencyInterestRateInfoStyle.currencyName}>{this.capitalize(currencyInfo.name)}</Text>
          <Text style={CurrencyInterestRateInfoStyle.currencyShort}>{currencyInfo.short}</Text>
        </View>
        <View style={CurrencyInterestRateInfoStyle.rateWrapper}>
          <Text style={CurrencyInterestRateInfoStyle.rateText}>{rate}</Text>
        </View>
      </View>
    )
  }
}

export default CurrencyInterestRateInfo;
