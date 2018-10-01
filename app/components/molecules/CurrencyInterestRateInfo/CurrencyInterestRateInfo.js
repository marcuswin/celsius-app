import React, {Component} from 'react';
import { View, Text, Image } from "react-native";
import {connect} from "react-redux";

import CurrencyInterestRateInfoStyle from './CurrencyInterestRateInfo.styles';

@connect(
  state => ({
    walletCurrencies: state.interest.ratesInfo,
  }),
)
class CurrencyInterestRateInfo extends Component {
  capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  render() {
    const {currency, rate, walletCurrencies, compact} = this.props;

    if (!currency || !walletCurrencies) {
      return null;
    }

    const additionalWrapperStyle = compact ? CurrencyInterestRateInfoStyle.mainWrapperCompact : {};

    const currencyInfo = walletCurrencies[currency.toUpperCase()];

    return (
      <View style={[CurrencyInterestRateInfoStyle.mainWrapper, additionalWrapperStyle]}>
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
