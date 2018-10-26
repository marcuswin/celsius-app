import React, { Component } from "react";
import { View, Text, Linking } from "react-native";
import { connect } from "react-redux";

import OnBoardingCurrencyInterestRateInfoStyle from "./OnboardingCurrencyInterestRateInfo.styles";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import Icon from "../../atoms/Icon/Icon";

@connect(
  state => ({
    walletCurrencies: state.interest.ratesInfo
  })
)
class OnBoardingCurrencyInterestRateInfo extends Component {
  capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  render() {
    const { currency, rate, walletCurrencies, compact } = this.props;

    if (!currency || !walletCurrencies) {
      return null;
    }

    const additionalWrapperStyle = compact ? OnBoardingCurrencyInterestRateInfoStyle.mainWrapperCompact : {};

    const currencyInfo = walletCurrencies[currency.toUpperCase()];

    const currencyName = currencyInfo.name === "bitcoin cash" ? "BCash" : currencyInfo.name;

    return (
      <View style={[OnBoardingCurrencyInterestRateInfoStyle.mainWrapper, additionalWrapperStyle]}>
        <View style={OnBoardingCurrencyInterestRateInfoStyle.mainInfoWrapper}>
          <View style={OnBoardingCurrencyInterestRateInfoStyle.imageWrapper}>
            <Icon name={`Icon${currencyInfo.short}`} height='25' width='25' fill="white" style={{ opacity: .35 }}/>
          </View>
          <View style={OnBoardingCurrencyInterestRateInfoStyle.infoWrapper}>
            <Text style={OnBoardingCurrencyInterestRateInfoStyle.currencyName}>{this.capitalize(currencyName)}</Text>
            <Text style={OnBoardingCurrencyInterestRateInfoStyle.currencyShort}>{currencyInfo.short}</Text>
          </View>
          <View style={OnBoardingCurrencyInterestRateInfoStyle.rateWrapper}>
            <Text style={OnBoardingCurrencyInterestRateInfoStyle.rateText}>{rate}</Text>
          </View>
        </View>
        {currencyInfo.short.toUpperCase() === "USD" &&
        <View style={OnBoardingCurrencyInterestRateInfoStyle.usdInfoWrapper}>
          <Text style={globalStyles.lightText}>
            Start earning interest for dollars by <Text onPress={() => {
            Linking.openURL("mailto:sales@celsius.network");
          }}
                                                        style={globalStyles.blueTextColor}>getting in touch</Text> with
            our team.
          </Text>
        </View>}
      </View>
    );
  }
}

export default OnBoardingCurrencyInterestRateInfo;
