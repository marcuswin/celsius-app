import React, { Component } from "react";
import { View, Text, Image, Linking } from "react-native";
import { connect } from "react-redux";

import InterestRateInfoStyle from "./InterestRateInfo.styles";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";

@connect(
  state => ({
    walletCurrencies: state.interest.ratesInfo
  })
)
class InterestRateInfo extends Component {
  capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  render() {
    const { currency, rate, walletCurrencies, compact } = this.props;

    if (!currency || !walletCurrencies) {
      return null;
    }

    const styles = InterestRateInfoStyle();

    const additionalWrapperStyle = compact ? styles.mainWrapperCompact : {};

    const currencyInfo = walletCurrencies[currency.toUpperCase()];

    const currencyName = currencyInfo.name;

    return (
      <View style={[styles.mainWrapper, additionalWrapperStyle]}>
        <View style={styles.mainInfoWrapper}>
          <View style={styles.imageInfoWrapper}>
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: currencyInfo.image_url }}
                style={styles.currencyImage}
              />
            </View>
            <View style={styles.infoWrapper}>
              <Text style={styles.currencyName}>{this.capitalize(currencyName)}</Text>
              <Text style={styles.currencyShort}>{currencyInfo.short}</Text>
            </View>
          </View>
          <View style={{ justifyContent: "space-around" }}>
            <View style={styles.regularRateWrapper}>
              <Text style={styles.regularRateText}>Regular Rate</Text>
              <Text style={styles.regRateText}>{rate}</Text>
            </View>
            <View style={styles.celRateWrapper}>
              <Text style={styles.celsiusRateText}>CEL Rate</Text>
              <Text style={styles.celRateText}>{rate}</Text>
            </View>
          </View>
        </View>
        {currencyInfo.short.toUpperCase() === "USD" && <View style={styles.usdInfoWrapper}>
          <Text style={globalStyles.lightText}>
            Start earning interest for dollars by <Text onPress={() => {
            Linking.openURL("mailto:sales@celsius.network");
          }} style={globalStyles.blueTextColor}>getting in touch</Text> with
            our team.
          </Text>
        </View>}
      </View>
    );
  }
}

export default InterestRateInfo;
